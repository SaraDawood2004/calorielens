import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/contact.css";

function ContactPage() {

const [form,setForm] = useState({
name:"",
email:"",
rating:"",
message:""
})

const handleChange=(e)=>{
setForm({
...form,
[e.target.name]:e.target.value
})
}

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const response = await fetch("http://localhost:5000/send-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (data.status === "success") {
      alert("Message sent successfully! Check your email for confirmation.");
    } else {
      alert("Error sending message");
    }

    setForm({
      name: "",
      email: "",
      rating: "",
      message: ""
    });

  } catch (error) {
    console.error(error);
    alert("Server error. Please try again later.");
  }
};

return(

<div className="contact-container">

<Navbar/>

<section className="contact-wrapper">

<div className="contact-left">

<h1>Let's Talk Nutrition</h1>

<p>
CalorieLens helps people make smarter food decisions
using artificial intelligence and nutrition analytics.
If you have suggestions, questions, or collaboration
ideas, our team would love to hear from you.
</p>

<img
src="https://images.unsplash.com/photo-1498837167922-ddd27525d352"
alt="nutrition"
/>

</div>


<div className="contact-right">

<h2>Contact Our Team</h2>

<form className="contact-form" onSubmit={handleSubmit}>

<input
type="text"
name="name"
placeholder="Your Name"
value={form.name}
onChange={handleChange}
required
/>

<input
type="email"
name="email"
placeholder="Email Address"
value={form.email}
onChange={handleChange}
required
/>

<select
name="rating"
value={form.rating}
onChange={handleChange}
required
>

<option value="">Rate CalorieLens</option>
<option value="5">⭐⭐⭐⭐⭐ Excellent</option>
<option value="4">⭐⭐⭐⭐ Good</option>
<option value="3">⭐⭐⭐ Average</option>
<option value="2">⭐⭐ Poor</option>
<option value="1">⭐ Very Poor</option>

</select>

<textarea
name="message"
rows="5"
placeholder="Write your message..."
value={form.message}
onChange={handleChange}
/>

<button type="submit">
Send Message
</button>

</form>

</div>

</section>
{/* FOOTER */}

      <footer className="footer">

        <p>© 2026 CalorieLens — AI Nutrition Platform</p>

      </footer>

</div>


)

}

export default ContactPage