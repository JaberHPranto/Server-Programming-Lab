const ProgrammingContest = require("../model/programmingContestModel")
const { sendEmail } = require("../utils/mailService")
const { mailMessage } = require("../utils/mailTemplate")
const {participationCodeGenerator} = require("../utils/utility")

const getPC = (req, res) => {
    res.render("programming-contest/register.ejs",{error:req.flash("error")})
}


const postPC = async (req, res) => {
    const { teamName, institution, coachName, coachContact, coachEmail, coachTshirt, teamLeaderName, teamLeaderContact, teamLeaderEmail, teamLeaderTshirt, memberOneName, memberOneContact, memberOneEmail, memberOneTshirt, memberTwoName, memberTwoContact, memberTwoEmail, memberTwoTshirt } = req.body
    let error = ""
    try {
        const total = 1200
        const paid = 0
        const selected = false
        const teamCode = participationCodeGenerator()

        const isExistedTeam = await ProgrammingContest.findOne({teamName})
        if (isExistedTeam) {
            error = "Team with this name already exist"
            req.flash("error",error)
            return res.redirect('/programming-contest/register')
        }

        const team = new ProgrammingContest({ teamName, institution, coachName, coachContact, coachEmail, coachTshirt, teamLeaderName, teamLeaderContact, teamLeaderEmail, teamLeaderTshirt, memberOneName, memberOneContact, memberOneEmail, memberOneTshirt, memberTwoName, memberTwoContact, memberTwoEmail, memberTwoTshirt, total, paid, selected,teamCode })
        
        await team.save()

        // Sending mail
        const teamLeadMessage = mailMessage(teamLeaderName, "Programming Contest", teamCode)
        const memberOneMessage = mailMessage(memberOneName, "Programming Contest", teamCode)
        const memberTwoMessage = mailMessage(memberTwoName, "Programming Contest", teamCode)
        const coachMessage = mailMessage(coachName, "Programming Contest", teamCode)
        try {
            await sendEmail({to:teamLeaderEmail,subject:"Confirmation Mail",text:teamLeadMessage})
            await sendEmail({to:memberOneEmail,subject:"Confirmation Mail",text:memberOneMessage})
            await sendEmail({to:memberTwoEmail,subject:"Confirmation Mail",text:memberTwoMessage})
            await sendEmail({to:coachEmail,subject:"Confirmation Mail",text:coachMessage})
        } catch (error) {
            console.log(error);
            return res.status(500).json("Failed to sent E-mail")
        }

        error = "Team has been registered successfully"
        req.flash("error",error)
        return res.redirect('/programming-contest/register')


    } catch (err) {
        console.log(err);
        error = "Failed to register the team"
        res.flash("error", error)
        res.redirect("/programming-contest/register")
    }
    
    
  
}

const getPCList = async (req, res) => {
    let teams = []
    try {
        teams = await ProgrammingContest.find({})
        res.render("programming-contest/list.ejs", {
            error: req.flash("error"),
            teams
        })
        
    } catch (err) {
        console.log(err);
        let error = "Failed to get the list"
        return res.render("programming-contest/list.ejs", {
            error: req.flash("error", error),
            teams
        })        
    }
}

const deletePC = async (req, res) => {
    const id = req.params.id
    let error =""
    try {
        await ProgrammingContest.deleteOne({ _id: id })
        error="Record has been deleted successfully"
        req.flash("error", error)
        res.redirect('/programming-contest/list')
        
    } catch (err) {
        console.log(err);
        error="Failed to delete the record"
        req.flash("error", error)
        res.redirect('/programming-contest/list')
    }
}

const paymentDonePC = async (req, res) => {
    const id = req.params.id
    try {
        const participant = await ProgrammingContest.findOne({ _id: id })
        const total = participant.total

        await ProgrammingContest.findOneAndUpdate({ _id: id }, { paid: total },)
        
        error="Payment completed successfully"
        req.flash("error", error)
        res.redirect('/programming-contest/list')

    } catch (err) {
        console.log(err);
        error="Data could not be updated"
        req.flash("error", error)
        res.redirect('/programming-contest/list')
    }
}


const selectPC = async (req, res) => {
    const id = req.params.id
    try {
        await ProgrammingContest.findOneAndUpdate({ _id: id }, { selected: true },)
        
        error="Participant has been selected for Programming contest"
        req.flash("error", error)
        res.redirect('/programming-contest/list')

    } catch (err) {
        console.log(err);
        error="Data could not be updated"
        req.flash("error", error)
        res.redirect('/programming-contest/list')
    }
}

module.exports = {
    getPC,postPC,getPCList,deletePC,paymentDonePC,selectPC
}