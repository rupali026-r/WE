import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-container">
      <section className="about-header">
        <h1>{t('about.title')}</h1>
      </section>

      <section className="mission-vision">
        <div className="mission">
          <h2>{t('about.mission')}</h2>
          <p>{t('about.missionText')}</p>
        </div>

        <div className="vision">
          <h2>{t('about.vision')}</h2>
          <p>{t('about.visionText')}</p>
        </div>
      </section>

      <section className="team-section">
        <h2>{t('about.team.title')}</h2>
        <p>{t('about.team.description')}</p>
      </section>

      <section className="contact-section">
        <h2>{t('about.contact.title')}</h2>
        <p>{t('about.contact.description')}</p>
        <Link to="/contact" className="contact-button">
          {t('navigation.contact')}
        </Link>
      </section>
    </div>
  );
};

export default About;