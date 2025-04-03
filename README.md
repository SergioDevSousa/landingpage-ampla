# 🚀 **Landing Page Mobile para Captação de Leads**  

Bem-vindo(a) ao projeto **Landing Page Mobile-First** para captação de leads via **WhatsApp e E-mail**! 📱💬  
Este projeto foi desenvolvido usando **Pug (HTML simplificado), CSS responsivo e Node.js (Express)**, permitindo capturar informações de potenciais clientes e enviá-las diretamente para **seu WhatsApp ou e-mail**.  

---

## 📌 **Funcionalidades**  

✅ **Página 100% responsiva** (foco em dispositivos móveis)  
✅ **Formulário dinâmico** que envia mensagens para WhatsApp e/ou e-mail  
✅ **Tecnologia leve e rápida** (Pug + CSS + Express)  
✅ **Integração com Nodemailer** para captura de leads via e-mail  
✅ **Deploy facilitado** em plataformas como **Vercel, Render ou Railway**  

---

## 🎨 **Preview do Projeto**  

![Preview da Landing Page](https://via.placeholder.com/800x400?text=Landing+Page+Preview)  

---

## 🛠 **Tecnologias Utilizadas**  

- **Node.js** + **Express** → Para criar o servidor  
- **Pug.js** → Para gerar HTML de forma otimizada  
- **CSS Responsivo** → Para garantir que funcione bem no mobile  
- **Nodemailer** → Para envio de e-mails com os leads capturados  
- **WhatsApp API** → Para enviar leads diretamente para o WhatsApp  

---

## 🚀 **Como Rodar o Projeto**  

### **1️⃣ Instale as Dependências**  

```sh
npm install
```

### **2️⃣ Configure as Variáveis de Ambiente**  

Crie um arquivo **`.env`** na raiz do projeto e adicione suas credenciais de e-mail:  

```env
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=sua_senha
EMAIL_TO=seuemaildestino@gmail.com
```

> **📌 Importante**: Se for usar Gmail, ative "Acesso a apps menos seguros" ou crie uma senha de app.  

### **3️⃣ Inicie o Servidor**  

```sh
node server.js
```

### **4️⃣ Acesse no Navegador**  

Abra o navegador e acesse:  

```
http://localhost:3000
```

---

## 📩 **Como Funciona o Formulário?**  

### 📲 **Enviar para WhatsApp**  
Ao preencher o formulário e clicar no botão, o WhatsApp abrirá com uma mensagem pré-preenchida com os dados do lead.  

### 📧 **Enviar para E-mail**  
Caso a opção de e-mail esteja configurada, os dados do lead serão enviados automaticamente para o seu e-mail configurado no `.env`.  

---

## 🎯 **Personalização**  

Você pode alterar o **número do WhatsApp**, **cores**, **textos** e **estilo** editando os seguintes arquivos:  

- 📄 **`views/mobile.pug`** → Estrutura da página  
- 🎨 **`public/styles.css`** → Estilos visuais  
- 📧 **`server.js`** → Configuração do servidor e envio de e-mails  

---

## 🌍 **Como Fazer Deploy?**  

### **🚀 Deploy no Vercel**  

1. Instale o Vercel CLI:  
   ```sh
   npm install -g vercel
   ```  
2. Faça login no Vercel:  
   ```sh
   vercel login
   ```  
3. Execute o deploy:  
   ```sh
   vercel
   ```  

### **🔥 Deploy no Render ou Railway**  
- Basta criar um novo projeto, conectar o GitHub e definir as variáveis de ambiente (`.env`).  

---

## 👨‍💻 **Contribuição**  

Sinta-se à vontade para sugerir melhorias, abrir **issues** ou fazer um **pull request**! 🚀  

📌 **Contato para dúvidas/sugestões:**  
📧 E-mail: [seuemail@gmail.com](mailto:seuemail@gmail.com)  
📱 WhatsApp: [+55 99 99999-9999](https://api.whatsapp.com/send?phone=559999999999)  

---

🔹 **Se gostou do projeto, deixe uma ⭐ no repositório!** 😃  
🔹 **Dúvidas? Comente ou chame no WhatsApp!**  

🚀 **Feito com 💙 para ajudar negócios a crescerem online!**  

---