async function sendToLLM(q) {
    console.log("Querying LLM")
    let url = "http://localhost:11434/api/chat";
    let params = {
        "model": "llama2",
        "messages": [
            {"role": "user", "content": q}
        ],
        stream: false
    };
    const options = {
        method: "POST",
        body: JSON.stringify(params)
    };
    fetch(url, options)
    .then((x) => {
        x.json().then(
            (response) => {
                sendMessage(response.message.content, user=false)
            }
        )
    });
}

function sendMessage(q, user = true) {
    console.log("sending msg");
    let source = user ? "user_message" : "llm_message"
    chatHistory.innerHTML += '<div class="' + source + '">' + q + '</div>'
}

async function userSendChat(q, silent = false, queryLLM = true) {
    if (!silent) {
        sendMessage(q)
    }
    chatBox.value = ""
    if (queryLLM) {
        console.log("Querying LLM");
        sendToLLM(q);
    }
}

document.addEventListener('keydown', function(event) {
    var q = chatBox.value;
    switch (event.key) {
        case "Enter":
            console.log("Attempt to send message...")
            if (q === textData) {
                userSendChat(q, silent=true);
                textData = null;
            } else {
                userSendChat(q, silent=false);
            }
    }
})

var chatBox = document.getElementById(`chat_box`)
var chatHistory = document.getElementsByClassName(`chat_history`)[0]
const urlParams = new URLSearchParams(window.location.search);
var textData = urlParams.get(`chat_box`);
if (textData) {
    console.log("Text Data Exists")
    chatBox.value = decodeURIComponent(textData);
    console.log("Text Data:\n", chatBox.value)
    var enterEvent = new KeyboardEvent(`keydown`, {
        key: `Enter`,
        code: `Enter`,
        shiftKey: false,
    });
    document.dispatchEvent(enterEvent)
}