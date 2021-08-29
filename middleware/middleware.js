// Protect page routes

function authPage(req, res, next){
    let {username, userId} = req.cookies;

    // check if user exist
    if(username && userId){
        next()
    }
    else{
        res.redirect("/")
    }
}

module.exports = {
    authPage
}