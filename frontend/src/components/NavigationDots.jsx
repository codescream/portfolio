import React from 'react';
import { Tooltip } from 'react-tooltip';


const NavigationDots = ({ active }) => {
  const sections = ['home', 'about', 'work', 'skills', 'testimonials','contact'];
  return (
    <div className='app__navigation'>
      {sections.map((section, i) =>( 
          <a href={`#${section}`}
            key={section + i}
            className='app__navigation-dot'
            style={active === section ? { backgroundColor: '#313BAC'} : {}}
            data-tooltip-id={section + i}
            data-tooltip-delay-show="500"
            data-tooltip-offset="3"
            data-tooltip-content={section}
            >
              <Tooltip id={section + i} 
                style={{ backgroundColor: "transparent", color: "#222" }}
                key={`tooltip-${section + i}`}
                place='left'
              /> 
            </a>    
      ))}
    </div>
  )
}

export default NavigationDots;