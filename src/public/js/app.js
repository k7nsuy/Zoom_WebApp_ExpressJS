const messageList = document.querySelector("ul")
const nicknameForm = document.querySelector("#nickname")
const messageForm = document.querySelector("#message")

const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener("open", () => {
    console.log("Connected to the Server✅")
})

socket.addEventListener("message", (message)=> {
    const li = document.createElement("li")
    li.innerHTML = message.data
    messageList.append(li);
    console.log("New message", message.data)
})

socket.addEventListener("close", ()=> {
    console.log("Disconnected from the Server❌")
})

function makeMessage(type,payload) {
    const msg = {type,payload}
    return JSON.stringify(msg)
}

function handleSubmit(event) {
    event.preventDefault()
    const input = messageForm.querySelector("input")
    socket.send(makeMessage("new_message", input.value))
    input.value = ""
}

function handleNickSubmit(event) {
    event.preventDefault()
    const input = nicknameForm.querySelector("input")
    socket.send(makeMessage("nickname",input.value))
    input.value = ""
}

messageForm.addEventListener("submit", handleSubmit)
nicknameForm.addEventListener("submit", handleNickSubmit)