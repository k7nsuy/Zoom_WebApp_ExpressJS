import express from "express"

const app = express();

// pug enging 사용
app.set("view engine", "pug")
// views 폴더를 url/views로 연결하여 사용
app.set("views", __dirname + "/views")
console.log(__dirname)

// public 폴더와 url/public 연결
app.use("/public", express.static(__dirname + "/public"))
 
// url/ 입력 시 views/home.pug 로 rendering 해준다
app.get("/", (req,res) => res.render("home"));

// url/ 이후 모든 주소를 /로 redirect 한다.
app.get("*", (req,res) => res.redirect("/"))

// listen이 제대로 작동 시 다음 문자열 실행
const handleListen = () => console.log(`Listening on http://localhost:3000`)
// 네트워크 listen을 3000으로 설정
app.listen(3000, handleListen); 

