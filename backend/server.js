const express = require('express');
const app = express();
const connectDB = require('./config/db');
const {client} =require('./config/redis');


// Connect Database
connectDB();

//app.get('/', (req,res) => res.send('API Running'));


app.use(express.json({extended: false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  
app.use('/jobs',require('./routes/jobs'));


const PORT = process.env.PORT || 5002;
app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`)
});