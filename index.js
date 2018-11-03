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

const users = [
    {
        id:1,
        userName:"PPbra"
    },
    {
        id:2,
        userName:"Phuongngo"
    },
    {
        id:3,
        userName:"Trawnnu"
    },
    {
        id:4,
        userName:"HELO"
    },
] 


io.on("connection",(socket)=>{
    console.log("hello :V");
    socket.on("client-send-userName",(data)=>{
        console.log(data);
       const isContain =  users.find((e)=>{
            return e.userName===data;
        })

        if(isContain){
            socket.emit("register-false");
        }
        else{
            const newUser = {
                id:users.length+1,
                userName:data
            };
            users.push(newUser);
            socket.emit("register-success",{users,isYour:newUser});
            socket.broadcast.emit("new-user",newUser);
        }
    });
    socket.on("log-out",(user)=>{
        users.splice(users.indexOf(user),1);
        console.log(users);
        io.emit("log-out" ,users);
    })
})
