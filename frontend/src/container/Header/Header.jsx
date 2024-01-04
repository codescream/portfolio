import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AppWrap } from '../../wrapper';
import { images } from '../../constants';
import { shuffleArray } from '../../utils/general';

import './Header.scss';

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
}

const Header = () => {
  const [skills, setSkills] = useState([images.node, images.react, images.sass, images.javascript])
  const allSkills = [images.node, images.react, images.sass, images.javascript, images.vue, images.python, images.api, images.redux];

  // const skills = [images.node, images.react, images.sass, images.javascript];

  useEffect(() => {
    const eventId = setTimeout(() => {
      const array = shuffleArray(allSkills);
      setSkills(array.slice(0, 4));
    }, 10000);

    return () => {
      clearTimeout(eventId);
    }
  }, [skills]);

  return (
    <div className='app__header app__flex'>
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1]}}
        transition={{ duration: 2 }}
        className='app__header-info'
      >
        <div className='app__header-badge'>
          <div className='badge-cmp app__flex'>
            <span>👋</span>
            <div style={{marginLeft: 20}}>
              <p className='p-text'>Hello, I am</p>
              <h1 className='head-text'>Mark Ogilo</h1>
            </div>
          </div>

          <div className='tag-cmp app__flex'>
            <p className='p-text'>Web Developer</p>
            <p className='p-text'>Freelancer</p>
            <p className='p-text'>Linux System Administrator</p>
            <p className='p-text'>API System Integration</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 3, delayChildren: 5 }}
        className='app__header-img'
      >
        <img src={images.profileImg} alt="profile_bg" />
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src={images.circle}
          alt='profile_circle'
          className='overlay_circle'
        />
      </motion.div>

      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className='app__header-circles'
      >
        {
          skills.map((skill, index) => (
            <div
              className='circle-cmp app__flex'
              key={`skill-${index}`}
            >
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                src={skill}
                alt='skill'
                key={`${skill}-${index}`}
              />                
              {/* <img src={circle} alt="circle" /> */}
            </div>
          ))
        }
      </motion.div>
    </div>
  )
}

export default AppWrap(Header, 'home');