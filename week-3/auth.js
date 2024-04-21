const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "shhhhh";

const app = express();
app.use(express.json());
const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  // write logic to return true or false if this user exists
  // in ALL_USERS array
  let userExist = false;
  for(let i=0;i<ALL_USERS.length;i++){
    if(ALL_USERS[i].password==password && ALL_USERS[i].username==username){
        userExist = true;
    }
  }
  return userExist;
}

app.post("/signin", function (req, res) {
  
  const password = req.body.password;
  const username = req.body.username;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, "shhhhh");
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username
    res.json({
      users: ALL_USERS.filter(function(value){
        if(value.username==username){
          return false;
        }
        else{
          return true;
        }
      })
    })
});

app.listen(3000)