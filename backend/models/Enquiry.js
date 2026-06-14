const mongoose = require("mongoose");

const enquirySchema =
new mongoose.Schema({

name:{

type:String,

required:true

},

email:{

type:String,

required:true,

unique:true

},

phone:{

type:String,

required:true,

unique:true

},

createdAt:{

type:Date,

default:Date.now

}

});

const Enquiry =

mongoose.model(

"Enquiry",

enquirySchema

);

module.exports =

Enquiry;

