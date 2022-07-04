import express from "express"
import http from "http"
import { parse } from "path";
import WebSocket from "ws";


const app = express();

// pug enging 사용
app.set("view engine", "pug")
// views 폴더를 url/views로 연결하여 사용
app.set("views", __dirname + "/views")
console.log(__dirname)

// public 폴더와 url/public 연결
app.use("/public", express.static(__dirname + "/public"))
 
// url/ 입력 시 views/home.pug 로 rendering 해준다
app.get("/", (_,res) => res.render("home"));

// url/ 이후 모든 주소를 /로 redirect 한다.
app.get("*", (_,res) => res.redirect("/"))

// listen이 const server = http.createServer(app)로 작동 시 다음 문자열 실행
const handleListen = () => console.log(`Listening on http://localhost:3000`)

const server = http.createServer(app)

const wss = new WebSocket.Server({server})

function closeBrowser() {
    console.log("Disconnected from Client ❌")
}
const sockets = []

function handleConnection(socket) {
    sockets.push(socket)
    socket["nickname"] = "Anon"
    console.log("Connected to Browser(Client) ✅") 
    socket.on("close", closeBrowser)
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch (message.type) {
            case "new_message":
                sockets.forEach((aSocket) => 
                    aSocket.send(`${socket.nickname} : ${message.payload}`)
                    )
                break;
            case "nickname":
                socket["nickname"] = message.payload;
                break;
        }
    })
}


wss.on("connection", handleConnection)


server.listen(3000, handleListen)



// 네트워크 listen을 3000으로 설정
// app.listen(3000, handleListen); 

