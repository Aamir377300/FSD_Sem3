const express = require('express')
PORT = 5002
const app = express();

const users_data = [
    { id: 1, name: "Aamir", role: "Developer" },
    { id: 2, name: "Khan", role: "Designer" },
    { id: 3, name: "Rahul", role: "Manager" }
  ];

app.get('/', (req,res)=>{
    res.status(200).json({message : 'Welcome to API'})
})

app.get('/users', (req,res)=>{
    res.status(200).json(users_data)
    console.log(users_data)

})

app.get('/users/:id', (req,res)=>{
    const a = users_data.find(u => u.id === parseInt(req.params.id))
    if (!a) return res.status(404).json({ message: "User not found" });
    res.status(200).json(a)
    console.log(a)
})

app.listen(PORT,()=>{
    console.log(`The server is running on the http://localhost:${PORT}/`)
})