require("dotenv").config()
const express = require("express");
const path = require("path");
const http = require("http");
const fetch = require("node-fetch");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const app = express()
const server = http.createServer(app)

// Socket.io 
const { Server } = require("socket.io");
const io = new Server(server);

// router middleware
const {router} = require("./routes/router")
// ejs

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('socketio', io);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")))


app.use(router)

// cache covid result
io.on("connection", (socket)=>{
    socket.on("user chat", (data)=>{
        // if(data.includes("how are you")){
        //     socket.emit("user message", {userData: greetings[Math.floor(Math.random() * greetings.length)]})
        //     return;
        // }
        // send message back to user
        socket.emit("user message", {userData: data})

       
    })

    socket.on("bot chat", async (data)=>{
        normalBotReply(data, socket)
        // getCovid(data)
        let covidResults = await getCovid(data)

        if(covidResults.message){
            socket.emit("bot message", {botData: covidResults.message})
            return;
        }

        const {country, cases, todayCases,deaths,recovered,critical,active} = covidResults;
    
        let messageBack = `
            Here is the summary of covid19 cases in <b>${country}</b>
            </br>
            
            Country:  <b>${country}
            </br>
            Cases:  <b>${cases}
            </br>
            Deaths:  <b>${deaths}
            </br>
            Recovered:  <b>${recovered}
            </br>
            Critical: <b>${critical}
        `
    
        // send message back to user
        socket.emit("bot message", {botData: messageBack})
    })

    // get voice chat
    socket.on("voice chat", async (data)=>{
        
        let covidResults = await getCovid(data)
        
        if(covidResults.message){
            socket.emit("voiceRecognition message", {botData: covidResults.message})
            return;
        }
        
        const {country, cases, todayCases,deaths,recovered,critical,active} = covidResults;
    
        let messageBack = `
            Here is the summary of covid19 cases in ${country}
            Country:  ${country}
            Cases:  ${cases}
            Deaths:  ${deaths}
            Recovered:  ${recovered}
            Critical: ${critical}
        `
    
        // send message back to user
        socket.emit("voiceRecognition message", {botData: messageBack})
    })
})


function normalBotReply(data, socket){
    let reply;

    if(data.includes("how")){
        reply = "I am fine"
        socket.emit("bot message", {botData: reply})
        // return;
    }
    if(data.includes("hello")){
        reply = "I am fine"
        socket.emit("bot message", {botData: reply})
        // return;
    }
    if(data.includes("who created | develope")){
        reply = "Benrobo my master created me"
        socket.emit("bot message", {botData: reply})
        return;
    }
    if(data.includes("who is benrobo")){
        reply = `Benrobo my master created me, you can get more info about him  here <a href="https://github.com/benrobo" target="_blank">benrobo</a>`
        socket.emit("bot message", {botData: reply})
        return;
    }
}

// get coronavirus details
async function getCovid(countryName){


    const API = "https://disease.sh/v3/covid-19/countries/"

    try {
        let req = await fetch(`${API}${countryName}`);
        let res = await req.json();

        if(res.message){
            return res
        }
        else{
            return res
        }
    } catch (err) {
        return {message: "Something went wrong, make sure you are connected"}
    }
}

const port = process.env.PORT || 4000

server.listen(port)