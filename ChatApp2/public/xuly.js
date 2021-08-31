var socket = io("http://localhost:3000")

socket.on("Server-send-roomname", function (data) {
   $("#RoomID").html(data)
})

socket.on("Server-send-chat", function (data) {   
   $("#bodyChat").append("<div id='sms'>" + data + "</div>")
})


socket.on("Server-list-room", function (data) {
   $("#roomList").html("")
   data.forEach(room => {
      $("#roomList").append("<div id='room'>" + room + "</div>")
   })
})

$(document).ready(function () {
   $("#btnCreateRoom").click(function () {
      socket.emit("Client-create-room", $("#txtCreateRoom").val())
   })

   $("#btnSend").click(function () {
      socket.emit("User-send-chat", $("#valueChat").val())
   })
})