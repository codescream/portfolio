import React, { useState }  from 'react';
import { ThreeDots } from 'react-loader-spinner';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';

import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({name: '', email: '', message: ''});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);


  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({...formData, [name]: value});
  }

  const handleSubmit = (e) => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    }

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      });
  }

  return (
    <>
      <h2 className='head-text'>
        Take a <span>coffee</span> & chat <span>with</span> me
      </h2>

      <div className='app__flex'>
        <div className='app__footer-cards'>
          <div className='app__footer-card'>
            <img src={images.email} alt="email" />
            <a href="mailto:ogilom@gmail.com"
              className='p-text'
            >ogilom@gmail.com</a>
          </div>

          <div className='app__footer-card'>
            <img src={images.mobile} alt="mobile" />
            <a href="tel: +1 (514) 814-1782"
              className='p-text'
            >+1 (514) 814-1782</a>
          </div>
        </div>
      </div>
      {
        !isFormSubmitted ? (<div className='app__flex'>
          <div className='app__footer-form app__flex'>
            <div className='app__flex'>
              <input className='p-text' type="text" placeholder='Your Name' name='name' value={name} 
              onChange={handleChangeInput}  
              />
            </div>
            <div className='app__flex'>
              <input className='p-text' type="email" placeholder='Your Email' name='email' value={email} 
              onChange={handleChangeInput}  
              />
            </div>
            <div>
              <textarea 
              className='p-text'
              placeholder='Your Message'
              name="message"
              value={message}
              onChange={handleChangeInput}
              />
            </div>
            <button type='button' className='p-text'
              onClick={handleSubmit}
            >{loading ? 
            <>Sending <ThreeDots 
            height="100%" 
            width="18"
            color='white' 
            wrapperStyle={{ backgroundColor: 'transparent', display: 'inline' }} />
            </>  : 'Send Message' }</button>
          </div>
        </div>):(<div>
                  <h3 className='head-text'>Thank you for getting in touch!</h3>
                </div>)
      }
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
);