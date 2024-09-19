/*
const fs = require('fs');
const path = require('path');
const http = require('http');

 http.createServer((req, res)=>{
 res.writeHead(200,{'content-Type':'text/plain'});
 res.end('hello world itaychok!');

 }).listen(3000);

 
const filePath = path.join(__dirname,'hello.txt');//give path of file with specific name (_ x2)
console.log(filePath);


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


const express = require('express');
const app =express();
app.use(express.json());

const users= [
{id:1,name:'aviv'},
{id:2,name:'itay'},
{id:3,name:'shilo'},
];


app.get('/users',(req,res)=>{
    res.json(users);
});

app.post('/add-user',(req,res)=>{
   const {name}= req.body;

  

   if(!name){
    return res.status(400).json({error:'Name is requird'});//cheack if the value return what i wanted
    }  
    const userExists = users.find((user)=>user.name.includes(name));
    if (userExists) {
        return res.status(400).json({ error: 'User with this name already exists' })
     };
  

    const newUser={
        id:users.length+1,
        name,
    }
    users.push(newUser);
    
    return res.status(201).json(users);
});


app.listen(3000,()=>{
    console.log('server is runnig on http://localhost:3000');
})
