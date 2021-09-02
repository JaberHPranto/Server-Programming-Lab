const mongoose = require('mongoose');

const pcSchema = mongoose.Schema({
    teamName: {
        type: String,
        required:true
    },
    institution: {
        type: String,
        required:true
    },

    // Coach
    coachName: {
        type: String,
        required:true
    },
    coachContact: {
        type: String,
        required:true
    },
    coachEmail: {
        type: String,
        required:true
    },
    coachTshirt: {
        type: String,
        required:true
    },

    // Team Leader
    teamLeaderName: {
        type: String,
        required:true
    },
    teamLeaderContact: {
        type: String,
        required:true
    },
    teamLeaderEmail: {
        type: String,
        required:true
    },
    teamLeaderTshirt: {
        type: String,
        required:true
    },

    // Team Member 1
    memberOneName: {
        type: String,
        required:true
    },
    memberOneContact: {
        type: String,
        required:true
    },
    memberOneEmail: {
        type: String,
        required:true
    },
    memberOneTshirt: {
        type: String,
        required:true
    },

    // Team Member 2
    memberTwoName: {
        type: String,
        required:true
    },
    memberTwoContact: {
        type: String,
        required:true
    },
    memberTwoEmail: {
        type: String,
        required:true
    },
    memberTwoTshirt: {
        type: String,
        required:true
    },

    // Payment and Status
    total: {
        type: Number,
        required:true
    },
    paid: {
        type: Number,
        required:true
    },
    selected: {
        type: Boolean,
        required:true
    },
    
    date: {
        type: String,
        default:Date.now()
    },
    teamCode: {
        type: String,
        unique:true
    }

})


const ProgrammingContest = mongoose.model("ProgrammingContest", pcSchema)
module.exports = ProgrammingContest
