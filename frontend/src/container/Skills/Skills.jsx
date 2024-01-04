import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Skills.scss';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const querySkills = '*[_type == "skills"]';

    client.fetch(query)
      .then((data) => {
        setExperience(data);
      });

    client.fetch(querySkills)
      .then((data) => {
        setSkills(data);
      });
  }, []);


  return (
    <>
      <h2 className='head-text'>
        Skills <span>&</span> Experience
      </h2>

      <div className='app__skills-container'>
        <motion.div
          className='app__skills-list'
        >
          {
            skills.map((skill, index) => (
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                className='app__skills-item app__flex'
                key={skill.name}
              >
                <div
                  className='app__flex'
                  style={{ backgroundColor: skill.bgColor }}
                >
                  <img src={urlFor(skill.icon)} alt="skill.name" />
                </div>
                <p className='p-text'>
                  {skill.name}
                </p>
              </motion.div>
            ))
          }
        </motion.div>

        <motion.div
          className='app__skills-exp'
        >
          {
            experience.map((exp) => (
              <motion.div
                className='app__skills-exp-item'
                key={exp.year}
              >
                <div className='app__skills-exp-year'>
                  <p className='bold-text'>{exp.year}</p>
                </div>
                
                <motion.div
                  className='app__skills-exp-works'
                >
                  {
                    exp.works.map((work, index) => (
                      <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
                        className='app__skills-exp-work app__flex'
                        key={work.name + index}
                        data-tooltip-id={work.name + index}
                      >
                        <h4 className='bold-text'>
                          { work.name }
                        </h4>
                        <p className='p-text'>{work.company}</p>
                        <Tooltip
                          id={work.name + index}
                          arrowColor='#fff'
                          className='skills-tooltip'
                          // style={{ backgroundColor: "green", color: "black" }}
                        >
                          { work.desc }
                        </Tooltip>
                      </motion.div>
                    ))
                  }
                </motion.div>
              </motion.div>
            ))
          }
        </motion.div>
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg'
); 