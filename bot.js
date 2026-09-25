const mineflayer = require("mineflayer");

const bot = mineflayer.createBot({
  host: "gaylosmp.mcsh.io",
  port: 25565,
  username: "Bot_By_Xenon",
  version: "1.21.11"
});

bot.once("spawn", () => {
  console.log("BOT ĐÃ VÀO SERVER!");

  setTimeout(() => {
    bot.chat("/register bot321@ bot321@");
  }, 3000);

  setInterval(() => {
    bot.setControlState("jump", true);

    setTimeout(() => {
      bot.setControlState("jump", false);
    }, 500);
  }, 30000);
});

bot.on("messagestr", msg => {
  console.log(msg);
});

bot.on("end", () => {
  console.log("Bot bị disconnect.");
});

bot.on("error", err => {
  console.log("Lỗi:", err.message);
});
