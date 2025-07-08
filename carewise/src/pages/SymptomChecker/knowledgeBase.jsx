// src/components/SymptomChecker/knowledgeBase.js
export const knowledgeBase = {
  fever: {
    common_causes: ["flu", "cold", "infection"],
    home_remedies: [
      "Drink plenty of fluids (water, herbal teas).",
      "Take a lukewarm bath.",
      "Rest and avoid overexertion."
    ],
    medicines: ["Paracetamol (acetaminophen)", "Ibuprofen"],
    recovery_time: "3-5 days",
    related_diseases: ["Influenza", "COVID-19", "Malaria", "Dengue", "Typhoid"],
    specialty: "general medicine"
  },
  // ... other symptoms
};

export const SYMPTOM_SPECIALTY_MAP = {
  fever: "general medicine",
  cough: "pulmonology",
  headache: "neurology",
  sore_throat: "ent",
  nausea: "gastroenterology",
  rashes: "dermatology",
  eye_infection: "ophthalmology",
  ear_infection: "ent",
  fatigue: "general medicine",
  body_pains: "orthopedics",
  shortness_of_breath: "pulmonology",
  stomach_ache: "gastroenterology"
};