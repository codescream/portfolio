import React from 'react';
import { NavigationDots, SocialIcons } from '../components';

const AppWrap = (Component, idName, classNames) => function HOC() {
  return (
    <div id={idName} className={`app__container ${classNames ? classNames : ''}`}>
      <SocialIcons />
      
      <div className='app__wrapper'>
        <Component />

        <div className='copyright'>
          <p className='p-text'>@2023 Mark Ogilo</p>
          <p className='p-text'>All rights reserved</p>
        </div>
      </div>
       
      <NavigationDots active={idName} />
    </div>
  )
}

export default AppWrap;