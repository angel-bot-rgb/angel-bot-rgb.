const API_KEY = process.env.OPENAI_API_KEY || ""; // A Vercel vai inserir

document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
});

function addMessage(text, sender) {
    const messageEl = document.createElement("div");
    messageEl.classList.add("message", sender);
    messageEl.textContent = text;
    document.getElementById("messages").appendChild(messageEl);
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
}

async function sendMessage() {
    const inputEl = document.getElementById("user-input");
    const text = inputEl.value.trim();
    if (!text) return;

    addMessage(text, "user");
    inputEl.value = "";

    addMessage("AngelBot está digitando...", "bot");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: text }]
        })
    });

    const data = await response.json();
    document.querySelector("#messages .bot:last-child").textContent =
        data.choices[0].message.content;
}
