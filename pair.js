import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from "@whiskeysockets/baileys"
import Pino from "pino"
import fs from "fs"

export async function startBot(number) {
  const session = "./session"

  if (!fs.existsSync(session)) fs.mkdirSync(session)

  const { state, saveCreds } = await useMultiFileAuthState(session)

  const sock = makeWASocket({
    logger: Pino({ level: "silent" }),
    auth: state,
    browser: ["Empire-XMD", "Chrome", "1.0"]
  })

  sock.ev.on("creds.update", saveCreds)

  if (!sock.authState.creds.registered) {
    const code = await sock.requestPairingCode(number)
    return code
  }

  return "Already Paired"
}
