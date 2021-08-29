const express = require("express");
const { v4: uuid } = require("uuid");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

// scrapper
const { getHealthNews, getFitnessNews } = require("../scrapper")



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
    .then((data)=>{
        // console.log(data)
        // return
        return res.json({data, status: 200})
    })
    .catch((err)=>{
      console.log(err)
      res.json({status: 500, msg: "Something went wrong"+err})
    })
});

// get fitness articles
// 'https://i.kinja-img.com/gawker-media/image/upload/aacdc97e447bb7a5df1dfada91a779dd.jpg
router.get("/api/fitness", async (req, res) => {

  getFitnessNews("obese")
  .then((data)=>{
      // console.log(data)
      // return
      return res.json({data, status: 200})
  })
  .catch((err)=>{
    res.json({status: 500, msg: "Something went wrong "+err})
  })

});


module.exports = {
  router,
};
