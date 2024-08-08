module.exports = function (socket) {

    var sockets = [];
    var socketsIds = [];


    console.log('web socket connection established with clientId ----->', socket.id);

    socket.on('message', function (data) {
        socket.username = data.username;
        console.log(data)
        sockets[data.username] = socket;
        socketsIds.push(data);

        console.log(sockets);
        console.log(socketsIds);

        setTimeout(() => {
            socket.emit('message', data.message + " from server")
        }, 1000)

        socket.on('disconnect', function () {
            socket.disconnect();

            console.log('socket with username ' + socket.username + ' disconnected');

        })


    })
}