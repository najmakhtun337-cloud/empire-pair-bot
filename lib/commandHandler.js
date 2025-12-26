export async function handleCommand(sock, msg) {
  const text = msg.message?.conversation
  if (!text) return

  if (text === ".ping") {
    await sock.sendMessage(msg.key.remoteJid, {
      text: "Pong ✅"
    })
  }
}
