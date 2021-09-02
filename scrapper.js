const cheerio = require("cheerio");
const fetch = require("node-fetch");

let healthTerms = ["health", "vaccine", "medicare"]
let fitnessTerms = ["fitness", "yoga", "heart-rate"]
let randHealth = healthTerms[Math.floor(Math.random() * healthTerms.length)],
    randFitness =  fitnessTerms[Math.floor(Math.random() * fitnessTerms.length)];

let api = "https://gizmodo.com/search?blogId=4&q=";


const healthCache = {};
const fitnessCache = {};

const recipeResults = []

function getHealthNews(randTerms){
    if(healthCache[randTerms]){
        return Promise.resolve(healthCache[randTerms])
    }
    return fetch(`${api}${randTerms}`)
        .then((res)=> res.text())   
        .then((data)=>{
            let $ =  cheerio.load(data);
        
            $(".sc-2mtmad-6").each((i, elm)=>{
                let e = $(elm)
        
                let imgFormat = e.find(".sc-2mtmad-6 article.js_post_item .dFCKPx figure a div.js_lazy-image div").find("img").attr("data-format")
                let imgId = e.find(".sc-2mtmad-6 article.js_post_item .dFCKPx figure a div.js_lazy-image div").find("img").attr("data-chomp-id")
                let href = e.find(".sc-2mtmad-6 article.js_post_item .dFCKPx div.eRRMSy .cw4lnv-5 a").attr("href")
                let title = e.find(".sc-2mtmad-6 article.js_post_item .dFCKPx div.eRRMSy .cw4lnv-5 a h2").text()
                let author = e.find(".sc-2mtmad-6 article.js_post_item .dFCKPx div.eRRMSy .cw4lnv-8 .cnwvOC div a").text()
                let time = e.find(".sc-2mtmad-6 article.js_post_item .dFCKPx div.eRRMSy .cw4lnv-8 .jDhWhZ time a").text()
        
                let redirLink = e.find(".sc-2mtmad-6 article.js_post_item .dFCKPx div.eRRMSy .cw4lnv-5 a").attr("href")
        

                let recipeHealthObject = {
                    title: title,
                    author: author,
                    url: href,
                    posted_at: time,
                    image: `https://i.kinja-img.com/gawker-media/image/upload/${imgId}.${imgFormat}`,
                    redirUrl: redirLink,
                    categories: "fitness"
                }

                // log(imgFormat)

                recipeResults.push(recipeHealthObject)
            })  
        
            healthCache[randTerms] = recipeResults;
            return healthCache[randTerms];
        })
}


// getHealthNews("health")
// return;

function getFitnessNews(randTerms){
    if(fitnessCache[randTerms]){
        return Promise.resolve(fitnessCache[randTerms])
    }
    return fetch(`${api}${randTerms}`)
        .then((res)=> res.text())   
        .then((data)=>{
            let $ =  cheerio.load(data);
        
            $(".sc-2mtmad-6").each((i, elm)=>{
                let e = $(elm)
        
                let imgFormat = e.find(".sc-2mtmad-6 article.js_post_item .dFCKPx figure a div.js_lazy-image div").find("img").attr("data-format")
                let imgId = e.find(".sc-2mtmad-6 article.js_post_item .dFCKPx figure a div.js_lazy-image div").find("img").attr("data-chomp-id")
                let href = e.find(".sc-2mtmad-6 article.js_post_item .dFCKPx div.eRRMSy .cw4lnv-5 a").attr("href")
                let title = e.find(".sc-2mtmad-6 article.js_post_item .dFCKPx div.eRRMSy .cw4lnv-5 a h2").text()
                let author = e.find(".sc-2mtmad-6 article.js_post_item .dFCKPx div.eRRMSy .cw4lnv-8 .cnwvOC div a").text()
                let time = e.find(".sc-2mtmad-6 article.js_post_item .dFCKPx div.eRRMSy .cw4lnv-8 .jDhWhZ time a").text()
        
                let redirLink = e.find(".sc-2mtmad-6 article.js_post_item .dFCKPx div.eRRMSy .cw4lnv-5 a").attr("href")
        

                let recipeFitnessObject = {
                    title: title,
                    author: author,
                    url: href,
                    posted_at: time,
                    image: `https://i.kinja-img.com/gawker-media/image/upload/${imgId}.${imgFormat}`,
                    redirUrl: redirLink,
                    categories: "health"
                }

                recipeResults.push(recipeFitnessObject)
            })  
            
            fitnessCache[randTerms] = recipeResults;
            return fitnessCache[randTerms];
        })
}







function log(val){
    return console.log(val)

    // .replace("w_80", "w_400").replace("h_80", "h_400")
    // match(/[a-z0-9A-Z]+\.(?:jpg|gif|png)/)
}

module.exports = {
    getHealthNews,
    getFitnessNews
}