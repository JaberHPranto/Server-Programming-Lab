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

module.exports = {
    getPC,postPC,getPCList,deletePC
}