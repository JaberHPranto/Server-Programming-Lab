const MathOlympiad = require("../model/mathOlympiadModel")
const getMO = (req, res) => {
    res.render("math-olympiad/register.ejs",{error:req.flash("error")})
}
const postMO = async (req, res) => {
    try {

        const { name, institution, email, contact, category, tshirt } = req.body;
        
        let registrationFee = 0;
        if (category === 'school') registrationFee = 250;
        else if (category === 'college') registrationFee = 400;
        else if (category === 'university') registrationFee = 500;

        const total = registrationFee;
        const paid = 0;
        const selected = false;

        let error = ""

        const isExistedParticipant = await MathOlympiad.findOne({ name: name, contact: contact })
    
        if (isExistedParticipant) {
            error = "Participant with this name and contact number already exist"
            console.log(error);
            req.flash("error",error)
            return res.redirect('/math-olympiad/register')
        }


        try {
            const participant = new MathOlympiad({
                name, category, contact, email, institution, total, paid, selected, tshirt   
            })
            error = "Participant has been registered successfully"
            await participant.save();
            req.flash("error",error)
            return res.redirect('/math-olympiad/register')

        } catch (err) {
            error = "An unexpected error occurred while registering participant !"
            req.flash("error",error)
            return res.redirect('/math-olympiad/register')
        }
        
        // res.render("math-olympiad/register.ejs")

    } catch (err) {
        console.log(err);
        return res.redirect('/math-olympiad/register')
    }

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
