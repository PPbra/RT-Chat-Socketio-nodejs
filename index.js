const express = require('express');
var app = express();
app.use(express.static('./public'));app.set('views','./views');
app.set("view engine",'ejs');

var server = require("http").Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/' , (req , res)=>{
    res.render("home.ejs");
})


io.on("connection",()=>{
    console.log("hello :V");
})