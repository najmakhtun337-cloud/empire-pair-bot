import config from "../config.js";

export async function handleCommand(sock, msg, text) {
  const from = msg.key.remoteJid;

  if (!text.startsWith(config.prefix)) return;

  const cmd = text.slice(1).toLowerCase();

  switch (cmd) {
    case "hi":
      await sock.sendMessage(from, { text: `👋 Hi! I am ${config.botName}` });
      break;

    case "ping":
      await sock.sendMessage(from, { text: "🏓 Pong!" });
      break;
  }
}
