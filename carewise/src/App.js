// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';
import Home from './components/Home/Home';
import SymptomChecker from './pages/SymptomChecker/SymptomChecker';
import Recommendations from './components/Recommendations/Recommendations';
import Community from './pages/Community/Community';
import About from './pages/About/About';
import Contact from './components/Contact/Contact';
import './App.css';
// import VoiceRecognition from './components/VoiceRecognition/VoiceRecognition';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  // Optional: handle the result from voice recognition
  const handleVoiceResult = (text) => {
    // You can do something with the recognized text here
    // For example, navigate, search, or fill a form
    console.log('Recognized:', text);
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <div className="header-title">
              <h1>{t('header.title')}</h1>
              <p>{t('header.subtitle')}</p>
            </div>
            <div className="language-controls">
              <select 
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
                className="language-selector"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="te">Telugu</option>
                <option value="mr">Marathi</option>
                <option value="ta">Tamil</option>
                <option value="kn">Kannada</option>
                <option value="ml">Malayalam</option>
                <option value="es">Español</option> 
                <option value="fr">Français</option>
                <option value="zh">中文</option>
                <option value="ar">العربية</option>
                <option value="ru">Русский</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語</option>
                <option value="pt">Português</option>
                <option value="it">Italiano</option>
                <option value="bn">বাংলা</option>
                <option value="tr">Türkçe</option>
                
              
              </select>
            </div>
          </div>
        </header>
        
        <nav className="sidebar">
          <div className="sidebar-logo">
            <span role="img" aria-label="Carewise AI">🤖</span> Carewise AI
          </div>
          <ul>
            <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}><span role="img" aria-label="Home">🏠</span> {t('navigation.home')}</NavLink></li>
            <li><NavLink to="/symptom-checker" className={({ isActive }) => isActive ? 'active' : ''}><span role="img" aria-label="AI Symptom Checker">🤖</span> {t('navigation.symptomChecker')}</NavLink></li>
            <li><NavLink to="/recommendations" className={({ isActive }) => isActive ? 'active' : ''}><span role="img" aria-label="Personalized Recommendations">💡</span> {t('navigation.recommendations')}</NavLink></li>
            <li><NavLink to="/community" className={({ isActive }) => isActive ? 'active' : ''}><span role="img" aria-label="Blogs and Community Support">📝</span> {t('navigation.community')}</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}><span role="img" aria-label="About Us">ℹ️</span> {t('navigation.about')}</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}><span role="img" aria-label="Contact">✉️</span> {t('navigation.contact')}</NavLink></li>
          </ul>
        </nav>
        
        <main className="main-content">
          {/* <VoiceRecognition onResult={handleVoiceResult} /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>{t('footer.copyright')}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
