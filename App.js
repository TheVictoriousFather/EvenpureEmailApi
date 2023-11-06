require('dotenv/config');
const express = require('express');

const axios = require('axios');
const cors = require('cors');
const app = express();
const SMTP_CONFIG = require("./smtp");
const bodyParser = require("body-parser");
const emailRouter = express.Router();
const nodemailer = require("nodemailer");
const port = 3000;
const user = process.env.STREAMTAPE_USER;
emailRouter.use(cors());
emailRouter.use(bodyParser.json());
const key = process.env.STREAMTAPE_KEY;

app.use(cors());
// Montando o servidor de e-mails em uma rota específica
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para JSON
app.get('/',(req, res)=>res.send('evenpure lda'))



app.post('/send', (req, res) => {
  const { emailData, messageData } = req.body; // Captura os dados do formulário

  const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
      user: SMTP_CONFIG.user,
      pass: SMTP_CONFIG.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },});

  transporter.sendMail({
    from: SMTP_CONFIG.user,
    to: emailData.to,
    subject: emailData.subject,
    html: emailData.text,
    replyTo: messageData.email,
  })
  .then(info => {
    res.send(info);
  })
  .catch(error => {
    res.send(error);
  });console.log(emailData)
});




app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});