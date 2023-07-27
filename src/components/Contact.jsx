import React from "react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import SectionWrapper from "../hoc/SectionWrapper";
import { slideIn } from "../utils/motion";

import { ProfilePictureImg } from "../constants";

import { socialMedia } from '../constants'

// IAg06A25xJ0n0lOUe

// template_apfyc4v

// service_mtl26ab

// const ProfilePic =

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const {name,value} = e.target;

    setForm({...form,[name]: value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      'service_mtl26ab',
      'template_apfyc4v',
      {
        from_name: form.name,
        to_name: 'Zohaib Shaikh',
        from_email: form.email,
        to_email:'zohaibshaikhdeveloper@gmail.com',
        message: form.message,
      },
      'IAg06A25xJ0n0lOUe'
    )
    .then(()=>{
      setLoading(false);
      alert('Thank you. I will get back to you as soon as possible.');

      setForm({
        name: '',
        email: '',
        message: '',
      })
    }, (error) => {
      setLoading(false)
      console.log(error);

      alert('Something went wrong.')
    })
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <div className="flex flex-row justify-between">
        <h3 className={styles.sectionHeadText}>Contact.</h3>
         


        <img
        src={ProfilePictureImg.image} // Replace 'your_image.jpg' with the path to your local image
        alt={'Your Profile Picture'}
        className="w-1/5 h-2/4 rounded-full object-cover -mt-7 "
      />
      </div>

      
      <div className="flex flex-row">

      {socialMedia.map((platform) => (
        <a
          key={platform.name}
          href={platform.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4"
        >
          <img
            src={platform.image}
            alt={platform.name}
            className="w-8 h-8 mt-0.5"
          />
        </a>
      ))}
      </div>


        <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
             <input
             type="text"
             name="name"
             value={form.name}
             onChange={handleChange}
             placeholder="What's your name?"
             className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
             >
             
             </input>
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
             <input
             type="email"
             name="email"
             value={form.email}
             onChange={handleChange}
             placeholder="What's your email?"
             className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
             >
             
             </input>
          </label>


          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
             <textarea
             rows="7"
             name="message"
             value={form.message}
             onChange={handleChange}
             placeholder="What do you want to say?"
             className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
             >
             
             </textarea>
          </label>

         <button
         type="submit"
         className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
         >
              {loading ? 'Sending...' : 'Send'}
         </button>
    
        </form>

      </motion.div>

      <motion.div
       variants={slideIn("right", "tween", 0.2, 1)}
       className="xl:flex-1 xl:h-auto md:h-[500px] h-[350px]"
      >
       {/* <EarthCanvas/> */}
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
