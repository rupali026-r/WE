import React, { useState, useEffect } from 'react';
import './Recommendations.css';

const Recommendations = () => {
  const [userData, setUserData] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    healthGoals: [],
    location: '',
    symptoms: ''
  });

  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Mock hospital data with locations
  const hospitalData = {
    general: [
      {
        name: "City General Hospital",
        address: "123 Main Street, Downtown",
        phone: "+1 (555) 123-4567",
        rating: 4.5,
        specialties: ["General Medicine", "Emergency Care", "Pediatrics"],
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      {
        name: "Community Medical Center",
        address: "456 Oak Avenue, Midtown",
        phone: "+1 (555) 234-5678",
        rating: 4.2,
        specialties: ["Family Medicine", "Internal Medicine", "Urgent Care"],
        coordinates: { lat: 40.7589, lng: -73.9851 }
      }
    ],
    cardiology: [
      {
        name: "Heart & Vascular Institute",
        address: "789 Cardiac Drive, Medical District",
        phone: "+1 (555) 345-6789",
        rating: 4.8,
        specialties: ["Cardiology", "Cardiac Surgery", "Interventional Cardiology"],
        coordinates: { lat: 40.7505, lng: -73.9934 }
      }
    ],
    neurology: [
      {
        name: "Neurological Center",
        address: "321 Brain Street, Neuroscience District",
        phone: "+1 (555) 456-7890",
        rating: 4.6,
        specialties: ["Neurology", "Neurosurgery", "Stroke Care"],
        coordinates: { lat: 40.7614, lng: -73.9776 }
      }
    ],
    pediatrics: [
      {
        name: "Children's Medical Center",
        address: "654 Kids Lane, Family District",
        phone: "+1 (555) 567-8901",
        rating: 4.7,
        specialties: ["Pediatrics", "Child Psychology", "Pediatric Surgery"],
        coordinates: { lat: 40.7484, lng: -73.9857 }
      }
    ]
  };

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Location access denied:", error);
        }
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const age = parseInt(userData.age);
      const bmi = userData.weight && userData.height 
        ? (userData.weight / Math.pow(userData.height / 100, 2)).toFixed(1)
        : null;

      // Generate personalized recommendations
      const healthRecommendations = generateHealthRecommendations(age, bmi, userData.activityLevel, userData.symptoms);
      const nearbyHospitals = getNearbyHospitals(userData.symptoms);

      setRecommendations({
        health: healthRecommendations,
        hospitals: nearbyHospitals,
        userProfile: {
          age,
          bmi,
          activityLevel: userData.activityLevel,
          location: userData.location || 'Current Location'
        }
      });
      setIsLoading(false);
    }, 2000);
  };

  const generateHealthRecommendations = (age, bmi, activityLevel, symptoms) => {
    const recommendations = {
      diet: [],
      exercise: [],
      lifestyle: [],
      preventive: [],
      medications: []
    };

    // Age-based recommendations
    if (age < 30) {
      recommendations.diet.push("Focus on protein-rich foods for muscle building");
      recommendations.exercise.push("Aim for 150 minutes of moderate exercise weekly");
      recommendations.lifestyle.push("Establish healthy sleep patterns (7-9 hours)");
    } else if (age < 50) {
      recommendations.diet.push("Increase fiber intake for digestive health");
      recommendations.exercise.push("Include strength training 2-3 times per week");
      recommendations.preventive.push("Schedule annual health check-ups");
    } else {
      recommendations.diet.push("Increase calcium and vitamin D intake");
      recommendations.exercise.push("Low-impact exercises like walking or swimming");
      recommendations.preventive.push("Regular bone density and heart health screenings");
    }

    // BMI-based recommendations
    if (bmi) {
      if (bmi < 18.5) {
        recommendations.diet.push("Increase caloric intake with healthy foods");
        recommendations.lifestyle.push("Consult a nutritionist for weight gain plan");
      } else if (bmi > 25) {
        recommendations.diet.push("Reduce processed foods and added sugars");
        recommendations.exercise.push("Increase daily physical activity");
      }
    }

    // Activity level recommendations
    if (activityLevel === 'sedentary') {
      recommendations.exercise.push("Start with 10-minute walks daily");
      recommendations.lifestyle.push("Take breaks to stand and move every hour");
    }

    // Symptom-based recommendations
    if (symptoms.toLowerCase().includes('fatigue')) {
      recommendations.lifestyle.push("Ensure adequate sleep and stress management");
      recommendations.diet.push("Include iron-rich foods in your diet");
    }

    return recommendations;
  };

  const getNearbyHospitals = (symptoms) => {
    const symptomLower = symptoms.toLowerCase();
    let specialty = 'general';

    if (symptomLower.includes('heart') || symptomLower.includes('chest')) {
      specialty = 'cardiology';
    } else if (symptomLower.includes('head') || symptomLower.includes('brain')) {
      specialty = 'neurology';
    } else if (symptomLower.includes('child') || symptomLower.includes('baby')) {
      specialty = 'pediatrics';
    }

    return hospitalData[specialty] || hospitalData.general;
  };

  const getGoogleMapsUrl = (hospital) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name + ', ' + hospital.address)}`;
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="recommendations-container">
      <h2>💊 Personalized Health Recommendations</h2>
      <p>Get tailored health advice and find nearby healthcare facilities</p>
      
      <form onSubmit={handleSubmit} className="recommendations-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={userData.age}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="weight">Weight (kg):</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={userData.weight}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="height">Height (cm):</label>
            <input
              type="number"
              id="height"
              name="height"
              value={userData.height}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="activityLevel">Activity Level:</label>
            <select
              id="activityLevel"
              name="activityLevel"
              value={userData.activityLevel}
              onChange={handleChange}
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="very">Very Active</option>
              <option value="extra">Extra Active</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location (optional):</label>
            <input
              type="text"
              id="location"
              name="location"
              value={userData.location}
              onChange={handleChange}
              placeholder="City, State or ZIP"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="symptoms">Current Symptoms (optional):</label>
          <textarea
            id="symptoms"
            name="symptoms"
            value={userData.symptoms}
            onChange={handleChange}
            rows="3"
            placeholder="Describe any current symptoms for specialized recommendations..."
          />
        </div>
        
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Generating Recommendations...' : 'Get Recommendations'}
        </button>
      </form>
      
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Analyzing your profile and finding nearby facilities...</p>
        </div>
      )}

      {recommendations && (
        <div className="recommendations-display">
          <div className="user-profile">
            <h3>Your Health Profile</h3>
            <div className="profile-stats">
              <div className="stat">
                <span className="label">Age:</span>
                <span className="value">{recommendations.userProfile.age} years</span>
              </div>
              {recommendations.userProfile.bmi && (
                <div className="stat">
                  <span className="label">BMI:</span>
                  <span className="value">{recommendations.userProfile.bmi}</span>
                </div>
              )}
              <div className="stat">
                <span className="label">Activity Level:</span>
                <span className="value">{recommendations.userProfile.activityLevel}</span>
              </div>
            </div>
          </div>

          <div className="health-recommendations">
            <h3>Personalized Health Recommendations</h3>
            
            <div className="recommendation-section">
              <h4>🥗 Diet & Nutrition</h4>
              <ul>
                {recommendations.health.diet.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="recommendation-section">
              <h4>🏃‍♂️ Exercise & Fitness</h4>
              <ul>
                {recommendations.health.exercise.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="recommendation-section">
              <h4>🌙 Lifestyle & Wellness</h4>
              <ul>
                {recommendations.health.lifestyle.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="recommendation-section">
              <h4>🩺 Preventive Care</h4>
              <ul>
                {recommendations.health.preventive.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="nearby-hospitals">
            <h3>🏥 Nearby Healthcare Facilities</h3>
            <p>Based on your symptoms and location, here are recommended facilities:</p>
            
            <div className="hospitals-grid">
              {recommendations.hospitals.map((hospital, index) => (
                <div key={index} className="hospital-card">
                  <div className="hospital-header">
                    <h4>{hospital.name}</h4>
                    <div className="rating">
                      ⭐ {hospital.rating}/5
                    </div>
                  </div>
                  
                  <div className="hospital-details">
                    <p><strong>Address:</strong> {hospital.address}</p>
                    <p><strong>Phone:</strong> <a href={`tel:${hospital.phone}`}>{hospital.phone}</a></p>
                    <p><strong>Specialties:</strong></p>
                    <ul>
                      {hospital.specialties.map((specialty, idx) => (
                        <li key={idx}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="hospital-actions">
                    <a 
                      href={getGoogleMapsUrl(hospital)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="map-btn"
                    >
                      📍 View on Google Maps
                    </a>
                    <a 
                      href={`tel:${hospital.phone}`} 
                      className="call-btn"
                    >
                      📞 Call Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendations;