import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import './ResultCard.css';

const ResultCard = ({ result }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  if (!result) return null;

  return (
    <div className="result-card">
      {/* Removed language-selector buttons */}
      <h3>{t('resultCard.title')}</h3>
      
      <div className="result-section">
        <h4>{t('resultCard.condition')}</h4>
        <p>{result.symptom || t('resultCard.unknownCondition')}</p>
      </div>

      {result.causes && (
        <div className="result-section">
          <h4>{t('resultCard.causes')}</h4>
          <ul>
            {Array.isArray(result.causes) 
              ? result.causes.map((cause, index) => <li key={index}>{cause}</li>)
              : <li>{result.causes}</li>
            }
          </ul>
        </div>
      )}

      {result.remedies && (
        <div className="result-section">
          <h4>{t('resultCard.remedies')}</h4>
          <ul>
            {Array.isArray(result.remedies)
              ? result.remedies.map((remedy, index) => <li key={index}>{remedy}</li>)
              : <li>{result.remedies}</li>
            }
          </ul>
        </div>
      )}

      {result.medicines && (
        <div className="result-section">
          <h4>{t('resultCard.medicines')}</h4>
          <ul>
            {Array.isArray(result.medicines)
              ? result.medicines.map((medicine, index) => (
                  <li key={index}>
                    {typeof medicine === 'string'
                      ? medicine
                      : `${medicine.name || ''}${medicine.type ? ` (${medicine.type})` : ''}${medicine.dosage ? ` - ${medicine.dosage}` : ''}`}
                  </li>
                ))
              : <li>{result.medicines}</li>
            }
          </ul>
        </div>
      )}

      {result.severity && (
        <div className="result-section">
          <h4>{t('resultCard.severity')}</h4>
          <span className={`severity-${result.severity.toLowerCase()}`}>
            {result.severity}
          </span>
        </div>
      )}

      {result.openFdaInfo && (
        <div className="result-section">
          <h4>{t('resultCard.openFda.title')}</h4>
          <ul>
            {result.openFdaInfo.openfda?.brand_name && (
              <li><strong>{t('resultCard.openFda.brandName')}:</strong> {result.openFdaInfo.openfda.brand_name.join(', ')}</li>
            )}
            {result.openFdaInfo.openfda?.generic_name && (
              <li><strong>{t('resultCard.openFda.genericName')}:</strong> {result.openFdaInfo.openfda.generic_name.join(', ')}</li>
            )}
            {result.openFdaInfo.purpose && (
              <li><strong>{t('resultCard.openFda.purpose')}:</strong> {Array.isArray(result.openFdaInfo.purpose) ? result.openFdaInfo.purpose.join(' ') : result.openFdaInfo.purpose}</li>
            )}
            {result.openFdaInfo.warnings && (
              <li><strong>{t('resultCard.openFda.warnings')}:</strong> {Array.isArray(result.openFdaInfo.warnings) ? result.openFdaInfo.warnings.join(' ') : result.openFdaInfo.warnings}</li>
            )}
          </ul>
        </div>
      )}

      <div className="disclaimer">
        <p><strong>Disclaimer:</strong> {t('resultCard.disclaimer')}</p>
      </div>
    </div>
  );
};

export default ResultCard; 