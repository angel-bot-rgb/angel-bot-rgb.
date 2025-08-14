const predefinedResponses = {
    "olá": "Olá! Eu sou o AngelBot, seu assistente.",
    "quem é você?": "Eu sou o AngelBot, criado para ajudar você!",
    "qual é o seu objetivo?": "Ajudar com informações e responder perguntas!"
};

document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});

function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);
    msgDiv.textContent = text;
    document.getElementById("messages").appendChild(msgDiv);
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById("user-input");
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const lowerText = text.toLowerCase();
    if (predefinedResponses[lowerText]) {
        addMessage(predefinedResponses[lowerText], "bot");
        return;
    }

    try {
        const res = await fetch("https://SEU_BACKEND/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });
        const data = await res.json();
        addMessage(data.reply, "bot");
    } catch (err) {
        addMessage("Desculpe, houve um erro ao conectar com a API.", "bot");
    }
}
