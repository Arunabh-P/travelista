const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});
let users = [];
const addUser = (userId,socketId) => {
    !users.some((user)=>user.userId === userId) &&
    users.push({userId,socketId})
}
const removeUser = (socketId) =>{
    users = users.filter((user)=>user.socketId !== socketId)
    console.log(users,"amoooog");
}

const getUser = (userId) => {
    return users.find((user)=>user.userId === userId)
}

io.on("connection", (socket) => {

    //when connect
    console.log("a user connected.");

    //take userId socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        console.log(users);
        io.emit("getUsers",JSON.stringify(users))

    });

    //send and get message
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user = getUser(receiverId);
    console.log(user,"qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");

        io.to(user?.socketId).emit("getMessage",{
            senderId,
            text
        })

    })

    //when disconnect
    socket.on("disconnect",()=>{
        console.log("a user disconnected!");
        removeUser(socket.id);
        console.log(users,"prrrrrrrrrrrrrrrraaaaa");
        io.emit("getUsers",JSON.stringify(users))

    })
})