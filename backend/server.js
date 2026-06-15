const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const Enquiry = require("./models/Enquiry");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
console.log("MongoDB Connected");
})
.catch((err) => {
console.log(err);
});


// HOME ROUTE
app.get("/", (req,res)=>{
res.send("Backend Running");
});


// CREATE
app.post("/api/enquiry", async (req,res)=>{

try{

const { name,email,phone } = req.body;

if(!name || !email || !phone){

return res.status(400).json({
success:false,
message:"All fields required"
});

}

const exists =
await Enquiry.findOne({

$or:[
{email},
{phone}
]

});

if(exists){

return res.status(400).json({
success:false,
message:"Email or Phone already used"
});

}

await Enquiry.create({
name,
email,
phone
});

res.json({
success:true,
message:"Registration Successful"
});

}

catch(error){

console.log(error);

res.status(500).json({
success:false,
message:error.message
});

}

});


// READ
app.get("/api/students", async(req,res)=>{

try{

const data =
await Enquiry.find().sort({
createdAt:-1
});

res.json(data);

}

catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

});


// UPDATE
app.put("/api/students/:id", async(req,res)=>{

try{

const updated =
await Enquiry.findByIdAndUpdate(
req.params.id,
req.body,
{ new:true }
);

res.json(updated);

}

catch{

res.status(500).json({
success:false,
message:"Update Failed"
});

}

});


// DELETE
app.delete("/api/students/:id", async(req,res)=>{

try{

await Enquiry.findByIdAndDelete(
req.params.id
);

res.json({
success:true
});

}

catch{

res.status(500).json({
success:false
});

}

});

const PORT =
process.env.PORT || 5000;

app.listen(PORT,()=>{

console.log(
`Server Running ${PORT}`
);

});