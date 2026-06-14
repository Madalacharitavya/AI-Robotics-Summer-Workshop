import axios from "axios";
import { useState } from "react";

function App() {

const [success,setSuccess]=
useState(false);

const [loading,setLoading]=
useState(false);

const [openFaq,setOpenFaq]=
useState(null);

const submitForm=
async(e)=>{

e.preventDefault();

const name=
e.target[0].value.trim();

const email=
e.target[1].value.trim();

const phone=
e.target[2].value.trim();


if(

!name ||

!email ||

!phone

){

alert(

"Please fill all fields"

);

return;

}


if(

name.length<3

){

alert(

"Name must contain at least 3 letters"

);

return;

}


const emailPattern=

/^[^\s@]+@[^\s@]+\.[^\s@]+$/;


if(

!emailPattern.test(

email

)

){

alert(

"Enter valid email"

);

return;

}


if(

phone.length!==10

||

!/^\d+$/.test(

phone

)

){

alert(

"Phone must contain exactly 10 digits"

);

return;

}

setLoading(true);

try{

const response=

await axios.post(

"http://localhost:5000/api/enquiry",

{

name,

email,

phone

}

);

setLoading(false);

if(

response.data.success

){

e.target.reset();

setSuccess(

true

);

setTimeout(()=>{

setSuccess(

false

);

},4000);

}

}

catch(error){

setLoading(false);

alert(

error.response

?.data

?.message

||

"Submission Failed"

);

}

};

return(

<>

<div className="hero">

<h1>

AI & Robotics Summer Workshop

</h1>

<p>

Build • Learn • Create

</p>

<button

onClick={()=>

document

.getElementById(

"register"

)

.scrollIntoView({

behavior:

"smooth"

})

}

>

Enroll Now

</button>


<a

href="/admin"

className="admin-link"

>

Admin Dashboard

</a>

</div>


<section className="details">

<h2>

Workshop Details

</h2>

<div className="cards">

<div className="card">

<h3>

Age Group

</h3>

<p>

8–14 Years

</p>

</div>

<div className="card">

<h3>

Duration

</h3>

<p>

4 Weeks

</p>

</div>

<div className="card">

<h3>

Mode

</h3>

<p>

Online

</p>

</div>

<div className="card">

<h3>

Fee

</h3>

<p>

₹2,999

</p>

</div>

<div className="card">

<h3>

Start Date

</h3>

<p>

15 July 2026

</p>

</div>

</div>

</section>


<section className="stats">

<div className="stat">

<h1>

500+

</h1>

<p>

Students Joined

</p>

</div>

<div className="stat">

<h1>

50+

</h1>

<p>

Projects Built

</p>

</div>

<div className="stat">

<h1>

4 Weeks

</h1>

<p>

Learning Journey

</p>

</div>

</section>


<section className="faq">

<h2>

Frequently Asked Questions

</h2>

<div className="faq-box">

{

[
{
q:"Do kids need coding experience?",
a:"No, beginners are welcome."
},

{
q:"Will recordings be available?",
a:"Yes, session recordings will be shared."
},

{
q:"Will participants receive certificates?",
a:"Yes, certificate will be provided."
}

].map(

(item,index)=>(

<div
key={index}
className="faq-item"
>

<h3

onClick={()=>

setOpenFaq(

openFaq===index

?

null

:

index

)

}

>

{item.q}

</h3>

{

openFaq===index &&

<p>

{item.a}

</p>

}

</div>

)

)

.map(

(item,index)=>(

<div

key={index}

className="faq-item"

>

<h3

onClick={()=>

setOpenFaq(

openFaq===index

?

null

:

index

)

}

>



</h3>

{

openFaq===index &&

<p>

{item}

</p>

}

</div>

)

)

}

</div>

</section>


<section

id="register"

className="register"

>

<h2>

Enroll Now

</h2>

<form

className="form"

onSubmit={submitForm}

>

<input

type="text"

placeholder="Your Name"

/>

<input

type="email"

placeholder="Your Email"

/>

<input

type="tel"

placeholder="Phone Number"

maxLength="10"

/>

<button

disabled={loading}

>

{

loading

?

"Submitting..."

:

"Submit Registration"

}

</button>

{

success &&

<p className="success">

Registration Successful 🎉

</p>

}

</form>

</section>


<footer className="footer">

© 2026 AI & Robotics Summer Workshop

</footer>

</>

);

}

export default App;

