const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const UserRouter = require("./controllers/user.controller");

const connectDB = require("./database");

connectDB();

const app = express();
app.use(cors())

app.use('/public', express.static('public'));

const jsonparser = bodyParser.json();
app.use(jsonparser);
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", (req, res) => {
    res.send("Hey");
})

app.use(UserRouter);

const port = process.env.PORT || 8000;
app.listen(port,()=>{
  console.log("i am listening");
});

