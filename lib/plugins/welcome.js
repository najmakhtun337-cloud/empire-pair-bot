export async function welcome(sock, update) {
  if (!update.participants) return;

  for (const u of update.participants) {
    if (update.action === "add") {
      await sock.sendMessage(update.id, {
        text: `👋 Welcome @${u.split("@")[0]}`,
        mentions: [u]
      });
    }
  }
}
