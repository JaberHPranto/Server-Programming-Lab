const ProgrammingContest = require("../model/programmingContestModel")

const getPC = (req, res) => {
    res.render("programming-contest/register.ejs",{error:req.flash("error")})
}


const postPC = async (req, res) => {
    const { teamName, institution, coachName, coachContact, coachEmail, coachTshirt, teamLeaderName, teamLeaderContact, teamLeaderEmail, teamLeaderTshirt, memberOneName, memberOneContact, memberOneEmail, memberOneTshirt, memberTwoName, memberTwoContact, memberTwoEmail, memberTwoTshirt } = req.body
    let error = ""
    try {
        const total = 1200
        const paid = 0
        const selected=false

        const isExistedTeam = await ProgrammingContest.findOne({teamName})
        if (isExistedTeam) {
            error = "Team with this name already exist"
            req.flash("error",error)
            return res.redirect('/programming-contest/register')
        }

        const team = new ProgrammingContest({ teamName, institution, coachName, coachContact, coachEmail, coachTshirt, teamLeaderName, teamLeaderContact, teamLeaderEmail, teamLeaderTshirt, memberOneName, memberOneContact, memberOneEmail, memberOneTshirt, memberTwoName, memberTwoContact, memberTwoEmail, memberTwoTshirt, total, paid, selected })
        
        await team.save()

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

module.exports = {
    getPC,postPC
}