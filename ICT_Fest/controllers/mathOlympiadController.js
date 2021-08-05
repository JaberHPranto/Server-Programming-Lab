const MathOlympiad = require("../model/mathOlympiadModel");
const ProgrammingContest = require("../model/programmingContestModel");

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

    } catch (err) {
        console.log(err);
        return res.redirect('/math-olympiad/register')
    }

}


const getMOList = async (req, res) => {
    try {
        let all_participants = []
        all_participants = await MathOlympiad.find({})

        return res.render("math-olympiad/list.ejs", {
            error: req.flash("error"),
            participants: all_participants
        })
        
    } catch (err) {
        console.log(err);
        let error = "Failed to get the list"
        return res.render("math-olympiad/list.ejs", {
            error: req.flash("error", error),
            participants: all_participants
        })
    }

}


const deleteMO = async(req, res) => {
    const id = req.params.id
    let error =""
    try {
        await MathOlympiad.deleteOne({ _id: id })
        error="Record has been deleted successfully"
        req.flash("error", error)
        res.redirect('/math-olympiad/list')
        
    } catch (err) {
        console.log(err);
        error="Failed to delete the record"
        req.flash("error", error)
        res.redirect('/math-olympiad/list')
    }
}


const paymentDoneMo = async (req, res) => {
    const id = req.params.id
    try {
        const participant = await MathOlympiad.findOne({ _id: id })
        const total = participant.total

        await MathOlympiad.findOneAndUpdate({ _id: id }, { paid: total },)
        
        error="Payment completed successfully"
        req.flash("error", error)
        res.redirect('/math-olympiad/list')

    } catch (err) {
        console.log(err);
        error="Data could not be updated"
        req.flash("error", error)
        res.redirect('/math-olympiad/list')
    }
}


const selectMo = async (req, res) => {
    const id = req.params.id
    try {
        await MathOlympiad.findOneAndUpdate({ _id: id }, { selected: true },)
        
        error="Participant has been selected for Math Olympiad"
        req.flash("error", error)
        res.redirect('/math-olympiad/list')

    } catch (err) {
        console.log(err);
        error="Data could not be updated"
        req.flash("error", error)
        res.redirect('/math-olympiad/list')
    }
}

module.exports = {
    getMO,postMO,getMOList,deleteMO,paymentDoneMo,selectMo
};
