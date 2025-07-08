import React, { useState } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceRecognition = ({ onResult, className }) => {
  const [listening, setListening] = useState(false);
  let recognition = null;

  const startListening = () => {
    if (!SpeechRecognition) {
      alert('Sorry, your browser does not support Speech Recognition.');
      return;
    }
    setListening(true);
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setListening(false);
      if (onResult) onResult(text);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const stopListening = () => {
    if (recognition) recognition.stop();
    setListening(false);
  };

  return (
    <button
      type="button"
      onClick={listening ? stopListening : startListening}
      className={className}
      aria-label={listening ? 'Stop Listening' : 'Start Voice Input'}
      style={{
        background: 'none',
        border: 'none',
        fontSize: '1.5em',
        cursor: 'pointer',
        outline: 'none',
        marginRight: '0.5em',
        verticalAlign: 'middle',
      }}
    >
      {listening ? '🛑' : '🎤'}
    </button>
  );
};

export default VoiceRecognition; 
