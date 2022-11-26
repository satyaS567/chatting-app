const socket = io("http://localhost:8000")

const message = document.getElementById("msg")
const first = document.getElementById("first")

var name = window.prompt("Enter Your Name to Join the Chat :  ")
socket.emit("new-user-joined",name)
appendMessage(`You Joined tha Chat`,"right")

function appendMessage(msg,position){
    const msgBox = document.createElement("div")
    msgBox.innerHTML = msg
    msgBox.classList.add("alert")
    if(position=="left")
    msgBox.classList.add("alert-primary")
    else
    msgBox.classList.add("alert-secondary")
    msgBox.classList.add(position)
    first.appendChild(msgBox)
}


function sendMessage(){
    var msg = message.value
    appendMessage(`${msg} : You`,"right")
    socket.emit("send",msg)
    message.value=""
}

socket.on("user-joined",(name)=>{
    appendMessage(`${name} Joined tha Chat`,"right")
})
socket.on("receive",(data)=>{
    appendMessage(`${data.name} : ${data.message}`,"left")
})
socket.on("left",(name)=>{
    appendMessage(`${name} Left tha Chat`,"right")
})