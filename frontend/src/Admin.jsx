import axios from "axios";
import { useEffect, useState } from "react";
import "./Admin.css";

import { Bar } from "react-chartjs-2";

import {
Chart,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js";

Chart.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

function Admin() {

const [students,setStudents]=
useState([]);

const [allowed,setAllowed]=
useState(false);

const [password,setPassword]=
useState("");

const [search,setSearch]=
useState("");

useEffect(()=>{

if(allowed){

fetchStudents();

}

},[allowed]);

const fetchStudents=
async()=>{

try{

const res=

await axios.get(
"http://localhost:5000/api/students"
);

setStudents(
res.data
);

}

catch(err){

console.log(err);

}

};

const exportCSV=()=>{

const csv=

students

.map(

(s)=>

`${s.name},${s.email},${s.phone}`

)

.join("\n");

const blob=

new Blob(

[csv],

{

type:"text/csv"

}

);

const url=

URL.createObjectURL(
blob
);

const a=

document.createElement(
"a"
);

a.href=url;

a.download=

"registrations.csv";

a.click();

};

const today=

new Date()

.toDateString();

const todayCount=

students.filter(

s=>

s.createdAt &&

new Date(

s.createdAt

)

.toDateString()

===

today

).length;

const chartData={

labels:

students.map(

s=>s.name

),

datasets:[

{

label:

"Registrations",

data:

students.map(
()=>1
),

backgroundColor:

"#152941",

borderRadius:

16

}

]

};

if(!allowed){

return(

<div

style={{

height:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center",

flexDirection:"column",

gap:"20px"

}}

>

<h1>

Admin Access

</h1>

<input

type="password"

placeholder="Enter Password"

value={password}

onChange={(e)=>

setPassword(
e.target.value
)

}

/>

<button

onClick={()=>{

if(

password===

"admin123"

){

setAllowed(

true

);

}

else{

alert(

"Wrong Password"

);

}

}}

>

Login

</button>

</div>

);

}

return(

<div className="admin">

<h1 className="title">

Admin Dashboard

</h1>


<div className="stats">

<div className="stat">

<h2>

{students.length}

</h2>

<p>

Total

</p>

</div>

<div className="stat">

<h2>

{todayCount}

</h2>

<p>

Today

</p>

</div>

</div>


<div>

<input

className="search"

type="text"

placeholder="Search Student"

value={search}

onChange={(e)=>

setSearch(
e.target.value
)

}

/>

<button

className="export"

onClick={exportCSV}

>

Export CSV

</button>

</div>


<div

style={{

background:"white",

padding:"30px",

borderRadius:"30px",

marginTop:"30px",

marginBottom:"30px"

}}

>

<Bar

data={chartData}

/>

</div>


{

students

.filter(

(student)=>

student.name

.toLowerCase()

.includes(

search

.toLowerCase()

)

)

.map(

(student)=>(

<div

key={student._id}

className="card"

>

<h3>

{student.name}

</h3>

<p>

{student.email}

</p>

<p>

{student.phone}

</p>

<p>

Registered:

{

student.createdAt

?

new Date(

student.createdAt

)

.toLocaleString()

:

"Old Record"

}

</p>


<button

className="edit"

onClick={async()=>{

const name=

prompt(

"New Name",

student.name

);

if(!name)
return;

const email=

prompt(

"New Email",

student.email

);

if(!email)
return;

const phone=

prompt(

"New Phone",

student.phone

);

if(!phone)
return;

await axios.put(

`http://localhost:5000/api/students/${student._id}`,

{

name,
email,
phone

}

);

fetchStudents();

}}

>

Edit

</button>


<button

className="delete"

onClick={async()=>{

const ok=

window.confirm(

`Delete ${student.name}?`

);

if(!ok)
return;

await axios.delete(

`http://localhost:5000/api/students/${student._id}`

);

fetchStudents();

}}

>

Delete

</button>

</div>

)

)

}

</div>

);

}

export default Admin;

