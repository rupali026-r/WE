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
  const [realHospitals, setRealHospitals] = useState([]);
  const [hospitalLoading, setHospitalLoading] = useState(false);
  const [hospitalError, setHospitalError] = useState('');

  // Helper to geocode a location string to lat/lon using Nominatim
  async function geocodeLocation(location) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=jsonv2&limit=1`;
    const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!response.ok) throw new Error('Failed to geocode location');
    const data = await response.json();
    if (!data.length) throw new Error('Location not found');
    return data[0]; // { lat, lon, display_name }
  }

  // Helper to fetch hospitals near lat/lon using Nominatim
  async function fetchHospitalsNearLatLon(lat, lon) {
    const delta = 0.1;
    const left = parseFloat(lon) - delta;
    const top = parseFloat(lat) + delta;
    const right = parseFloat(lon) + delta;
    const bottom = parseFloat(lat) - delta;
    const viewbox = [left, top, right, bottom].join(',');
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&amenity=hospital&limit=10&lat=${lat}&lon=${lon}&addressdetails=1&bounded=1&viewbox=${viewbox}`;
    const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!response.ok) throw new Error('Failed to fetch hospital data');
    return await response.json();
  }

  // Helper to calculate distance between two lat/lon points in km (Haversine formula)
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

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

  // Fetch real hospitals on mount or when userLocation/userData.location changes
  useEffect(() => {
    async function fetchHospitals() {
      setHospitalLoading(true);
      setHospitalError('');
      try {
        let lat, lon, display_name;
        if (userData.location) {
          // Always use manual input if present
          const geo = await geocodeLocation(userData.location);
          lat = geo.lat;
          lon = geo.lon;
          display_name = geo.display_name;
        } else if (userLocation) {
          lat = userLocation.lat;
          lon = userLocation.lng;
          display_name = 'your current location';
        } else {
          setHospitalError('Location not available. Please enter your city or area.');
          setHospitalLoading(false);
          return;
        }
        const hospitals = await fetchHospitalsNearLatLon(lat, lon);
        const userLat = parseFloat(lat);
        const userLon = parseFloat(lon);
        const hospitalsWithDistance = hospitals.map(h => ({
          ...h,
          distance: getDistanceFromLatLonInKm(userLat, userLon, parseFloat(h.lat), parseFloat(h.lon))
        }));
        const nearbyHospitals = hospitalsWithDistance
          .filter(h => h.distance <= 10)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 5);

        // After getting nearbyHospitals, filter by user input location
        const userInput = userData.location ? userData.location.toLowerCase() : '';
        const filteredHospitals = nearbyHospitals.filter(h =>
          h.display_name.toLowerCase().includes(userInput)
        );
        let hospitalsToShow = filteredHospitals.length > 0 ? filteredHospitals : nearbyHospitals;
        let locationNote = '';
        if (filteredHospitals.length === 0 && nearbyHospitals.length > 0 && userInput) {
          locationNote = `No hospitals found exactly in "${userData.location}". Showing nearest hospitals in the area.`;
        }
        setRealHospitals(hospitalsToShow);
        setHospitalError(locationNote);
      } catch (err) {
        setHospitalError('Could not fetch nearby hospitals. Please check your location or try again.');
      } finally {
        setHospitalLoading(false);
      }
    }
    fetchHospitals();
    // eslint-disable-next-line
  }, [userLocation, userData.location]);

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

      setRecommendations({
        health: healthRecommendations,
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

  const getGoogleMapsUrl = (hospital) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name + ', ' + hospital.address)}`;
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
    if (e.target.name === 'location' && e.target.value) {
      setUserLocation(null); // Always use manual input if present
    }
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
            {hospitalLoading && <div className="loading-container"><div className="loading-spinner"></div><p>Finding nearby hospitals...</p></div>}
            {hospitalError && <div className="error-message">{hospitalError}</div>}
            <div className="hospitals-grid">
              {realHospitals.map((hospital, index) => {
                const [name, ...addressParts] = hospital.display_name.split(',');
                const shortAddress = addressParts.join(',').trim().split(',').slice(0,2).join(',').trim();
                const hlat = hospital.lat;
                const hlon = hospital.lon;
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${hlat},${hlon}`;
                return (
                  <div key={index} className="hospital-card improved-hospital-card">
                    <div className="hospital-header">
                      <h4>{name.trim()}</h4>
                      <div className="rating">
                        {hospital.distance && <>📍 {hospital.distance.toFixed(2)} km</>}
                      </div>
                    </div>
                    <div className="hospital-details">
                      <p><strong>Address:</strong> {shortAddress}</p>
                    </div>
                    <div className="hospital-actions">
                      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="map-btn">📍 View on Google Maps</a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
