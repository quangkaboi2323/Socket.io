var socket = io("http://localhost:3000")

socket.on("Server-send-notification-fail", function (data) {
   alert(data + " is already!")
})

socket.on("Server-send-listUser", function (data) {
   $("#userList").html("")
   data.forEach(user => {
      $("#userList").append("<div id='user'>" + user + "</div>")
   })
})

socket.on("Server-send-notification-success", function (data) {
   $("#username").html(data)
   $("#registerForm").hide(1000)
   $("#chatForm").show(500)
})

socket.on("Server-send-message", function (data) {
   $("#bodyChat").append("<div id='message'>" + data.user + ": " + data.content + "</div>")
})

$(document).ready(function () {
   $("#registerForm").show()
   $("#chatForm").hide()

   $("#btnRegis").click(function () {
      socket.emit("Client-send-username", $("#registerName").val())
   })

   $("#logout").click(function () {
      socket.emit("Logout")
      $("#registerForm").show(500)
      $("#chatForm").hide(1000)
   })

   $("#btnSend").click(function () {
      if ($("#valueChat").val() != "")
         socket.emit("User-send-message", $("#valueChat").val())
   })
})

