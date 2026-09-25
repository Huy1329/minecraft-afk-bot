const mineflayer = require("mineflayer");

const HOST = process.env.MC_HOST;
const PORT = Number(process.env.MC_PORT || 25565);
const BOT_USERNAME = process.env.BOT_USERNAME;
const BOT_PASSWORD = process.env.BOT_PASSWORD;

let bot;
let reconnectTimer;

function startBot() {
    console.log(`Connecting to ${HOST}:${PORT} as ${BOT_USERNAME}...`);

    bot = mineflayer.createBot({
        host: HOST,
        port: PORT,
        username: BOT_USERNAME,
        version: "1.21.11"
    });

    bot.once("spawn", () => {
        console.log("Bot joined the server!");

        setTimeout(() => {
            bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`);
        }, 2000);

        setTimeout(() => {
            bot.chat(`/login ${BOT_PASSWORD}`);
        }, 4000);

        startAntiAFK();
    });

    bot.on("messagestr", message => {
        console.log("[MC]", message);
    });

    bot.on("kicked", reason => {
        console.log("Bot kicked:", reason);
    });

    bot.on("error", err => {
        console.log("Bot error:", err.message);
    });

    bot.on("end", () => {
        console.log("Disconnected. Reconnecting in 10 seconds...");

        clearTimeout(reconnectTimer);

        reconnectTimer = setTimeout(() => {
            startBot();
        }, 10000);
    });
}

function startAntiAFK() {
    setInterval(() => {
        if (!bot || !bot.entity) return;

        bot.setControlState("forward", true);

        setTimeout(() => {
            if (bot) {
                bot.setControlState("forward", false);
            }
        }, 1500);

        setTimeout(() => {
            if (bot) {
                bot.look(
                    Math.random() * Math.PI * 2,
                    0,
                    true
                );
            }
        }, 2000);
    }, 30000);
}

startBot();
