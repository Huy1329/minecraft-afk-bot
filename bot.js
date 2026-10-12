
const mineflayer = require('mineflayer');

const host = 'gayloking1.mcsh.io';
const port = 25565;
const username = 'Bot_By_Xenon';
const password = process.env.AUTHME_PASSWORD;

let bot;
let retry = 10000;
let timer;

function connect() {
  console.log('Connecting to Noob SMP...');

  bot = mineflayer.createBot({
    host,
    port,
    username,
    auth: 'offline',
    version: '1.21.11'
  });

  bot.on('messagestr', (message) => {
    console.log('[CHAT]', message);

    if (/\/register\b/i.test(message)) {
      bot.chat(`/register ${password} ${password}`);
    } else if (/\/login\b/i.test(message)) {
      bot.chat(`/login ${password}`);
    }
  });

  bot.on('spawn', () => {
    console.log('Bot is in the world!');
    retry = 10000;
  });

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason);
  });

  bot.on('error', (err) => {
    console.log('Error:', err.message);
  });

  bot.on('end', () => {
    console.log(`Disconnected. Retry in ${retry / 1000}s`);
    clearTimeout(timer);
    timer = setTimeout(connect, retry);
    retry = Math.min(retry * 2, 60000);
  });
}

if (!password) {
  console.error('Missing AUTHME_PASSWORD secret');
  process.exit(1);
}

connect();
