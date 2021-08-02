const homePage = (req, res) => {
    // res.sendFile("dashboard.ejs",{root:'./views'})
    res.render("welcome.ejs")
}

const pageNotFound = (req, res) => {
    // res.sendFile("404.html",{root:"./views/template/pages/examples"})
    res.send("Page Not Found")
}

module.exports = {
    homePage,pageNotFound
};
