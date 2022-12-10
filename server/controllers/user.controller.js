const express = require("express");
const bcryptjs = require("bcryptjs");
const multer = require("multer")
const {v4 : uuidv4} = require('uuid')

const User = require('../models/user.model');
const saltRounds = 10;

const DIR = './public/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const filename = uuidv4() + "" + file.originalname.toLowerCase().split(' ').join('')
        cb(null, filename)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "application/pdf"){
            cb(null, true);
        } else{
            cb(null, false);
            return cb("Only .pdf are supported");
        }
    }
})

const uploadSingleFile = upload.single("resumeFile");


const dummyRecords = require("../dummy_data");
const e = require("express");

const router =  express.Router();

const insertRecord = (records, i, next) => {
    if(i >= records.length){
        next();
    }
    else{
        const record = records[i];
        console.log(record);
        bcryptjs.hash(record.password, saltRounds).then(hash => {
            if(hash){
                record.password = hash;
                const user = new User(record);
                user.save(err => {
                    if(!err){
                        console.log("Inserted " + i); 
                    }
                    else{
                        console.log("Skipping " + i + " " +err);
                    }
                })
            }
            insertRecord(records, i+1, next);
        }).catch(e => {
            console.log("Error in " + i);
            insertRecord(records, i+1, next);
        })
    }
}

router.get("/api/dbinit", (req, res) => {
    console.log(dummyRecords);
    insertRecord(dummyRecords, 0, ()=> {
        res.send("All records pushed");
    });
    
})

router.get("/api/students",async function(req, res){
    try {
      var users  = await User.find({userType: {$ne: "Staff"}});
      res.send({
        code:1,
        msg:"all users",
        data: users
      });
  
    } catch (e) {
      res.send({
        code:0,
        msg:"users not found",
        data:null
      });
    }
});
  

router.post("/api/signup", async function(req, res){
    uploadSingleFile(req, res, async (ferr) => {
        if(ferr){
            res.send({
                code: 0,
                msg: "Only .pdf files are supported",
                data: null
            })
        }
        else{
            try {
                var hash = await bcryptjs.hash(req.body.password, saltRounds)
                const url = req.protocol + '://' + req.get('host')
                const user = new User({
                    userType: 'Student',
                    name: req.body.name,
                    email: req.body.email,
                    number: req.body.number,
                    password: hash,
                    resume: {
                        url: !req.hasOwnProperty("file")?"":url + '/public/' + req.file.filename,
                        uploadedAt: !req.hasOwnProperty("file")?null:new Date()
                    }
                })
                user.save(err => {
                    if(!err){
                        res.send({
                            code: 1,
                            msg: "User created",
                            data: user
                        })
                    }
                    else{
                        res.send({
                            code: 0,
                            msg: "Email id already exists",
                            data: null
                        })
                    }
                });
            } catch (e) {
              res.send({
                code: 0,
                msg: "Something went wrong"
              })
            }

        }

    })
    
})

router.post("/api/user/:id", async function(req,res){
    uploadSingleFile(req, res, async (ferr) => {
        if(ferr){
            res.send({
                code: 0,
                msg: "Only .pdf files are supported",
                data: null
            })
        }
        else{
            try {
                const url = req.protocol + '://' + req.get('host')
                const user = await User.findOne({_id: req.params.id})
                user.name = req.body.name;
                user.number = req.body.number;
                if(req.hasOwnProperty("file")){
                    user.resume.url = url + '/public/' + req.file.filename
                    user.resume.uploadedAt = new Date();
                }
                user.save(err => {
                    if(!err){
                        res.send({
                            code: 1,
                            msg: "User Updated",
                            data: user
                        })
                    }
                    else{
                        res.send({
                            code: 0,
                            msg: "User could not be updated. Please try again later",
                            data: null
                        })
                    }
                })

            } catch (e) {
                res.send({
                    code: 0,
                    msg: "Something went Wrong. Please Login again",
                    data: null
                })
              
            }

        }

    })
});

router.post("/api/change_password/:id", async (req, res) => {
    try{
        const user = await User.findOne({_id: req.params.id})
        var hash = await bcryptjs.hash(req.body.password, saltRounds);
        user.password = hash;
        user.save(err => {
            if(!err){
                res.send({
                    code: 1,
                    msg: "Password Changed Succesfully",
                    data: user
                })
            }
            else{
                res.send({
                    code: 0,
                    msg: "Something went wrong. Try again later",
                    data: null
                })
            }
        })
    }
    catch(e){
        res.send({
            code: 0,
            msg: "Something went wrong. Try again later",
            data: null
        })
    }
})


router.post("/api/login", async function(req,res){
  try {
    var user = await User.findOne({email:req.body.email});
    var hash = await bcryptjs.compare(req.body.password, user.password)
    if(hash){
      res.send({
        code:1,
        msg: "login successfull",
        data:user
      })
    }
    else{
      res.send({
        code:0,
        msg: "Incorrect Password",
        data:null
      })
    }
  } catch (e) {
    res.send({
      code:0,
      msg: "User doesnt exist",
      data:null
    })
  }
});

module.exports = router;
