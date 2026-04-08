// Main entry point that manages multiple sessions

const { makeWASocket, useMultiFileAuthState } = require('@adiwajshing/baileys');
const { sessionHandler } = require('./handlers/sessionHandler');
const { messageHandler } = require('./handlers/messageHandler');

async function startBot() {
    const { state, saveState } = await useMultiFileAuthState('./auth');
    const sock = makeWASocket({ auth: state });

    sock.ev.on('messages.upsert', messageHandler(sock));
    sock.ev.on('connection.update', (update) => {
        if (update.connection === 'open') {
            console.log('Bot is connected!');
        }
    });

    process.on('SIGINT', () => {
        sock.logout();
        console.log('Logout and exit');
        process.exit();
    });
}

startBot();
