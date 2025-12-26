import express from "express";
import cors from "cors";
import { startBot, getSock } from "./pair.js";
import { handleCommand } from "./lib/commandHandler.js";
import { welcome } from "./plugins/welcome.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/pair", async (req, res) => {
  const { number } = req.body;
  if (!number) return res.json({ ok: false, error: "No number provided" });

  try {
    const code = await startBot(number);
    res.json({ ok: true, code });
  } catch (e) {
    res.json({ ok: false, error: e.message });
  }
});

app.get("/", (req, res) => {
  res.send("Empire Pair Bot Running ✅");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Server running");
});

setInterval(() => {
  const sock = getSock();
  if (!sock) return;

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    await handleCommand(sock, msg, text.trim());
  });
}, 2000);
