const express = require('express');
const app = express();
const uniqid = require('uniqid');


app.use(express.static('./public'));app.set('views','./views');
app.set("view engine",'ejs');

var server = require("http").Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/' , (req , res)=>{
    res.render("home.ejs");
})

const users = [] 


io.on("connection",(socket)=>{

    socket.on("client-send-userName",(data)=>{

       const isContain =  users.find((e)=>{
            return e.userName===data;
        })

        if(isContain){
            socket.emit("register-false");
        }
        else{
            const newUser = {
                id:i=uniqid('id-'),
                userName:data
            };
            users.push(newUser);
            socket.emit("register-success",{users,isYour:newUser});
            socket.broadcast.emit("new-user",newUser);
        }
    });
    socket.on("log-out",(user)=>{
        users.splice(users.indexOf(user),1);
        io.emit("log-out" ,users);
    });
    socket.on("send-message",(data)=>{
        socket.broadcast.emit("recieve-message",data);
    })
})
