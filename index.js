/*
const fs = require('fs');
const path = require('path');
const http = require('http');

 http.createServer((req, res)=>{
 res.writeHead(200,{'content-Type':'text/plain'});
 res.end('hello world itaychok!');

 }).listen(3000);

 
const filePath = path.join(__dirname,'hello.txt');//give path of file with specific name (_ x2)
console.log(filePath)1;


function CreateFile(){
fs.writeFileSync('hello.txt','Hello,World!!');
}
 
function readFile(){
    const data = fs.readFileSync('hello.txt','utf8');
    console.log(data);
}


CreateFile();
readFile();

const {users,getUser} = require('./users');
console.log(users[0].name);
console.log(getUser(1).name);
*/

const express = require("express");
const routes = require('./routes');
const connectDB = require("./lib/connect");
const { hiUser } = require("./controllers/user");

const app = express();
app.use(express.json());
app.use(routes);

console.log(process.env.DATABASE_URL);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on http://localhost:3000");
});
