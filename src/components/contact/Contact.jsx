import React,{useRef} from "react";
import './contact.css';
import {MdOutlineMail} from "react-icons/md";
import {RiMessengerLine} from "react-icons/ri";
import {BsWhatsapp} from "react-icons/bs";
import emailjs from 'emailjs-com';

const Contact=()=>{const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_hqfa4d8', 'template_ct09x1j', form.current, 'vuEEOVK4ri2WWw7zI')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    };
    return (
        <section id='contact'>
            <h5>Get In Touch</h5>
            <h2>Contact Me</h2>
            <div className="container contact__container">
                <div className="contact__options">
                    <article className="contact__option">
                        <MdOutlineMail className='contact__option-icon'/>
                        <h4>Email</h4>
                        <h5>rasimaqayev@gmail.com</h5>
                        <a href="mailto:rasimaqayev@gmail.com" target='blank'>Send Message</a>
                    </article>
                    <article className="contact__option">
                        <RiMessengerLine className='contact__option-icon'/>
                        <h4>Messenger</h4>
                        <h5>RasimAghayev</h5>
                        <a href="https://m.me/rasim.aghayev" target='blank'>Send Message</a>
                    </article>
                    <article className="contact__option">
                        <BsWhatsapp className='contact__option-icon'/>
                        <h4>WhatsApp</h4>
                        <h5>+994505399992</h5>
                        <a href="https://wa.me/994505399992?text=CV%20React" target='blank'>Send Message</a>
                    </article>
                </div>
                <form ref={form} onSubmit={sendEmail}>
                    <input type="text" name='name' placeholder="Your Full Name" required/>
                    <input type="email" name="email" placeholder="Your Email Address" required/>
                    <textarea name="message" id="message" cols="30" rows="7" placeholder="Your Message" required></textarea>
                    <button className="btn btn-primary" type="submit">Send Message</button>
                </form>
            </div>
        </section>
    )
}

export default Contact