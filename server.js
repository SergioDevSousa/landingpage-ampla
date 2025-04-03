const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();

// Configurar o Express para usar Pug como template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware para processar JSON e dados de formulário
app.use(express.json()); // Para JSON
app.use(express.urlencoded({ extended: true })); // Para formulários

// Servir arquivos estáticos (CSS, JS, imagens, etc.), se necessário
app.use(express.static("public"));

// 🔹 Rota para exibir o formulário
app.get("/", (req, res) => {
    res.render("index"); // Certifique-se de que tem um arquivo "views/index.pug"
});



app.post("/enviar-email", async (req, res) => {
    try {
        console.log("Recebendo dados:", req.body); // Log para debug
        const { nome, email, telefone } = req.body;

        if (!nome || !email || !telefone) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
        }
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: `Novo Contato: ${nome}`,
            text: `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}`
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("E-mail enviado:", info.response);
        res.status(200).json({ message: "E-mail enviado com sucesso!" });

    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        res.status(500).json({ error: "Erro ao enviar e-mail", details: error.message });
    }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
