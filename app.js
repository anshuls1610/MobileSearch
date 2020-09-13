const express     	 = require("express"),
      app         	 = express(),
      bodyParser  	 = require("body-parser"),
      mongoose    	 = require("mongoose"),
  	  methodOverride = require("method-override"),
   	  Mobile        	 = require("./models/mobile");

const mobileRoutes = require("./routes/mobile"),
      indexRoutes      = require("./routes/index")
    
const url = process.env.DATABASEURL || "mongodb://localhost:27017/mobile_search";
mongoose.connect(url, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true
}).then(() => {
	console.log("Connected to DB!");
}).catch(err => {
	console.log("Error: cd ", err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use("/", indexRoutes);
app.use("/mobile", mobileRoutes);


const port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("The server has Started!");
});