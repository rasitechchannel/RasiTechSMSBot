const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const axios = require('axios');




const token = '';
const apiEndpoint = 'https://websms.co.id/api/smsgateway';
const TOKEN_KAMU = '';

const bot = new TelegramBot(token, {polling: true});

// Load user balances from JSON file
let userBalances = {};
const balancesFile = 'balances.json';

let pendingMessages = {};


try {
    const data = fs.readFileSync(balancesFile);
    userBalances = JSON.parse(data);
} catch (error) {
    console.error('Error reading balances file:', error.message);
}

bot.onText(/\/start/, (msg) => {
    console.log(msg)
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Selamat datang! Gunakan perintah /send untuk mengirim pesan.');
});

bot.onText(/\/addsaldo (\d+) (\d+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = match[1];
    const saldoToAdd = parseInt(match[2]);

    if (!isNaN(saldoToAdd) && saldoToAdd > 0) {
        if (!userBalances[userId]) {
            userBalances[userId] = 0;
        }

        userBalances[userId] += saldoToAdd;
        fs.writeFileSync(balancesFile, JSON.stringify(userBalances));
        
        bot.sendMessage(chatId, `Saldo untuk user ${userId} telah ditambahkan sebesar ${saldoToAdd}.`);
    } else {
        bot.sendMessage(chatId, 'Format perintah /addsaldo salah. Gunakan /addsaldo USERID SALDO');
    }
}); 

bot.onText(/\/send/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Masukkan Nomor (08xxxx):', {
        reply_markup: {
            force_reply: true
        }
    }).then((message) => {
        bot.onReplyToMessage(chatId, message.message_id, (reply) => {
            const to = reply.text;

            bot.sendMessage(chatId, 'Masukkan Pesan:', {
                reply_markup: {
                    force_reply: true
                }
            }).then((message) => {
                bot.onReplyToMessage(chatId, message.message_id, (reply) => {
                    const text = reply.text;
                    if (text.toLowerCase() === '/cancel') {
                        bot.sendMessage(chatId, 'Pengiriman pesan dibatalkan.');
                    } else {
                        // Store the pending message
                        pendingMessages[chatId] = { to, text };

                        // Display the user's input and ask for confirmation
                        const confirmationText = `Anda akan mengirim pesan ke nomor ${to} dengan isi:\n\n${text}`;
                        const confirmKeyboard = {
                            inline_keyboard: [
                                [{ text: 'Kirim', callback_data: 'send' }],
                                [{ text: 'Batal', callback_data: 'cancel' }],
                            ],
                        };

                        bot.sendMessage(chatId, confirmationText, {
                            reply_markup: confirmKeyboard,
                        });
                    }
                });
            });
        });
    });
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    if (query.data === 'send') {
        const { to, text } = pendingMessages[chatId];

        handleSendMessage(chatId, to, text);

        // Remove the inline keyboard
        bot.editMessageReplyMarkup({
            chat_id: chatId,
            message_id: messageId,
            reply_markup: {
                inline_keyboard: [],
            },
        });
    } else if (query.data === 'cancel') {
        bot.editMessageText('Pengiriman pesan dibatalkan.', {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: {
                inline_keyboard: [],
            },
        });

        // Clear pending message after canceling
        delete pendingMessages[chatId];
    }
});


function handleSendMessage(chatId, to, message) {
    const userId = chatId.toString();

    // Check if user has enough balance
    if (userBalances[userId] && userBalances[userId] > 0) {
        // Make API request to send SMS
        const apiURL = `https://websms.co.id/api/smsgateway?token=${TOKEN_KAMU}&to=${to}&msg=${encodeURIComponent(message)}`;

        axios.get(apiURL)
            .then(response => {
                const apiResponse = response.data;

                if (apiResponse.status === 'success') {
                    // Update user balance
                    userBalances[userId]--;

                    // Save updated balances to the file
                    fs.writeFileSync(balancesFile, JSON.stringify(userBalances));

                    bot.sendMessage(chatId, 'Pesan berhasil dikirim.');
                } else {
                    bot.sendMessage(chatId, 'Gagal mengirim pesan. ' + apiResponse.message);
                }
            })
            .catch(error => {
                console.error('Error making API request:', error.message);
                bot.sendMessage(chatId, 'Terjadi kesalahan dalam pengiriman pesan.');
            });
    } else {
        bot.sendMessage(chatId, 'Saldo tidak mencukupi.');
    }
}