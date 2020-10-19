const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
    workerid:{
        type: String,
        required: true,
        unique:true,
        default: '1'
    },
    status:{
        type: String,
        required: true,
        default:'free'
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Worker = mongoose.model('workers',WorkerSchema);