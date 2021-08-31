const express = require("express")
const app = express()
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "./views")

const server = require("http").Server(app)
const io = require("socket.io")(server)
server.listen(3000)

//socket.adapter.rooms
io.on("connection", function (socket) {
   console.log(socket.id + " is connected!!!")

   socket.on("Client-create-room", function (data) {
      socket.join(data)
      socket.Chat_room = data

      //export the list room
      var arr = Array.from(io.sockets.adapter.rooms)
      var filtered  = arr.filter(room => !room[1].has(room[0]))      
      var list_room = filtered.map(i => i[0]);          
      
      io.sockets.emit("Server-list-room", list_room)
      socket.emit("Server-send-roomname", data)

      socket.on("User-send-chat", function(data){
         io.sockets.in(socket.Chat_room).emit("Server-send-chat", data)
      })
   })
})

app.get('/', (req, res) => {
   res.render('trangchu')
})