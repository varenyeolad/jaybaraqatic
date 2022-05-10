function  checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next();
}

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/log")
}

module.exports = {
    checkNotAuthenticated,
    checkAuthenticated
}