// src/services/symptomService.js
import { knowledgeBase, SYMPTOM_SPECIALTY_MAP } from '../components/SymptomChecker/knowledgeBase';
import { HOSPITAL_DATA } from '../utils/hospitalData';

export const analyzeSymptom = async (symptomText, language = 'en') => {
  // In a real app, this would call your backend API
  // For demo, we'll simulate API call with timeout
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock analysis - in reality you'd use NLP here
  const symptomKey = Object.keys(knowledgeBase).find(key => 
    symptomText.toLowerCase().includes(key)
  ) || 'fever'; // default
  
  const result = knowledgeBase[symptomKey];
  const specialty = SYMPTOM_SPECIALTY_MAP[symptomKey];
  const hospitalInfo = HOSPITAL_DATA[specialty] || HOSPITAL_DATA.general;
  
  return {
    symptom: symptomKey.replace('_', ' '),
    ...result,
    specialty,
    hospitalInfo
  };
};