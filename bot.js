
const mineflayer = require('@wp2508/mineflayer');

const bot = mineflayer.createBot({
  host: 'gayloking1.mcsh.io',
  port: 25565,
  username: 'Bot_By_Xenon',
  auth: 'offline',
  version: '26.3'
});

let reconnectTimer = null;
let reconnecting = false;

bot.once('spawn', () => {
  console.log('[BOT] Đã vào server Minecraft 26.3!');
});

bot.on('messagestr', (message) => {
  console.log('[CHAT]', message);
});

bot.on('kicked', (reason) => {
  console.log('[BOT] Bị kick:', JSON.stringify(reason));
});

bot.on('error', (error) => {
  console.log('[BOT] Lỗi:', error.message);
});

bot.on('end', () => {
  console.log('[BOT] Mất kết nối.');

  if (reconnecting) return;
  reconnecting = true;

  reconnectTimer = setTimeout(() => {
    reconnecting = false;
    console.log('[BOT] Đang thử kết nối lại...');
    startBot();
  }, 15000);
});

function startBot() {
  // Tạo kết nối mới sau khi bot bị ngắt.
  const newBot = mineflayer.createBot({
    host: 'gayloking1.mcsh.io',
    port: 25565,
    username: 'Bot_By_Xenon',
    auth: 'offline',
    version: '26.3'
  });

  newBot.once('spawn', () => {
    console.log('[BOT] Đã vào server Minecraft 26.3!');
  });

  newBot.on('messagestr', message => console.log('[CHAT]', message));
  newBot.on('kicked', reason => console.log('[BOT] Bị kick:', JSON.stringify(reason)));
  newBot.on('error', error => console.log('[BOT] Lỗi:', error.message));
  newBot.on('end', () => {
    if (reconnecting) return;
    reconnecting = true;
    reconnectTimer = setTimeout(() => {
      reconnecting = false;
      startBot();
    }, 15000);
  });
}
