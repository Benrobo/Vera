addEventListener("load", () => {
  tabFunc();
  FOOD_RECIPE()
  TARGET_HEART_RATE()
  COVID_CHATBOT();
  HEALTH_NEWS();
  BMI_ALGORITHM();
  MEDITATION_FUNC();
  MUSCLE_BUILDING();
});

// Utilities
function log(val) {
  return console.log(val);
}

function $(elm) {
  return document.querySelector(elm);
}

function $all(elm) {
  const main = document.querySelectorAll(elm);
  if (typeof main == "object") {
    return document.querySelectorAll(elm);
  }
}

// Main code

function tabFunc() {
  let tabs = document.querySelectorAll("[data-tab-cont]");

  let tabboxes = document.querySelectorAll("[data-tab-box]");

  let bmibox = document.querySelector(".bmi-calc");
  let corobox = document.querySelector(".coro-tracker");
  let musclebuilder = document.querySelector(".muscle-builder");
  let foodRecipe = document.querySelector(".food-recipe");
  let healthNews = document.querySelector(".health-news");
  let meditation = document.querySelector(".meditation");
  let heartRate = $(".heart-rate")
  let burgerMenu = $(".burger");
  let responsiveMenu = $("[data-responsive-menu]");

  tabboxes[0].style.display = "block";

  tabs.forEach((tab) => {
    tab.onclick = (e) => {
      let curr = document.querySelectorAll(".active");
      if (curr.length > 0) {
        curr[0].className = curr[0].className.replace("active", "");
      }

      e.target.classList.add("active");

      switch (e.target.dataset.tabCont) {
        case "bmi":
          tabboxes[0].style.display = "block";
          corobox.style.display = "none";
          musclebuilder.style.display = "none";
          foodRecipe.style.display = "none";
          healthNews.style.display = "none";
          meditation.style.display = "none";
          heartRate.style.display = "none";
          break;
        case "coro-tracker":
          tabboxes[0].style.display = "none";
          corobox.style.display = "block";
          musclebuilder.style.display = "none";
          foodRecipe.style.display = "none";
          healthNews.style.display = "none";
          meditation.style.display = "none";
          heartRate.style.display = "none";
          break;
        case "muscle-builder":
          tabboxes[0].style.display = "none";
          corobox.style.display = "none";
          musclebuilder.style.display = "block";
          foodRecipe.style.display = "none";
          healthNews.style.display = "none";
          meditation.style.display = "none";
          heartRate.style.display = "none";
          break;

        case "food-recipe":
          tabboxes[0].style.display = "none";
          corobox.style.display = "none";
          musclebuilder.style.display = "none";
          foodRecipe.style.display = "block";
          healthNews.style.display = "none";
          meditation.style.display = "none";
          heartRate.style.display = "none";
          break;
        case "health-news":
          tabboxes[0].style.display = "none";
          corobox.style.display = "none";
          musclebuilder.style.display = "none";
          foodRecipe.style.display = "none";
          healthNews.style.display = "block";
          meditation.style.display = "none";
          heartRate.style.display = "none";
          break;
        case "meditation":
          tabboxes[0].style.display = "none";
          corobox.style.display = "none";
          musclebuilder.style.display = "none";
          foodRecipe.style.display = "none";
          healthNews.style.display = "none";
          meditation.style.display = "block";
          heartRate.style.display = "none";
          break;
        case "heart-rate":
          tabboxes[0].style.display = "none";
          corobox.style.display = "none";
          musclebuilder.style.display = "none";
          foodRecipe.style.display = "none";
          healthNews.style.display = "none";
          meditation.style.display = "none";
          heartRate.style.display = "block";
          break;
        default:
          break;
      }
      // if(e.target.dataset.tabcont)
    };
  });

  log(responsiveMenu)
  // burger menu functionality
  let isActive = false;
  burgerMenu.onclick = ()=>{
    if(isActive == false){
      burgerMenu.innerHTML = ""
      burgerMenu.innerHTML = `<ion-icon name="close"></ion-icon>`
      responsiveMenu.style.display = "flex"
      isActive = true
    }
    else if(isActive == true){
      burgerMenu.innerHTML = `<ion-icon name="menu"></ion-icon>`
      responsiveMenu.style.display = "none"
      isActive = false
    }
  }
}

// BMI Algorithm

const BMI_ALGORITHM = function () {
  // formular
  /**
    bmi = weight (kg) / height(m2)
    pounds->kg = (2)pounds / 2.205(mass value) === 0.907185 kg
    ft -> m = (2) ft / 3.281 === 0.6096 m
  **/

  // global variables

  let calcbtn = $("[data-calc-button]");
  let gender = "";
  let genderbtn = $all("[data-gender]");
  let height = $("[data-bmi-height]");
  let weight = $("[data-bmi-weight]");
  let resultcont = $("[data-bmi-result]");
  let figuredir = "./statics/img/figures";
  let bmiInputs = $all(".bmi-inputs");
  let foodCont = $("[data-food-container]");
  let figure = $(".figure");
  let userFigure;

  let bmiStore = [];
  let bmiData = {};

  let { fboy, fgirl, sboy, sgirl } = {
    fboy: "fatboy.png",
    fgirl: "fatgirl.png",
    sboy: "slimboy.png",
    sgirl: "slimgirl.png",
  };

  // input event to disable calcbtn when fit empty
  bmiInputs.forEach((input) => {
    input.oninput = () => {
      if (input.value != "") {
        calcbtn.classList.remove("inactive");
      }
    };
  });

  genderbtn.forEach((btn) => {
    btn.onclick = (e) => {
      gender = e.target.classList[0];
    };
  });
  const OVERWEIGHT = 30,
    UNDERWEIGHT = 18.5,
    NORMAL = 25,
    OBESE = 31;

  let bmi = 0,
    meter,
    kg;

  calcbtn.onclick = () => {
    calculate();
  };
  calcbtn.classList.add("inactive");

  function calculate() {
    // validate inputs
    if (height.value == "" || weight.value == "") {
      alert("Input cannot be empty");
      return;
    } else if (height.value <= 0 || weight.value <= 0) {
      alert("Inputs value must be greather than 0");
      return;
    } else if (height.value > 10 || weight.value >= 1000) {
      alert("Invalid weight or height value");
      return;
    } else if (gender == "") {
      alert("Please select your gender");
    } else {
      calcbtn.classList.remove("inactive");

      meter = Math.pow(height.value / 3.281, 2);
      kg = weight.value / 2.205;
      bmi = (kg / meter).toFixed(2);

      //bmi data
      bmiData.gender = gender;
      bmiData.height = height.value;
      bmiData.weight = weight.value;
      bmiData.hUnit = "ft";
      bmiData.wUnit = "kg";
      // bmiData.userFigure = userFigure;
      bmiData.bmi = bmi;

      // save to localStorage
      bmiStore.push(bmiData);

      localStorage.setItem("bmi_data", JSON.stringify(bmiStore))

      if (bmi == null) {
        resultcont.innerHTML = `
          <p class="text-center p-4">Nothing to show here. Try calculating your BMI above.</p>
        `;
        return;
      }
      // male
      else if (bmi < 18.5 && gender == "male") {
        bmiData.userFigure = "underweight";
        resultcont.innerHTML = `
        <div class="result-screen">
          <div class="img-cont">
            <img src="${figuredir}/${sboy}" alt="" class="img-fluid">
          </div>
          <div class="result">
              <h3>YOUR BMI</h3>
              <h1>${bmi}</h1>
              <p class="figure underweight">UNDERWEIGHT</p> 
          </div>
          </div>
        `;
      } else if (bmi >= 25 && gender == "male") {
        bmiData.userFigure = "overweight";
        resultcont.innerHTML = `
        <div class="result-screen">
          <div class="img-cont">
            <img src="${figuredir}/${fboy}" alt="" class="img-fluid">
          </div>
          <div class="result">
              <h3>YOUR BMI</h3>
              <h1>${bmi}</h1>
              <p class="figure overweight">OVERWEIGHT</p> 
          </div>
          </div>
        `;
      } else if (bmi >= 18.5 && bmi < 24.9 && gender == "male") {
        bmiData.userFigure = "normal";
        resultcont.innerHTML = `
        <div class="result-screen">
          <div class="img-cont">
            <img src="${figuredir}/${sboy}" alt="" class="img-fluid">
          </div>
          <div class="result">
              <h3>YOUR BMI</h3>
              <h1>${bmi}</h1>
              <p class="figure normal">NORMAL</p> 
          </div>
          </div>
        `;
      } else if (bmi <= 30 && gender == "male") {
        bmiData.userFigure = "obese";
        resultcont.innerHTML = `
        <div class="result-screen">
          <div class="img-cont">
            <img src="${figuredir}/${fboy}" alt="" class="img-fluid">
          </div>
          <div class="result">
              <h3>YOUR BMI</h3>
              <h1>${bmi}</h1>
              <p class="figure obese">OBESE</p> 
          </div>
          </div>
        `;
      }
      // female
      else if (bmi < 18.5 && gender == "female") {
        bmiData.userFigure = "underweight";
        resultcont.innerHTML = `
        <div class="result-screen">
          <div class="img-cont">
            <img src="${figuredir}/${sgirl}" alt="" class="img-fluid">
          </div>
          <div class="result">
              <h3>YOUR BMI</h3>
              <h1>${bmi}</h1>
              <p class="figure underweight">UNDERWEIGHT</p> 
          </div>
          </div>
        `;
      } else if (bmi >= 25 && gender == "female") {
        bmiData.userFigure = "overweight";
        resultcont.innerHTML = `
        <div class="result-screen">
          <div class="img-cont">
            <img src="${figuredir}/${fgirl}" alt="" class="img-fluid">
          </div>
          <div class="result">
              <h3>YOUR BMI</h3>
              <h1>${bmi}</h1>
              <p class="figure overweight">OVERWEIGHT</p> 
          </div>
          </div>
        `;
      } else if (bmi >= 18.5 && bmi < 24.9 && gender == "female") {
        bmiData.userFigure = "normal";
        resultcont.innerHTML = `
        <div class="result-screen">
          <div class="img-cont">
            <img src="${figuredir}/${sgirl}" alt="" class="img-fluid">
          </div>
          <div class="result">
              <h3>YOUR BMI</h3>
              <h1>${bmi}</h1>
              <p class="figure normal">NORMAL</p> 
          </div>
          </div>
        `;
      } else if (bmi >= 30 && gender == "female") {
        bmiData.userFigure = "obese";
        resultcont.innerHTML = `
        <div class="result-screen">
          <div class="img-cont">
            <img src="${figuredir}/${fgirl}" alt="" class="img-fluid">
          </div>
          <div class="result">
              <h3>YOUR BMI</h3>
              <h1>${bmi}</h1>
              <p class="figure obese">OBESE</p> 
          </div>
          </div>
        `;
      }
    }
  }
};

// Meditation APP
const MEDITATION_FUNC = () => {
  // global variables
  let mediImg = $(".medi-img"),
    startbtn = $(".med-start-btn"),
    stopbtn = $(".med-stop-btn"),
    mediInstruction = $(".medi-struction"),
    sunvibes = $(".sunvibes"),
    totaltime = 7500,
    breatheTime = (totaltime / 5) * 2,
    holdTime = totaltime / 5;
  (timeleft = 3), (audio = new Audio("statics/audio/epic.mp3"));

  let startInterval;

  // clear mediinstruction content
  mediInstruction.innerHTML = "";

  startbtn.onclick = () => {
    startbtn.style.display = "none";
    stopbtn.style.display = "flex";

    mediInstruction.innerHTML = `
        <p>Meditation is about to begin, get ready!<p>
    `;

    // Play music
    setTimeout(() => {
      audio.play();
    }, 1000);
    audio.addEventListener("ended", function () {
      this.currentTime = 0;
      this.play();
    });
    audio.loop = true;

    startInterval = setInterval(() => {
      startMeditation();
    }, totaltime);
  };

  function startMeditation() {
    setTimeout(() => {
      sunvibes.classList.add("animate-sunpulse");
      mediImg.classList.add("medigrow");
      mediInstruction.innerHTML = `
      <p>Breathe In<p>
      `;

      setTimeout(() => {
        mediImg.classList.remove("medigrow");
        mediInstruction.innerHTML = `
        <p>Breathe Out<p>
        `;
      }, breatheTime);
    }, breatheTime);
  }

  // stop mediatation

  function stopMeditation() {
    stopbtn.onclick = () => {
      stopbtn.style.display = "none";
      startbtn.style.display = "flex";

      mediInstruction.innerHTML = "";
      sunvibes.classList.remove("animate-sunpulse");
      mediImg.classList.remove("medigrow");

      audio.currentTime = 0;
      audio.pause();
      clearInterval(startInterval);

      log(startbtn);
    };
  }
  stopMeditation();
};

// Health news
const HEALTH_NEWS = () => {
  // globalvariables
  let hcontainer = $(".h-container");
  let fcontainer = $(".f-container");

  // display a loading animation before data is gotten from server
  hcontainer.innerHTML = `
    <spann class="spinner-border"></span>
  `;

  fcontainer.innerHTML = `
    <spann class="spinner-border"></span>
  `;
  // make request
  getHealthNews("/api/health");
  getFitnessNews("/api/fitness");
  // get health news
  async function getHealthNews(api) {
    let req = await fetch(api);
    let res = await req.json();

    log(res);

    if (!res) {
      hcontainer.innerHTML = "";
      hcontainer.innerHTML = `
      <small style="text-align:center; padding:10px 12px; background:var(--dark-md);">Sorry something went wrong, health articles could not be displayed.<small>
      `;
    } else if (res.status == 500) {
      hcontainer.innerHTML = `
      <small style="text-align:center; padding:10px 12px; background:var(--dark-md);">Sorry something went wrong, health articles could not be displayed.<small>
      `;
    } else if (res && res.status == 200) {
      hcontainer.innerHTML = "";
      res.data.forEach((data) => {
        hcontainer.innerHTML += `
        <div class="h-cards">
          <a href="${data.redirUrl}" target="_blank">
            <div class="img-cont" style="background: url('${
              data.image
            }'); background-size:cover; background-position: center;"></div>
            
            <div class="body p-3">
                <small class="title">${data.title}</small>
                <br>
                <div class="date-cont mt-4">
                    <span>${data.posted_at}</span>
                </div>
            </div>
          </a>
        </div>
        `;
      });
    }
  }

  async function getFitnessNews(api) {
    let req = await fetch(api);
    let res = await req.json();

    if (!res) {
      fcontainer.innerHTML = "";
      fcontainer.innerHTML = `
      <small style="text-align:center; padding:10px 12px; background:var(--dark-md);">Sorry something went wrong, health articles could not be displayed.<small>
      `;
    } else if (res.status == 500) {
      fcontainer.innerHTML = `
      <small style="text-align:center; padding:10px 12px; background:var(--dark-md);">Sorry something went wrong, health articles could not be displayed.<small>
      `;
    } else if (res && res.status == 200) {
      fcontainer.innerHTML = "";
      res.data.forEach((data) => {
        fcontainer.innerHTML += `
        <div class="h-cards">
          <a href="${data.redirUrl}" target="_blank">
            <div class="img-cont" style="background: url('${
              data.image
            }'); background-size:cover; background-position: center;"></div>
            
            <div class="body p-3">
                <small class="title">${data.title}</small>
                <br>
                <div class="date-cont mt-4">
                    <span>${data.posted_at}</span>
                </div>
            </div>
          </a>
        </div>
        `;
      });
    }
  }
};

// Covid-19 chat message
const COVID_CHATBOT = () => {
  // Tab Function
  let tabbtns = $all("[data-chat-tab]");
  let chatContainer = $(".chat-container");
  let voiceRecogCont = $(".voice-reg-cont");
  let voiceStart = $(".voice-start");
  let voiceStop = $(".voice-stop");

  tabbtns.forEach((btn) => {
    btn.onclick = (e) => {
      e.target.classList.remove("active");

      if (e.target.classList.contains("chatbot-btn")) {
        chatContainer.style.display = "block";
        voiceRecogCont.style.display = "none";
      } else if (e.target.classList.contains("voice-recognition-btn")) {
        chatContainer.style.display = "none";
        voiceRecogCont.style.display = "flex";
      }
      // e.target.classList.add("active");
    };
  });

  // return;
  // init bot message
  let bot;
  let botMsg = ["hello ben", "how can i help you"];
  // init socket.io
  var socket = io();

  // global variables
  let chatbtn = $(".chat-submit");
  let chatmsg = $(".chat-msg-input");
  let chatCont = $(".chat-body");
  let botLoading = $(".bot-loading");
  let chatAudio = new Audio("statics/audio/chat.mp3")

  botLoading.style.display = "block";
  // onpage load, show a bot message
  setTimeout(() => {
    botLoading.style.display = "none";
    setTimeout(() => {
      div = document.createElement("div");
      div.setAttribute("class", "chat-bot-msg");
      div.innerText =
        "This is a simple covid19 bot, all you have to do is type a country name and get covid 19 result relating to that country";
      chatCont.appendChild(div);
    }, 1000);
  }, 1000);

  chatbtn.onclick = async (e) => {
    // let div = document.createElement("div");
    socket.emit("user chat", chatmsg.value);
    socket.emit("bot chat", chatmsg.value);
  };

  // get message from server

  socket.on("user message", (data) => {
    if (data.userData) {
      let div = document.createElement("div");
      chatmsg.value = "";
      // chatCont.innerHTML = ""
      div.setAttribute("class", "chat-user-msg");
      div.innerText = data.userData;
      chatCont.appendChild(div);
      chatAudio.play()
      chatAudio.currentTime = 0
      chatCont.scrollTop = chatCont.scrollHeight;
    }
  });

  socket.on("bot message", (data) => {
    log(data);
    botLoading.style.display = "block";
    if (!data) {
      botLoading.style.display = "block";
    }
    if (data.botData) {
      setTimeout(() => {
        let div = document.createElement("div");
        div.setAttribute("class", "chat-bot-msg");
        div.innerHTML = data.botData;
        chatCont.appendChild(div);
        chatAudio.play()
        chatAudio.currentTime = 0
        chatCont.scrollTop = chatCont.scrollHeight;
        botLoading.style.display = "none";
      }, 300);
    }
  });

  // handle voice recognition

  function voiceReg() {
    let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    let recognition = new SpeechRecognition();

    let synth = window.speechSynthesis;
    
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = async function (e) {
      log("voice is activated");
      let index = e.resultIndex
      let finalResult = e.results[index][0].transcript.trim();
      
      if(!finalResult){
        log("no result")
        readAloud(finalResult="I did not get any input, please provide a country name, for example Nigeria ");
        return
      }
      // read the result out loud
      readAloud(finalResult)
    };

    

    // recognition.onend = ()=>{
    //   recognition.stop();
    // }

    voiceStart.onclick = (e) => {
      log("button hold")
      setTimeout(() => {
        voiceStart.style.display = "none";
        voiceStop.style.display = "flex";
      }, 1000);
      recognition.start();
    };

    voiceStop.onclick = (e) => {
      log("button left")
      voiceStop.style.display = "none";
      voiceStart.style.display = "flex";

      recognition.stop();
      // synth.cancel()
    };


    function readAloud(message){
      // once result is gotten, make a request to server and process it
      log(message)

      socket.emit("voice chat", message)

      socket.on("voiceRecognition message", (data)=>{
        log(data)
        if(data.botData){
          log(data.botData)
          speech.text = data.botData;

          synth.speak(speech);
          // synth.cancel()
        }
        else{
          speech.text = "Something went wrong while processing your data";

          synth.speak(speech);
        }
      })

      let messages = "pls hold on"
      var speech = new SpeechSynthesisUtterance(messages);

      speech.volume = 1
      speech.rate = 1;
      speech.pitch = 3;
      speech.text = "please hold on while data is been process"
      synth.speak(speech);
    }
  }

  voiceReg();
};


// Traget Heart Rate 

const TARGET_HEART_RATE = ()=>{
  // global variables
  let ageInput = $("[data-heart-age]");
  let  heartBtn = $(".heartrate-btn");
  let resultCont = $("[data-heart-result]");
  let closeCont = $("[data-close-heart-container]");
  let heartBeatResult = $("[data-heart-result-value]");
  let heartBeat = new Audio("./statics/audio/HeartBeat.mp3");
  let historyCont = $("[data-heart-rate-history]");
  let historyBtn = $("[data-history-btn]");
  let historyTable = $("[data-heart-history]");
  let historyClose = $("[data-close-history]")
  let historyClear = $("[data-clear-history]")
  let saveBtn = $("[data-save-heart-value]");
  let MHR; // Maximum Heart Rate
  let defaultValue = 220;
  let rest = 70;
  let intensity = 0.85;


  // heart result
  let storeHeartRate = [];
  let heartResult = {};

  heartBtn.onclick = ()=>{
    if(ageInput.value == ""){
      alert("Input cant be empty");
      return;
    }
    else if(ageInput.value == 0 || ageInput.value < 0){
      alert("Age cant be zero or less than zero");
      return;
    }
    else if(ageInput.value == 0 || ageInput.value > 300){
      alert("No one has lived up to that age in this modern days.");
      return;
    }
    else{
      heartBeat.play();
      heartBeat.loop = true;
      targetHeartRate(ageInput.value)
      setTimeout(() => {
        resultCont.style.display = "flex"
      }, 200);
    }
  }

  // close heart container
  closeCont.onclick = ()=>{
    resultCont.style.display = "none"
    heartBeatResult.classList.remove("anime");
    heartBeatResult.textContent =  "";
    heartBeat.pause();
    heartBeat.currentTime = 0;
  }

  // save result in localstorage
  saveBtn.onclick = ()=>{
    heartResult["created"] = moment(new Date().getTime()).startOf("hour").fromNow()
    heartResult["max_heart_rate"] = MHR;
    heartResult["heart_rate_reserved"] = MHR - 63;

    storeHeartRate.push(heartResult)
    
    // store in localstorage
    if(localStorage.getItem("heart_rate") == null){
      localStorage.setItem("heart_rate", JSON.stringify(storeHeartRate))
      return;
    }
    let storage = localStorage.getItem("heart_rate");

    storage = storage ? JSON.parse(storage) : [];

    storage.push(heartResult);

    localStorage.setItem("heart_rate", JSON.stringify(storage))
    
    alert("Save successfully");
  }

  // claulate target heart rate

  function targetHeartRate(value){
    let result = ((defaultValue - value) * intensity) + rest;
    MHR = Math.floor(result);
    heartBeatResult.classList.add("anime");
    setTimeout(() => {
      heartBeatResult.textContent = `${MHR} bpm`;
      heartBeat.pause();
      heartBeat.currentTime = 0;
    }, 3000);
  }
  

  // history
  // hide and show history
  historyBtn.onclick = ()=>{
    historyCont.style.display = "flex"
  }

  historyClose.onclick = ()=>{
    historyCont.style.display = "none"
  }

  // clear all history
  historyClear.onclick = ()=>{
    localStorage.setItem("heart_rate", []);
  }

  // populate history
  function populateHistory(){
    let localHistory = localStorage.getItem("heart_rate");

    if(localHistory == null || localHistory == ""){
      historyTable.innerHTML = `<div>No heart rate History.</div>`;
      historyClear.style.display = "none"
      return;
    }else{
      historyClear.style.display = "flex"
      historyTable.innerHTML = ""
      JSON.parse(localHistory).forEach((data)=>{
        historyTable.innerHTML += `
          <tr>
            <td>${data.created}</td>
            <td>${data.heart_rate_reserved}</td>
            <td>${data.max_heart_rate}</td>
          </tr>
        `;
      })
    }
   
  }
  setInterval(() => {
    populateHistory()
  }, 500);
}


// MUSCLE BUILDING

const MUSCLE_BUILDING = ()=>{
  // global variables

  let currWeight = $("[data-curr-weight]"),
      currHeight = $("[data-curr-height]"),
      currworkoutTarget = $("[data-workout-target]"),
      workoutCompleted = $("[data-curr-workout-completed]"),
      muscleImg = $("[data-muscle-img]"),
      muscleSelect = $("[data-muscle-select]"),
      musclePreview = $("[data-select-preview]"),
      startWorkoutBtn = $("[data-start-workout]"),
      workoutTimerCont = $(".workout-timer-cont"),
      workoutTimer = $("[data-workout-timer]"),
      timerStopBtn = $("[data-timer-stop-btn]"),
      clearHistoryBtn = $("[data-clear-btn]"),
      selectValue,
      exerciseBody = $("[data-exercise-body]"),
      reccBody = $("[data-recc-body]"),
      workoutTarget = 0,
      workOutCount = 0,
      totalWorkout = 0


  // get daat from localStorage and replace the cards textContent
  setInterval(() => {
    if(localStorage.getItem("bmi_data") == null){
      currWeight.innerHTML = `0kg`
      currHeight.innerHTML = `0ft`
    }else{
      let {gender, hUnit, height, wUnit, weight} = JSON.parse(localStorage.getItem("bmi_data"))[0];
      currWeight.innerHTML = `${weight}${wUnit}`
      currHeight.innerHTML = `${height}${hUnit}`
    }

    let localWorkoutCount = JSON.parse(localStorage.getItem("workout_data"))


    if(localWorkoutCount !== null){
      localWorkoutCount.forEach((data)=>{
        workoutCompleted.innerHTML = data.totalWorkout
        currworkoutTarget.textContent = data.workoutTarget
      })
      return;
    }
    else{
      workoutCompleted.innerHTML = "0"
      currworkoutTarget.textContent = "0"
    }
  }, 1000);


  // Workout functionality

  const workOutFunc = ()=>{
    // fill up select value
    let muscles = "FOREARM NECK trapezius deltoid chest biceps abs obliques".split(" ")

    for (let i = 0; i < muscles.length; i++) {
      let option = document.createElement("option");
      option.value = muscles[i].toUpperCase();
      option.textContent = muscles[i].toUpperCase();
      
      muscleSelect.appendChild(option)
    }

    // set the muscleImg default value
    let selectValue
    selectValue = muscleSelect.value;

    muscleImg.src = `./statics/img/muscles/${selectValue.toLowerCase()}.png`

    // handle select muscle
    muscleSelect.onchange = ()=>{
      selectValue = muscleSelect.value;

      muscleImg.src = `./statics/img/muscles/${selectValue.toLowerCase()}.png`
      musclePreview.innerHTML = `
        <p class="muscle-select-txt">${selectValue}</p>
        <ion-icon class="select-btn" name="chevron-forward-outline"></ion-icon>
      `
    }

    // start workout
    startWorkoutBtn.onclick = ()=>{
      let userWorkoutValue = prompt("Plese specify target workout value.");
      
      let workoutDataStore = [];
      let workoutData = {};

      if(userWorkoutValue == ""){
        alert("Target value is required")
        return;
      }
      else if(userWorkoutValue.length >= 10){
        alert("Maximum target value length is 10")
        return;
      }
      else if(isNaN(userWorkoutValue)){
        alert("Workout Target value must be a Number")
        return;
      }
      else{
        workoutTarget = parseInt(userWorkoutValue);
       let workoutTimerValue = parseInt(userWorkoutValue);
        
        workoutTimerCont.style.display = "flex";

        let startWorkoutInterval = setInterval(() => {
          workoutTimerValue--;
          if(workoutTimerValue <= 0){
            workoutTimerValue = 0;
            workoutTimer.textContent = workoutTimerValue;
            return;
          }
          workoutTimer.textContent = workoutTimerValue;
          
          timerStopBtn.onclick = ()=>{
            clearInterval(startWorkoutInterval)
            totalWorkout = workoutTarget - workoutTimerValue;
            workoutTimerCont.style.display = "none";


            // saveData to localStorage
            workoutData["workoutTarget"] = workoutTarget;
            workoutData["totalWorkout"] = totalWorkout;
            workoutData["workoutType"] = muscleSelect.value + " Muscle";
            workoutData["created"] = new Date().getTime();

            workoutDataStore.push(workoutData)

            if(localStorage.getItem("workout_data") == null){
              localStorage.setItem("workout_data", JSON.stringify(workoutDataStore))
              return;
            }

            let localWorkoutValue = JSON.parse(localStorage.getItem("workout_data"));

            localWorkoutValue.push(workoutData)

            localStorage.setItem("workout_data", JSON.stringify(localWorkoutValue))
          }

        }, 1000);
        recommendationFunc()
      }
    }

    // populate worout history
    const populateWorkoutHistory = ()=>{
      if(localStorage.getItem("workout_data") == null || localStorage.getItem("workout_data") == ""){
        exerciseBody.innerHTML = "You dont have any workout history here."
        return;
      }

      let workoutLocal = JSON.parse(localStorage.getItem("workout_data"));

      exerciseBody.innerHTML = ""

      workoutLocal.forEach(data => {
        let title = data.workoutType.split(" ");
        let firsIndexFirstLetter = title[0].slice(0,1),
            secondIndexFirstLetter = title[1].slice(0,1);
        exerciseBody.innerHTML  += `
        <div class="exercise-card">
          <div class="exercise-img">${firsIndexFirstLetter}${secondIndexFirstLetter}</div>
          <div class="exercise-txt">
              <h5>${data.workoutType}</h5>
              <small>${data.totalWorkout} Times</small>
          </div>
          <div class="exercise-date">
              AUG 19
          </div>
        </div>
        `;
      });
    }
    
    setInterval(() => {
      populateWorkoutHistory()
    }, 1000);
  }
  workOutFunc()

  // Clear all history
  clearHistoryBtn.onclick  = ()=>{
    if(localStorage.getItem("workout_data") !== null){
      localStorage.removeItem("workout_data")
    }
  }

  // recommendation functionality

  const recommendationFunc = async ()=>{

    // get related videos from select value;
    let req = await fetch("/api/getMuscle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({value: muscleSelect.value.toLowerCase()})
    })

    let response = await req.json();
    // show loading text
    reccBody.innerHTML = `
      <small>Loading.....</small>
    `
    if(response.youtubeScrapeError || response.youtubeScrapeCode == 404){
      reccBody.innerHTML = `
        <small>${response.youtubeScrapeError}.</small>
      `
      return;
    }
    else{
      reccBody.innerHTML = "";
      response.slice(0, 7).forEach((data)=>{
        reccBody.innerHTML += `
        <div class="recc-card" data-vid-url="${data.video}" data-recc-card data-recc-id="${data.id}">
          <div class="img-cont" style="background: url('${data.image}'); background-size:cover; background-position:center;" data-recc-image></div>
          <br>
          <div class="body">
              <span class="recc-title">
                  ${data.title.slice(0, 40)}...
              </span>
          </div>
        </div>
        `;
      })
    }

    // return;
    let reccImage = $all("[data-recc-image]");
    let reccModal = $(".recc-modal");
    let reccModalCont = $(".recc-modal-cont");

    if(reccImage){
      for (let i = 0; i < reccImage.length; i++) {
        reccImage[i].onclick = (e)=>{
          let vidUrl = e.target.parentElement.getAttribute("data-vid-url");

          log(vidUrl)

          reccModal.style.display = "flex";

          reccModalCont.innerHTML = `
            <iframe src='${vidUrl}' width="700" height="600"></iframe>
          `
        }
      }

      reccModal.onclick = (e)=>{
        log(e.target)
        if(e.target.classList.contains("recc-modal")){
            reccModal.style.display = "none"
            reccModalCont.innerHTML = ""
          }
      }
    }
  }
  recommendationFunc()
} 


// Recipe App
const FOOD_RECIPE = ()=>{
  // global variables
  let searchInp = $("[data-recipe-searchinp]"),
      searchBtn = $("[data-search-btn]"),
      searchResultCont = $("[data-recipe-result]"),
      recipeModal = $(".recipe-food-modal"),
      mainModalCont = $("[data-recipe-main-modal]"),
      recipeModalImg = $(".recipe-modal-img"),
      recipeCloseBtn = $(".recipe-close-modal-btn"),
      recipeMOdalTitle = $(".recipe-modal-title"),
      recipeMOdalAuthor = $(".recipe-modal-author"),
      recipeModalIng = $(".recipe-modal-ingredients-list"),
      recipePreText = $(".recipe-modal-preparation-text"),
      recipePreLink = $(".recipe-preparation-link"),
      recipeNutTable = $(".recipe-nutrition-table"),
      recipeModalFact = $(".recipe-modal-fact")
      recipeDietText = $(".recipe-diets-text");



  searchBtn.onclick  = ()=>{
    if(searchInp.value == ""){
      alert("Inpus cant be empty");
      return;
    }

    searchFood(searchInp.value)
  }

  getAllRecipe()
  
  async function getAllRecipe(){
    searchResultCont.innerHTML = `
        <span class="spinner spinner-border"></span>
      `;

    let req = await fetch("/api/getRecipe/all");
    let res = await req.json();
    // log(res.text())
		// return
    if(res.msg || res.status == 400 || res.status == 500){
      searchResultCont.innerHTML = `
        <p>${res.msg}</p>
      `;
    }
    else if(res == "" || res == null){
      searchResultCont.innerHTML = `
        <p>Sorry Recipe with that food name doesnt exist</p>
      `;
      return;
    }
    else{
      searchResultCont.innerHTML = "";
      for (let i = 0; i < res.length; i++) {

        const {uri, label, image, source, url, dietLabels, healthLabels, ingredientLines,calories,totalNutrients,totalDaily, mealType} = res[i].recipe;

        searchResultCont.innerHTML += `
        <div class="food-card" 
        data-title="${label}"
        data-recipe-uri="${url}" data-recipe-source="${source}" data-recipe-healthLabels="${healthLabels}" data-recipe-ing="${ingredientLines}" data-recipe-calories="${calories}"
        data-recipe-img="${image}"
        data-recipe-labels="${dietLabels}"
        data-meal-type="${mealType}">
          <div class="img" style="background:url('${image}'); background-size: cover; background-position: center;" data-food-id="${i}" data-recipe-image>
          </div>
          <br>
          <div class="body">
              <p>${label}</p>
          </div>
        </div>
        
        `

      }
      openModal()
    }

    
  }

  async function searchFood(search){
    searchResultCont.innerHTML = `
      <span class="spinner spinner-border"></span>
    `;

    let req = await fetch("/api/getRecipe/search", {
      method: "post",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({searchValue: search})
    });

    let res = await req.json();
    log(res)

    
    
    if(res.msg || res.status){
      searchResultCont.innerHTML = `
        <p>${res.msg}</p>
      `;
    }
    else if(res == ""){
      searchResultCont.innerHTML = `
        <p>Sorry Recipe with that food name doesnt exist</p>
      `;
      return;
    }
    else{
      searchResultCont.innerHTML = "";
      for (let i = 0; i < res.length; i++) {

        const {uri, label, image, source, url, dietLabels, healthLabels, ingredientLines,calories,totalNutrients,totalDaily, mealType} = res[i].recipe;

        searchResultCont.innerHTML += `
        <div class="food-card" 
        data-title="${label}"
        data-recipe-uri="${url}" data-recipe-source="${source}" data-recipe-healthLabels="${healthLabels}" data-recipe-ing="${ingredientLines}" data-recipe-calories="${calories}"
        data-recipe-img="${image}"
        data-recipe-labels="${dietLabels}"
        data-meal-type="${mealType}">
          <div class="img" style="background:url('${image}'); background-size: cover; background-position: center;" data-food-id="${i}" data-recipe-image>
          </div>
          <br>
          <div class="body">
              <p>${label}</p>
          </div>
        </div>
        `

      }
      openModal()
    }
  }

  function openModal() {
    let recipeImg = document.querySelectorAll("[data-recipe-image]");
    recipeImg.forEach((img)=>{
      img.onclick = (e)=>{

        recipeModal.style.display = "flex"

        let {title,recipeCalories,recipeHealthlabels, recipeIng, recipeNutrients,recipeSource,recipeUri,recipeLabels,recipeImg, mealType} = e.target.parentElement.dataset;

        log(recipeModalImg)

        recipeModalImg.src = recipeImg;
        recipeMOdalTitle.textContent = title;
        recipeMOdalAuthor.textContent = recipeSource;

        recipeModalIng.innerHTML = "";
        recipeIng.split(",").forEach((ing)=>{
          let li = document.createElement("li");
          li.innerHTML = ing;

          recipeModalIng.appendChild(li);
        })

        recipePreText.textContent  = `
        This recipe is provided by ${recipeSource}. You can view the detailed preparation instructions by clicking the following link.
        `
        recipePreLink.setAttribute("href", recipeUri)
        
        recipeModalFact.innerHTML  =`
          <span> ${Math.floor(recipeCalories)} calories | ${mealType}</span>
        `

        // recipeDietText.textContent = recipeHealthlabels.replace(",", " ,");


        recipeDietText.innerHTML = "";
        recipeHealthlabels.split(",").forEach((diets)=>{
          let span = document.createElement("span");
          span.setAttribute("class", "recipe-diet");
          
          span.textContent = diets;
          recipeDietText.append(span)
        })

        log(recipeNutrients)
      }
    })
    closeModal()

  }
  
  function closeModal(){
    recipeCloseBtn.onclick = ()=>{
      recipeModal.style.display = "none"
    }
  }
  
}
