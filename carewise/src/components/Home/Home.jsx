import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <section className="hero">
        <h1>{t('home.welcome')}</h1>
        <p>{t('home.intro')}</p>
        <Link to="/symptom-checker" className="cta-button">
          {t('home.getStarted')}
        </Link>
      </section>

      <section className="features">
        <h2>{t('home.features.title')}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>{t('home.features.symptomChecker.title')}</h3>
            <p>{t('home.features.symptomChecker.description')}</p>
            <Link to="/symptom-checker" className="feature-link">
              {t('navigation.symptomChecker')}
            </Link>
          </div>

          <div className="feature-card">
            <h3>{t('home.features.recommendations.title')}</h3>
            <p>{t('home.features.recommendations.description')}</p>
            <Link to="/recommendations" className="feature-link">
              {t('navigation.recommendations')}
            </Link>
          </div>

          <div className="feature-card">
            <h3>{t('home.features.community.title')}</h3>
            <p>{t('home.features.community.description')}</p>
            <Link to="/community" className="feature-link">
              {t('navigation.community')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;