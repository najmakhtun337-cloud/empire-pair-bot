import express from "express"
import { PORT } from "./config.js"
import { startBot } from "./pair.js"

const app = express()
app.use(express.json())

// Pair API
app.post("/pair", async (req, res) => {
  const { number } = req.body
  if (!number) return res.json({ ok: false })

  try {
    const code = await startBot(number)
    res.json({ ok: true, code })
  } catch (e) {
    res.json({ ok: false, error: e.message })
  }
})

app.get("/", (req, res) => {
  res.send("Empire Pair Bot Running ✅")
})

app.listen(PORT, () => {
  console.log("Server running on", PORT)
})
