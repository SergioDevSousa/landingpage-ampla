// Nosso projeto agora vai depender de um arquivo chamado config.json que armazena nossas informações
/*
{
  "logoUrl": "/images/logo.png",
  "testimonial": [
    "Esse software mudou minha vida",
    "Aumentei minha renda em 25%"
  ],
  "benefits": [
    "Aumente sua produtividade",
    "Agilidade no Atendimento"
    ],
  "pageTitle": "Automatize Seu Negócio Agora",
  "pageContent": "Controle suas vendas, estoque e financeiro de forma fácil e rápida",
  "videoUrl": "https://youtube.com/embed/MocEe0fy174"
}

Criar uma rota para renderizar a config

Criar uma rota de renderização para o paínel de administração
1. Separar client de admin (ou seja, vou colocar os arquivos de views em pastas separadas)

Criar rotas para cada botão do paínel de administração

*/
const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require('fs');
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

const configPath = path.join(__dirname, "config.json");

function loadConfig() {
    try {
        if (!fs.existsSync(configPath)) {
            const defaultConfig = {
                logoUrl: "",
                testimonial: [],
                benefits: [],
                videoUrl: "",
                pageTitle: "",
                pageContent: ""
            };
            saveConfig(defaultConfig);
            return defaultConfig;
        }

        const data = fs.readFileSync(configPath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Erro ao ler o arquivo de configuração:", err);
        return {};
    }
}

function saveConfig(config) {
    try {
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    } catch (err) {
        console.error("Erro ao salvar configurações:", err);
    }
}

// 🔹 Rota para exibir o formulário
app.get("/", (req, res) => {
    res.render("client/index"); // Certifique-se de que tem um arquivo "views/index.pug"
});

app.get("/admin", (req, res) => {
    const config = loadConfig();
    res.render("admin/index", { config });
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

app.get("/config", (req, res) => {
    const config = loadConfig();
    res.json(config);
});

app.post("/update-logo", (req, res) => {
    const { logoUrl } = req.body;
    const config = loadConfig();
    config.logoUrl = logoUrl;
    saveConfig(config);
    res.json({ message: "Logo atualizado com sucesso!" });
});

app.post("/add-benefit", (req, res) => {
    const { benefit } = req.body;
    const config = loadConfig();
    config.benefits.push(benefit);
    saveConfig(config);
    res.json({ message: "Beneficio adicionado com sucesso!" });
});

app.post("/remove-benefit", (req, res) => {
    const { benefit } = req.body;
    const config = loadConfig();
    config.benefits = config.benefits.filter(b => b !== benefit);
    saveConfig(config);
    res.json({ message: "Beneficio removido com sucesso!" });
});

app.post("/add-testimonial", (req, res) => {
    const { testimonial } = req.body;
    const config = loadConfig();
    config.testimonial.push(testimonial);
    saveConfig(config);
    res.json({ message: "Depoimento adicionado com sucesso!" });
});

app.post("/remove-testimonial", (req, res) => {
    const { testimonial } = req.body;
    console.log(testimonial)
    const config = loadConfig();
    config.testimonial = config.testimonial.filter(t => t !== testimonial);
    saveConfig(config);
    res.json({ message: "Depoimento removido com sucesso!" });
});

app.post("/update-content", (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: "Título e conteúdo são obrigatórios!" });
    }

    const config = loadConfig();
    config.pageTitle = title;
    config.pageContent = content;
    saveConfig(config);

    res.json({ message: "Título e conteúdo atualizados com sucesso!" });
});

app.post("/update-video-url", (req, res) => {
    const { videoUrl } = req.body;

    if (!videoUrl) {
        return res.status(400).json({ error: "A URL do vídeo é obrigatória!" });
    }

    const config = loadConfig();
    config.videoUrl = videoUrl;  // Atualiza a URL do vídeo
    saveConfig(config);  // Salva as alterações no arquivo de configuração

    res.json({ message: "URL do vídeo atualizada com sucesso!" });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
