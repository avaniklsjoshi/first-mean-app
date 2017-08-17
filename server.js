var express= require('express');  //
var path=require('path');  //system module,that is y v dont have to install it, it helps in working with file system paths 
var bodyParser=require('body-parser'); //accept data from form and parse it and send to db

var index= require('./routes/index');
var tasks=require('./routes/tasks');  //template system

port=3002;
var app=express();

//======view engine====================
app.set('views',path.join(__dirname,'views'));  //our views in views folder
app.set('view engine','ejs'); //we wanna use ejs
app.engine('html',require('ejs').renderFile);  //we wanna render file with .html extension

// set static folder for ang 2 ==================
app.use(express.static(path.join(__dirname,'client')));

// body-parser middleware ======================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// routes =====================================
app.use('/', index);
app.use('/api',tasks);

app.listen(port,function(){
  console.log('Server started on '+port);
});