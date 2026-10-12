
const mineflayer = require('mineflayer');

const HOST = 'gayloking1.mcsh.io';
const PORT = 25565;
const USERNAME = 'Bot_By_Xenon';

let reconnectTimer = null;
let stopping = false;

function connectBot() {
  console.log(`[BOT] Đang kết nối ${HOST}:${PORT}...`);

  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    auth: 'offline',
    version: false
  });

  bot.once('spawn', () => {
    console.log(`[BOT] ${USERNAME} đã vào server và xuất hiện trong thế giới!`);
  });

  bot.on('messagestr', (message) => {
    console.log('[CHAT]', message);
  });

  bot.on('kicked', (reason) => {
    console.log('[BOT] Bị kick:', reason);
  });

  bot.on('error', (err) => {
    console.log('[BOT] Lỗi:', err.message);
  });

  bot.on('end', () => {
    console.log('[BOT] Mất kết nối.');

    if (!stopping && !reconnectTimer) {
      reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        connectBot();
      }, 15000);
    }
  });
}

process.on('SIGINT', () => {
  stopping = true;
  if (reconnectTimer) clearTimeout(reconnectTimer);
  process.exit(0);
});

connectBot();
