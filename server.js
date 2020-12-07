const express    = require('express'),
	  app        = express(),
	  mongoose   = require('mongoose'),
	  passport   = require('passport'),
	  bodyParser = require('body-parser'),
	  port       = process.env.PORT || 3000,
	  db         = require('./config/keys').mongoURL,
	  usr        = require("./routes/api/users"),
	  profile    = require("./routes/api/profile"),
	  posts      = require("./routes/api/posts");


// DB CONNECT
mongoose.connect(db,{
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(()=>{
	console.log('Db Connected');
}).catch((err) =>{
	console.log(err);
});

// Body Parser

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// passport

app.use(passport.initialize());

require('./config/passport')(passport);

app.get('/',(req,res)=>{
	res.send("hello");
})


app.use('/api/users',usr);
app.use('/api/profile',profile);
app.use('/api/posts',posts);


app.listen(port, ()=>{
	console.log(`server live on port ${port}`);
})