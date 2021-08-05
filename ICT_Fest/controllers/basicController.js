const homePage = (req, res) => {
    res.render("welcome.ejs")
}

const pageNotFound = (req, res) => {
    res.send("Page Not Found")
}

module.exports = {
    homePage,pageNotFound
};
