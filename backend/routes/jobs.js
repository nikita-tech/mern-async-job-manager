const express = require('express');
const router = express.Router();
const {check , validationResult} = require('express-validator');
const {client} = require("../config/redis");
const Job = require('../model/job')


router.post('/jobs',[
    check('jobName','Job Name is required').not().isEmpty(),
    check('value','Value is required').not().isEmpty()
],
async (req,res)=>{
    console.log(req.body);                                                               
    const errors = validationResult(req);
    if(!errors.isEmpty()){                                                                   
        return res.status(400).json({errors:errors.array()});                        
    }
    var jobid = ((+new Date) + Math.random()* 100).toString(32);
    
    const {jobName,value} = req.body;
    // make this priority dynamic
    var priority=1;
    client.set(jobid,priority);
    var job = new Job({'jobid': jobid, 'jobname':jobName, 'parameters': value, 'status':'pending'});
    job.save();
    res.send(`http://localhost:5002/jobs/job-status?jobid=${jobid}`);
}
)

router.get('/job-status',[
    check('jobid','Job id is required').not().isEmpty()
],
async (req,res)=>{
    console.log(req.query);                                                               
    const errors = validationResult(req);
    if(!errors.isEmpty()){                                                                   
        return res.status(400).json({errors:errors.array()});                        
    }
    const {jobid} = req.query;
    Job.findOne({ jobid: jobid }, function (err, reply) {
        res.send(reply);
    });
    
}
)

module.exports = router;