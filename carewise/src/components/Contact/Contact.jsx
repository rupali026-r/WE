import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="contact-container">
      <h1>{t('contact.title')}</h1>
      <p className="description">{t('contact.description')}</p>
      
      <div className="contact-content">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <p>{t('contact.info.email')}</p>
          </div>
          
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <p>{t('+91 9876543201')}</p>
          </div>
          
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <p>{t('Hyderabad,Telangana,India')}</p>
          </div>
          
          <div className="info-item">
            <h4>🕒 Hours</h4>
            <p>Monday - Friday: 9:00 AM - 6:00 PM<br />
            Saturday: 10:00 AM - 4:00 PM<br />
            Sunday: Closed</p>
          </div>
        </div>
        
        <div className="contact-form">
          <h3>Send us a Message</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">{t('contact.form.name')}</label>
              <div className="input-icon-group">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">{t('contact.form.email')}</label>
              <div className="input-icon-group">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">{t('contact.form.subject')}</label>
              <div className="input-icon-group">
                <i className="fas fa-tag"></i>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">{t('contact.form.message')}</label>
              <div className="input-icon-group">
                <i className="fas fa-comment"></i>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="submit-button">
              {t('contact.form.send')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;