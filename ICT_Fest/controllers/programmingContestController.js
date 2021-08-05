const getPC = (req, res) => {
    res.render("programming-contest/register.ejs",{error:req.flash("error")})
}


const postPC = async (req, res) => {
    console.log(req.body);
}

module.exports = {
    getPC,postPC
}