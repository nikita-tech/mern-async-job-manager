const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    jobid:{
        type: String,
        required: true
    },
    jobname:{
        type: String,
        required: true
    },
    parameters:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Job = mongoose.model('jobs',JobSchema);