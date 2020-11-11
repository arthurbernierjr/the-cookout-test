const a = require('dotenv').config()
console.log(a)
const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server)
const username = require('username-generator')
const path = require('path')
const mongoose = require('mongoose')
const User = require('./models/user.js')
const mongoURI = process.env.MONGO_URI


mongoose.connect(mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

mongoose.connection.once('open', () => console.log('connected to atlas'))

app.use(express.json())

const loggedInUsers = [];
app.post('/signup', (req, res) => {
  User.create(req.body, (err, createdUser)=> {
      if (!err) {
        loggedInUsers.push(createdUser.userName)
        res.status(201).json({...createdUser, signUp: true})
      } else {
      res.status(404).json({message: err.message, signUp: false})
    }
  })

  app.post('login', (req, res) => {
    User.find({userName: req.body.userName, email: req.body.email}, (err, foundUser) => {
      if (!err) {
        loggedInUsers.push(foundUser.userName)
        res.status(201).json({...foundUser, login: true })
      } else {
      res.status(400).json({message: err.message, login: false})
    }
    })
  })
})

app.use(express.static('./client/build'));

app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, "client","build","index.html"));
})

const users={}

io.on('connection', socket => {
    //generate username against a socket connection and store it
    // const userId=username.generateUsername('-')
    //
    // if(!users[userId]){
    //     users[userId] = socket.id
    // }
    let userId = ''
    socket.on('signUp', data => {
      User.create({userName: data.userName, email: data.email}, (err, createdUser) => {
        if (!err) {
          console.log(createdUser)
          console.log(users)
        } else { 
          console.log(err)
        }
      })
    })
      socket.on('login', data => {
        User.find({userName: data.userName, email: data.email}, (err, foundUser) => {
          if (!err) {
            if (!users[foundUser[0].userName]) {
                users[foundUser[0].userName] = socket.id
                userId = foundUser[0].userName
                console.log(foundUser)
            }
            loggedInUsers.push(userId)
            socket.emit('yourID', userId)
            io.sockets.emit('allUsers', users)
            console.log(users)
          }
        })
      })
    //send back username
    // socket.emit('yourID', userId)
    // io.sockets.emit('allUsers', users)

    socket.on('disconnect', ()=>{
        delete users[userId]
    })

    socket.on('callUser', (data)=>{
        io.to(users[data.userToCall]).emit('hey', {signal: data.signalData, from: data.from})
    })

    socket.on('acceptCall', (data)=>{
        io.to(users[data.to]).emit('callAccepted', data.signal)
    })

    socket.on('close', (data)=>{
        io.to(users[data.to]).emit('close')
    })

    socket.on('rejected', (data)=>{
        io.to(users[data.to]).emit('rejected')
    })
})

const port = process.env.PORT || 8000

server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})
