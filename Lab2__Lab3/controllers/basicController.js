const homePage = (req,res) => {
    res.sendFile("home.html",{root:'./views/template'})
}

const pageNotFound = (req, res) => {
    res.sendFile("404.html",{root:"./views/template/pages/examples"})
}

module.exports = {
    homePage,pageNotFound
};
