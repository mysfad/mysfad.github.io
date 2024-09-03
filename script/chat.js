let chat = document.getElementById("chat")
let footer = document.getElementById("footer")
let settings = document.getElementById("settings")
let apiKey = null

function submitApiKey(){
    let input = document.getElementById("apiKeyInput").value
    if (input) {
        apiKey = input
        localStorage.setItem("apiKey", apiKey)
        settings.style.display = "none"
        chat.style.display = "flex"
        footer.style.display = "block"
    }
}

function openSettings() {
    settings.style.display = settings.style.display === "none" ? "block" : "none"
    if (!apiKey) return
    chat.style.display = footer.style.display === "none" ? "flex" : "none"
    footer.style.display = footer.style.display === "none" ? "block" : "none"
}

async function input(req, button) {
    if (req) {
        let res = responses[req]
        output(res.from, res.text, res.buttons)
        button.disabled = true
    } else {
        let msg = document.getElementById("msg").value
        if(!msg) return
        document.getElementById("msg").value = ""
        output("Q", msg)
        let res = responses[msg.toLowerCase()]
        if (res) {
            output(res.from, res.text, res.buttons)
        } else {
            let text = await ai(msg)
            output("A", text)
        }
        if (msg === "clear") {
            document.getElementById("chat").innerHTML = ""
        }
    }
}

function output(from, text, buttons) {
    let chat = document.getElementById("chat")
    let div = document.createElement("div")
    div.className = from === "Q" ? "question" : "answer"
    let p = document.createElement("p")
    p.className = "msgText"
    p.textContent = text
    let time = document.createElement("p")
    time.className = "time"
    time.textContent = getTime()
    div.appendChild(p)
    if (buttons) {
        let buttonsDiv = document.createElement("div")
        buttons.forEach(btn=>{
            let button = document.createElement("button")
            button.setAttribute("onclick", btn.type === 0 ? `input("${btn.content}", this, this.parentNode.parentNode)` : `window.open("${btn.content}", "_blank")`)
            button.textContent = btn.text
            buttonsDiv.appendChild(button)
        })
        div.appendChild(buttonsDiv)
    }
    div.appendChild(time)
    chat.appendChild(div)
}

async function ai(msg) {
    if (!apiKey) return "Masukkan API Key!"
    let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`;
    try {
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: msg }]
                }]
            })
        });
        let data = await res.json();
        let text = data.candidates[0].content.parts[0].text;
        return text;
    } catch (error) {
        console.error('Error:', error)
        return `Tidak dapat menjawab, mungkin API Key yang anda masukkan salah`
    }
}

function getTime() {
    let now = new Date()
    return now.toLocaleTimeString()
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let responses = {
    "ita": {
        from: "A",
        text: "Bapane Criza"
    },
    "tes": {
        from: "A",
        text: "WWWWWWWWWW WWWWWWWWWW WWWWWWWWWW WWWWWWWWWW",
    },
    "text": {
        from: "A",
        text: "Halo, apakah ada masalah yang bisa saya bantu?",
    },
    "button": {
        from: "A",
        text: "Ini adalah pesan button",
        buttons: [
            { type: 0, text: "Button", content: "text" },
            { type: 1, text: "Url Button", content: "https://google.com" }
        ]
    }
}
