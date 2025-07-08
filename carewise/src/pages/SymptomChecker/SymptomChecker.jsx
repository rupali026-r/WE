// src/components/SymptomChecker/SymptomChecker.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSymptomAnalysis } from '../../components/hooks/useSymptomAnalysis';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ResultCard from '../../components/common/ResultCard';
import './SymptomChecker.css';
import VoiceRecognition from '../../components/VoiceRecognition/VoiceRecognition';

const SymptomChecker = () => {
  const { t, i18n } = useTranslation();
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: t('symptomChecker.description'),
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { analyzeSymptoms, result, isLoading, error } = useSymptomAnalysis();

  const langMap = {
    en: 'en-US', hi: 'hi-IN', es: 'es-ES', fr: 'fr-FR', zh: 'zh-CN', ar: 'ar-SA', ru: 'ru-RU', de: 'de-DE', ja: 'ja-JP', pt: 'pt-PT', it: 'it-IT', bn: 'bn-IN', tr: 'tr-TR', te: 'te-IN', mr: 'mr-IN', ta: 'ta-IN', kn: 'kn-IN', ml: 'ml-IN'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (result) {
      setMessages(prev => {
        const botMessage = {
          id: prev.length + 1,
          type: 'bot',
          content: t('symptomChecker.analyzing'),
          timestamp: new Date(),
          result: result
        };
        return [...prev, botMessage];
      });
      setIsTyping(false);
    }
  }, [result, t]);

  useEffect(() => {
    if (error) {
      setMessages(prev => {
        const botMessage = {
          id: prev.length + 1,
          type: 'bot',
          content: t('symptomChecker.error'),
          timestamp: new Date(),
          isError: true
        };
        return [...prev, botMessage];
      });
      setIsTyping(false);
    }
  }, [error, t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    setIsTyping(true);
    setUserInput('');

    await analyzeSymptoms(userInput);
  };

  const quickQuestions = [
    { key: 'fever', text: t('symptomChecker.quickQuestions.fever') },
    { key: 'headache', text: t('symptomChecker.quickQuestions.headache') },
    { key: 'cough', text: t('symptomChecker.quickQuestions.cough') },
    { key: 'stomach', text: t('symptomChecker.quickQuestions.stomach') },
    { key: 'fatigue', text: t('symptomChecker.quickQuestions.fatigue') }
  ];

  const handleQuickQuestion = (question) => {
    setUserInput(question);
  };

  const speakDescription = () => {
    const description = t('symptomChecker.description');
    if ('speechSynthesis' in window) {
      const utterance = new window.SpeechSynthesisUtterance(description);
      const currentLang = i18n.language || 'en';
      utterance.lang = langMap[currentLang] || 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  };

  const formatResultForSpeech = (result) => {
    if (!result) return '';
    let text = `Symptom: ${result.symptom}. `;
    if (result.causes) text += `Possible causes: ${result.causes.join(', ')}. `;
    if (result.remedies) text += `Recommended remedies: ${result.remedies.join(', ')}. `;
    if (result.medicines) {
      text += 'Suggested medicines: ';
      if (Array.isArray(result.medicines)) {
        text += result.medicines.map(med => {
          if (typeof med === 'string') return med;
          return `${med.name || ''} ${med.dosage || ''}`.trim();
        }).join(', ') + '. ';
      } else {
        text += result.medicines + '. ';
      }
    }
    if (result.severity) text += `Severity: ${result.severity}. `;
    if (result.when_to_see_doctor) text += `When to see a doctor: ${result.when_to_see_doctor}. `;
    return text;
  };

  return (
    <div className="symptom-checker">
      <h1>{t('symptomChecker.title')}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
        <p className="description">{t('symptomChecker.description')}</p>
        <button type="button" onClick={speakDescription} style={{ padding: '0.3em 0.7em' }}>
          🔊
        </button>
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.type}-message ${message.isError ? 'error-message' : ''}`}
            >
              <div className="message-content">
                {message.type === 'bot' && (
                  <div className="bot-avatar">🤖</div>
                )}
                <div className="message-bubble">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                    <p>{message.content}</p>
                    {message.type === 'bot' && (
                      <button
                        type="button"
                        onClick={() => {
                          if ('speechSynthesis' in window) {
                            let speechText = message.content;
                            if (message.result) {
                              speechText += ' ' + formatResultForSpeech(message.result);
                            }
                            const utterance = new window.SpeechSynthesisUtterance(speechText);
                            const currentLang = i18n.language || 'en';
                            utterance.lang = langMap[currentLang] || 'en-US';
                            window.speechSynthesis.speak(utterance);
                          }
                        }}
                        style={{ padding: '0.2em 0.5em' }}
                        aria-label="Speak response"
                      >
                        🔊
                      </button>
                    )}
                  </div>
                  {message.result && (
                    <ResultCard result={message.result} />
                  )}
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot-message">
              <div className="message-content">
                <div className="bot-avatar">🤖</div>
                <div className="message-bubble typing">
                  <LoadingSpinner size="small" />
                  <span>{t('symptomChecker.analyzing')}</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="quick-questions">
          <p>{t('symptomChecker.quickQuestions.title')}:</p>
          <div className="quick-buttons">
            {quickQuestions.map((question) => (
              <button
                key={question.key}
                className="quick-question-btn"
                onClick={() => handleQuickQuestion(question.text)}
              >
                {question.text}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="input-form">
          <VoiceRecognition onResult={setUserInput} />
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={t('symptomChecker.placeholder')}
            className="input-field"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !userInput.trim()}
            className="submit-button"
          >
            {isLoading ? t('symptomChecker.analyzing') : t('symptomChecker.analyze')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SymptomChecker;