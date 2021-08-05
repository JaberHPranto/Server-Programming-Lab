const getPC = (req, res) => {
    res.render("programming-contest/register.ejs",{error:req.flash("error")})
}

module.exports = {
    getPC
}