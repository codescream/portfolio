import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from'framer-motion';
import './Navbar.scss';
import { images } from '../../constants'

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const navElements = ['home', 'about', 'work', 'skills', 'testimonials', 'contact'];
  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <img src={images.marklogo} alt="logo" />
      </div>
      <ul className='app__navbar-links'>
        {navElements.map(
          (nav, i) => <li key={i}
          className='app__flex p-text'>
            <div />
            <a href={`#${nav}`}>
            {nav}
            </a>
          </li>)
        }
      </ul>
      <div className='app__navbar-menu'>
        <HiMenuAlt4 
          onClick={() => setToggle(true)}
        />
        {
          toggle && (<motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut'}}
          >
            <HiX 
              onClick={() => {setToggle(false)}}
            />
            <ul>
              {navElements.map((nav, i) => <li key={i}
                className='app__flex p-text'>
                  <a href={`#${nav}`}
                    onClick={() => setToggle(false)}
                  >
                  {nav}
                  </a>
                </li>)
              }
            </ul>
          </motion.div>)
        }
      </div>
    </nav>
  )
}

export default Navbar;