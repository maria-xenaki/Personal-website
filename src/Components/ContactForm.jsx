import React,{ useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';
import { useTranslation } from 'react-i18next';


const ContactForm = () => {

    const { t } = useTranslation();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stateMessage, setStateMessage] = useState(null);
    const sendEmail = (e) => {
      e.persist();
      e.preventDefault();
      setIsSubmitting(true);
      emailjs
        .sendForm(
          process.env.REACT_APP_SERVICE_ID,
          process.env.REACT_APP_TEMPLATE_ID,
          e.target,
          process.env.REACT_APP_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log('Email successfully sent!', result.text);
            setStateMessage(t('Message sent!'));
            setIsSubmitting(false);
            setTimeout(() => {
              setStateMessage(null);
            }, 5000); // hide message after 5 seconds
          },
          (error) => {
            console.error(t('Failed to send email:'), error);
            setStateMessage(t('Something went wrong, please try again later'));
            setIsSubmitting(false);
            setTimeout(() => {
              setStateMessage(null);
            }, 5000); // hide message after 5 seconds
          }
        );
      
      // Clears the form after sending the email
      e.target.reset();
    };
    return (
      <form onSubmit={sendEmail} className='cf'>
        <div className='cf-div'>
          <input className='col-cf-12'style={{marginTop:'40px'}} placeholder='Name'type="text" name="user_name" required/>
        </div>
        <div>
          <input className='col-cf-12' placeholder='Email'type="email" name="user_email" required/>
        </div>
        <div>
          <textarea className='col-cf-12' placeholder='Message'name="message" required/>
        </div>
        <button className='send-btn' type="submit" value="Send" disabled={isSubmitting} >{t('Send')}</button>
        <div className={`message-container ${stateMessage ? 'visible' : ''}`}>
        {stateMessage}
      </div>
      </form>

    );
  };
  export default ContactForm;