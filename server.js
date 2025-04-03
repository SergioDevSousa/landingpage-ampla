require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

// Rota para exibir a Landing Page Mobile
app.get('/', (req, res) => {
    res.render('mobile');
});

// Rota para capturar e enviar o e-mail
app.post('/capturar-lead', (req, res) => {
    const { nome, email, telefone } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: 'Novo Lead do Site!',
        text: `Novo lead cadastrado:\n\nNome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            res.send("<h2>Ocorreu um erro. Tente novamente!</h2>");
        } else {
            console.log('E-mail enviado:', info.response);
            res.send("<h2>Obrigado! Em breve entraremos em contato.</h2>");
        }
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
