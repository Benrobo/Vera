const express = require("express");
const { v4: uuid } = require("uuid");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const youtube = require("scrape-youtube").default;

// ENV
const FOOD_APP_ID = process.env.FOOD_APP_ID;
let FOOD_API_KEY = process.env.FOOD_API_KEY;

// scrapper
const { getHealthNews, getFitnessNews } = require("../scrapper");

// middlewares
const { authPage } = require("../middleware/middleware");

// logger
function log(val) {
  return console.log(val);
}

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/dashboard", authPage, (req, res) => {
  let userinfo = req.cookies;
  res.render("dashboard", { userinfo: userinfo });
});

// recive post request from client

router.post("/auth/user", (req, res) => {
  let body = req.body.username;
  const userId = uuid();
  // set cookie for current user

  res.cookie("username", body, { expire: 840000 + Date.now() });
  res.cookie("userId", userId, { expire: 840000 + Date.now() });

  // send response to client
  res.json({ msg: " weldone", data: body, status: 200 });
});

// logout user
router.get("/logout", authPage, (req, res) => {
  res.clearCookie("username");
  res.clearCookie("userId");

  res.redirect("/");
});

// get Health news routes
router.get("/api/health", async (req, res) => {
  getHealthNews("health")
    .then((data) => {
      // console.log(data)
      // return
      return res.json({ data, status: 200 });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: 500, msg: "Something went wrong" + err });
    });
});

// get fitness articles
router.get("/api/fitness", async (req, res) => {
  getFitnessNews("obese")
    .then((data) => {
      // console.log(data)
      // return
      return res.json({ data, status: 200 });
    })
    .catch((err) => {
      res.json({ status: 500, msg: "Something went wrong " + err });
    });
});

// get muscle fitness route
router.post("/api/getMuscle", (req, res) => {
  let terms = req.body.value;

  let yplist1 = `https://www.youtube.com/c/PureGymVideo/search?query=${terms}`;

  let yplist2 = `https://www.youtube.com/user/bodybuildingcomvideo/search?query=${terms}`;
  

  youtube.search(yplist2)
  .then((data) => {
    let youtubeCache = {};
    let youtubeStore = [];
    data.videos.forEach((video) => {
      let { id, title, link, thumbnail, uploaded } = video;

      const youtubeCont = {
        id: id,
        title: title,
        link: link,
        image: thumbnail,
        video: `https://www.youtube.com/embed/${id}`,
        uploaded: uploaded,
      };

      youtubeStore.push(youtubeCont);
      youtubeCache[terms] = youtubeStore;
  
      return youtubeCache[terms]
      
    });
    
    res.send(youtubeCache[terms])
  })
  .catch((err)=>{
    res.send({youtubeScrapeError: "Something went wrong video cant be displayed", youtubeScrapeCode:404})
  })
});


function getYoutubeVideo(terms){
  let youtubePlaylist = `https://www.youtube.com/c/PureGymVideo/search?query=${terms}`;
  
  log(terms)

  let youtubeCache = {};
  let youtubeStore = [];


  youtube.search(youtubePlaylist)
  .then((data) => {
    data.videos.forEach((video) => {
      let { id, title, link, thumbnail, uploaded } = video;

      const youtubeCont = {
        id: id,
        title: title,
        link: link,
        image: thumbnail,
        video: `https://www.youtube.com/embed/${id}`,
        uploaded: uploaded,
      };

      youtubeStore.push(youtubeCont);
      youtubeCache[terms] = youtubeStore;
  
      return (youtubeCache)
      
    });
    
  })
}


// get recipe food 

router.get("/api/getRecipe/all", async (req, res)=>{
  getAllRecipe()
  .then((data)=>{
    res.json(data)
  })
})

router.get("/api/getRecipe/search", (req, res)=>{

})

let foodNames = ["Bread", "Breakfast", "Dessert", "Drink", "Side dish", "Snack", "Pies", "Main", "Salad", "Starter", "Soup", "egusi","rice","milk","fish"];

function getAllRecipe(){
  let randFood = foodNames[Math.floor(Math.random() * foodNames.length)]

  let url = `https://api.edamam.com/search?q=${randFood},&from=0&to=100&app_id=${FOOD_APP_ID}&app_key=${FOOD_API_KEY}`

  return fetch(url)
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      if(!data){
        return {msg: "Something went wrong.", status: 400}
      }
      return (data.hits)
    })
}

module.exports = {
  router,
};
