const MathOlympiad = require("../model/mathOlympiadModel");
const {sendEmail} = require("../utils/mailService")

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
            req.flash("error", error)

            const message = `
           <h1> ICT Fest, 2021 </h1>
           <h2>You have requested a password reset</h2>
           <p>Please go to this link to reset your password</p>
           `
            
            // Sending Mail
            try {
                await sendEmail({to:email,subject:"Confirmation Mail",text:message})
            } catch (error) {
                console.log(error);
            }
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

const editMo = async (req, res) => {
    const id = req.params.id
    try {
        const participant = await MathOlympiad.findById(id)
        res.render("math-olympiad/edit.ejs", { error: req.flash("error"), participant })

    } catch (err) {
        console.log(err);
        res.send(err)
    }
    
}

const postEditMo = async (req, res) => {
    const { name, institution, contact, email, category, tshirt } = req.body
    let error = ""
    try {
        const participant = await MathOlympiad.findOne({ name, contact })
        if (!participant) {
            error="No participant found"
            req.flash("error", error)
            return res.redirect('/math-olympiad/list')
        }

        console.log(category);
        let registrationFee = 0;
        let total = participant.total
        if (category === 'school') registrationFee = 250;
        else if (category === 'college') registrationFee = 400;
        else if (category === 'university') registrationFee = 500;

        console.log(registrationFee);
        console.log(total);

            if (participant.total !== registrationFee) {
                total = registrationFee
            }


        await MathOlympiad.findByIdAndUpdate(participant._id, { institution, email, category, tshirt,total })
        res.redirect('/math-olympiad/list')

    } catch (error) {
        error="Failed to update"
        req.flash("error", error)
        res.redirect('/math-olympiad/list')
    }
}

module.exports = {
    getMO,postMO,getMOList,deleteMO,paymentDoneMo,selectMo,editMo,postEditMo
};
