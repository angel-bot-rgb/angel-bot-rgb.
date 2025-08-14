document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("clear-btn").addEventListener("click", clearChat);

function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    let chatBox = document.getElementById("chat-box");

    let userMessage = document.createElement("p");
    userMessage.innerHTML = `<strong>Você:</strong> ${userInput}`;
    chatBox.appendChild(userMessage);

    // Resposta automática
    let botMessage = document.createElement("p");
    botMessage.innerHTML = `<strong>Bot:</strong> ${getBotResponse(userInput)}`;
    chatBox.appendChild(botMessage);

    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(message) {
    // Aqui você pode trocar pelas respostas reais do seu bot
    if (message.toLowerCase().includes("ola")) {
        return "Olá! Como você está hoje?";
    } else if (message.toLowerCase().includes("ajuda")) {
        return "Claro! Me diga com o que você precisa.";
    } else {
        return "Entendi sua mensagem.";
    }
}

function clearChat() {
    document.getElementById("chat-box").innerHTML = "";
}
