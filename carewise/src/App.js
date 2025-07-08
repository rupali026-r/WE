// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
          <ul>
            <li><Link to="/">{t('navigation.home')}</Link></li>
            <li><Link to="/symptom-checker">{t('navigation.symptomChecker')}</Link></li>
            <li><Link to="/recommendations">{t('navigation.recommendations')}</Link></li>
            <li><Link to="/community">{t('navigation.community')}</Link></li>
            <li><Link to="/about">{t('navigation.about')}</Link></li>
            <li><Link to="/contact">{t('navigation.contact')}</Link></li>
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