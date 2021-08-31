const express = require('express')
const app = express()
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "./views")

const server = require("http").Server(app)
const io = require("socket.io")(server)
server.listen(3000)

var listUser = []

io.on("connection", function (socket) {
   console.log(socket.id + " is connected!!")

   socket.on("Client-send-username", function (data) {
      if (listUser.indexOf(data) >= 0) {
         //fail
         socket.emit("Server-send-notification-fail", data)
      } else {
         //true
         listUser.push(data)
         socket.Username = data
         socket.emit("Server-send-notification-success", data)
         io.sockets.emit("Server-send-listUser", listUser)
      }
   })

   socket.on("Logout", function () {
      listUser.splice(listUser.indexOf(socket.Username), 1)
      socket.broadcast.emit("Server-send-listUser", listUser)
   })

   socket.on("User-send-message", function (data) {
      io.sockets.emit("Server-send-message", { user: socket.Username, content: data })
   })
})

app.get("/", (req, res) => {
   res.render("chatmain")
})