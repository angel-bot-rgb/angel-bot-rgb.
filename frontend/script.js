// Configuração da API
const API_KEY = "SUA_CHAVE_API_AQUI"; // Substitua pela sua chave
const API_URL = "https://api.openai.com/v1/chat/completions";

// Respostas pré-definidas
const respostasFixas = {
    "oi": "Olá! 😄 Como posso te ajudar hoje?",
    "qual é o teu nome": "Eu sou o AngelBot 👼, o seu assistente virtual.",
    "quem te criou": "Fui criado pelo meu mestre para ajudar nas suas tarefas e dúvidas.",
    "obrigado": "De nada! Sempre à disposição. 😉"
};

// Elementos da interface
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Adiciona mensagem no chat
function adicionarMensagem(remetente, texto) {
    const div = document.createElement("div");
    div.classList.add("chat-message", remetente);

    if (remetente === "bot") {
        const img = document.createElement("img");
        img.src = "logo.jpg"; // Logo preta
        img.alt = "Bot";
        img.classList.add("chat-logo");
        div.appendChild(img);
    }

    const span = document.createElement("span");
    span.textContent = texto;
    div.appendChild(span);

    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Envia mensagem
async function enviarMensagem() {
    const texto = userInput.value.trim();
    if (!texto) return;

    adicionarMensagem("user", texto);
    userInput.value = "";

    // Verifica respostas fixas
    const chave = texto.toLowerCase();
    if (respostasFixas[chave]) {
        adicionarMensagem("bot", respostasFixas[chave]);
        return;
    }

    // Chama API se não for resposta fixa
    try {
        const respostaAPI = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: texto }]
            })
        });

        const dados = await respostaAPI.json();
        const resposta = dados.choices?.[0]?.message?.content || "Desculpe, não consegui entender.";
        adicionarMensagem("bot", resposta);
    } catch (erro) {
        adicionarMensagem("bot", "Ops! Algo deu errado ao conectar com a API.");
        console.error(erro);
    }
}

// Eventos
sendBtn.addEventListener("click", enviarMensagem);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") enviarMensagem();
});

// Mensagem inicial
adicionarMensagem("bot", "Olá! Como posso ajudar você hoje?");
