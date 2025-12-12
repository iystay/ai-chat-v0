document.getElementById("send-btn").onclick = () => {
    const box = document.getElementById("chat-box");
    const input = document.getElementById("user-input");

    let userText = input.value.trim();
    if (!userText) return;

    box.innerHTML += `<div><b>Sen:</b> ${userText}</div>`;
    input.value = "";
};
