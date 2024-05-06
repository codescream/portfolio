import React, { useState, useEffect } from 'react';
import{ AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({y: 0, opacity: 1});
  const [works, setWorks] = useState([]);
  const [stacks, setStacks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query)
      .then((data) => {
        const all = data.filter((item) => item.tags.includes(activeFilter));
        setWorks(data);
        setFilterWork(all);
      });

    const stacksQuery = '*[_type == "stacks"]';

    client.fetch(stacksQuery)
      .then((data) => {
        console.log('stacks:', data);
        setStacks(data);
      });
  }, [])
  

  const handleWorkFilter = (work) => {
    setActiveFilter(work);

    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      const data = works.filter((item) => item.tags.includes(work));
      setFilterWork(data);
    }, 500);
  }

  return (
    <>
      <h2 className='head-text'>
        My Creative
        <span> Portfolio </span>
        Section
      </h2>

      <div className='app__work-filter'>
        {
          stacks?.map((stack, index) => 
            <div 
              key={index}
              onClick={() => handleWorkFilter(stack?.title)}
              className={`app__work-filter-item app__flex p-text ${activeFilter === stack?.title ? 'item-active' : ''}`}
            >
              {stack?.title}
            </div>
          )
        }
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.8, delayChildren: 0.5 }}
        className='app__work-portfolio'
      >
        {
          filterWork.map((work, index) => (
            <div className='app__work-item app__flex' key={index}>
              <div className='app__work-img app__flex'>
                <img src={urlFor(work.imgUrl)} alt={work.name} />

                <motion.div
                  whileHover={{ opacity: [0, 1]}}
                  transition={{ duration: 0.5, ease: 'easeInOut', staggerChildrenChildren: 0.5 }}
                  className='app__work-hover app__flex'
                >
                  <a href={work.projectLink} target='_blank' rel='noreferrer' >
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className='app__flex'
                    >
                      <AiFillEye />
                    </motion.div>
                  </a>

                  <a href={work.codeLink} target='_blank' rel='noreferrer' >
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className='app__flex'
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                </motion.div>
              </div>

              <div className='app__work-content app__flex'>
                <h4 className='bold-text'>{work.title}</h4>
                <p className='p-text' style={{ marginTop: 10 }}>{work.description}</p>

                <div className='app__work-tag app__flex'>
                  <p className='p-text'>{work.tags[0]}</p>
                </div>
              </div>
            </div>
          ))
        }
      </motion.div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work');