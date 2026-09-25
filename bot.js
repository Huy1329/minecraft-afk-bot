const mineflayer = require("mineflayer");

const HOST = "gaylosmp.mcsh.io";
const PORT = 25565;
const USERNAME = "Bot_By_Xenon";
const PASSWORD = "bot321@";

let bot = null;
let reconnecting = false;

function createBot() {
    if (reconnecting) return;

    reconnecting = true;

    console.log("=================================");
    console.log("Đang kết nối server...");
    console.log(`${HOST}:${PORT}`);
    console.log(`Tên bot: ${USERNAME}`);
    console.log("=================================");

    bot = mineflayer.createBot({
        host: HOST,
        port: PORT,
        username: USERNAME,
        version: "1.21.11"
    });

    bot.once("spawn", () => {
        reconnecting = false;

        console.log("✅ BOT ĐÃ VÀO SERVER!");

        // Đăng nhập sau 3 giây
        setTimeout(() => {
            if (!bot || !bot.entity) return;

            console.log("🔑 Đang login...");
            bot.chat(`/login ${PASSWORD}`);
        }, 3000);

        // Chống AFK
        setInterval(() => {
            if (!bot || !bot.entity) return;

            bot.setControlState("jump", true);

            setTimeout(() => {
                if (bot) {
                    bot.setControlState("jump", false);
                }
            }, 500);

        }, 30000);
    });

    bot.on("messagestr", message => {
        console.log("[SERVER]", message);

        // Nếu AuthMe yêu cầu register
        if (
            message.toLowerCase().includes("register") ||
            message.toLowerCase().includes("đăng ký")
        ) {
            setTimeout(() => {
                if (bot && bot.entity) {
                    bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
                }
            }, 1500);
        }

        // Nếu AuthMe yêu cầu login
        if (
            message.toLowerCase().includes("login") ||
            message.toLowerCase().includes("đăng nhập")
        ) {
            setTimeout(() => {
                if (bot && bot.entity) {
                    bot.chat(`/login ${PASSWORD}`);
                }
            }, 1500);
        }
    });

    bot.on("kicked", reason => {
        console.log("❌ BOT BỊ KICK!");
        console.log("Lý do:", reason);

        reconnect();
    });

    bot.on("error", error => {
        console.log("⚠️ BOT ERROR:", error.message);

        reconnect();
    });

    bot.on("end", reason => {
        console.log("🔌 BOT ĐÃ MẤT KẾT NỐI!");
        console.log("Lý do:", reason);

        reconnect();
    });
}

function reconnect() {
    if (!reconnecting) {
        reconnecting = true;

        console.log("🔄 Sẽ reconnect sau 10 giây...");

        setTimeout(() => {
            reconnecting = false;

            console.log("🔄 Đang reconnect...");
            createBot();

        }, 10000);
    }
}

createBot();
