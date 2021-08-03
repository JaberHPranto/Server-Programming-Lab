const getMO = (req, res) => {
    res.render("math-olympiad/register.ejs")
}
const postMO = (req, res) => {
    const { name, institution, email, contact, category, tshirt } = req.body;
    console.log(name);
    console.log(institution);
    console.log(email);
    console.log(contact);
    console.log(category);
    console.log(tshirt);
    res.render("math-olympiad/register.ejs")
}
const getMOList = (req, res) => {
    res.render("math-olympiad/list.ejs")
}
const deleteMO = (req, res) => {
    const id = req.params.id
    console.log(id);
    res.render("math-olympiad/list.ejs")
}

module.exports = {
    getMO,postMO,getMOList,deleteMO
};
