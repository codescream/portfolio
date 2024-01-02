import React from 'react';


const NavigationDots = ({ active }) => {
  const sections = ['home', 'about', 'work', 'testimonials', 'skills','contact'];
  return (
    <div className='app__navigation'>
      {sections.map((section, i) => 
                  <a href={`#${section}`}
                    key={section + i}
                    className='app__navigation-dot'
                    style={active === section ? { backgroundColor: '#313BAC'} : {}}
                  />
              )}
    </div>
  )
}

export default NavigationDots;