const {
    client
} = require("./config/redis");
// var sleep = require('system-sleep');
const connectDB = require('./config/db');
const Job = require('./model/job');
const Worker = require('./model/worker');
// const job = require("./model/job");

function sleep(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}



connectDB();
Worker.findOne({
        'workerid': '1'
    }, function (err, ans) {
    if (err) {
        throw err;
    } else {
        if(!ans){
            var firstWorker = new Worker({'status': 'free'});
            firstWorker.save();
        }
    }
});

redisGetRecord = function () {
    Worker.findOne({
        'workerid': '1'
    }, function (err, ans) {
        if (err) {
            throw err;
        } else {
            if (ans['status'] === 'free') {
                ans['status']='busy';
                ans.update();
                client.keys("*", function (err, keys) {
                    if (err) console.err(err);
                    console.log(keys);
                    keys.map(function (key, cb) {
                        
                        var keyval = client.get(key, function (err, p) {
                            if (err) throw err;
                            console.log("Priority is " + p);
                        });

                        Job.findOne({
                            'jobid': key
                        }, async function (err, reply) {

                            if (err) throw err;
                            else {
                                reply['status'] = 'in progress';
                                await reply.save();
                                var jobDefKey = reply['jobname'];
                                console.log(reply);
                                switch (jobDefKey) {
                                    case 'job1':
                                        console.log("worker has picked " + jobDefKey);
                                        console.log("started waiting for job1 for 20 sec");
                                        sleep(20000); 
                                        reply['status'] = 'completed';
                                        await reply.save(); 
                                        break;
                                    case 'job2':
                                        console.log("worker has picked " + jobDefKey);
                                        console.log("started waiting for job2 for 10 sec");
                                        sleep(10000);
                                        reply['status'] = 'completed';
                                        await reply.save()
                                        break;
                                    default:
                                        console.log("no definition for this job " + jobDefKey);
                                        reply['status'] = 'invalid job';
                                        await reply.save();
                                        break;
                                }
                                client.del(key);
                                console.log("removing the job from redis " + key);
                            }
                        });


                    });
                });
                ans['status']='free';

                ans.update();
            }
            else{
                console.log("server is currently busy");
            }
        }
    });

    Worker.findOne({
        'workerid': '1'
    }, function (err, reply) {

        if (err) {
            var worker = new Worker({
                'status': 'free'
            });
            worker.save();
        } else {
            reply['status'] = 'free';
            reply.update();
        }
    });

}



setInterval(redisGetRecord, 5000);