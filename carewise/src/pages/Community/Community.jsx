import React, { useState } from 'react';
import './Community.css';

const Community = () => {
  const [posts] = useState([
    {
      id: 1,
      title: "Understanding Common Cold Symptoms",
      author: "Dr. Ravi Gupta",
      date: "2025-01-15",
      excerpt: "Learn about the early signs of a common cold and when to seek medical attention...",
      content: (
        <div>
          <p>The common cold is a mild, self-limiting viral infection of the upper respiratory tract. It typically develops gradually and lasts about 7–10 days. Recognizing the symptoms early can help you manage them effectively and avoid complications.</p>
          <h4>Early Symptoms</h4>
          <ul>
            <li>Sore or scratchy throat</li>
            <li>Sneezing</li>
            <li>Runny or stuffy nose</li>
            <li>Mild headache</li>
            <li>Fatigue or general tiredness</li>
          </ul>
          <h4>Later or Ongoing Symptoms</h4>
          <ul>
            <li>Cough (dry or with phlegm)</li>
            <li>Mild fever (usually under 101°F / 38.3°C)</li>
            <li>Watery eyes</li>
            <li>Mild body aches</li>
          </ul>
          <h4>When to Seek Medical Attention</h4>
          <ul>
            <li>High or persistent fever (above 102°F / 38.9°C)</li>
            <li>Severe headache or facial pain</li>
            <li>Shortness of breath or wheezing</li>
            <li>Symptoms lasting more than 10 days without improvement</li>
            <li>Symptoms worsening after initial improvement</li>
            <li>Signs of dehydration (especially in children or older adults)</li>
          </ul>
          <h4>Tips for Relief</h4>
          <ul>
            <li>Stay hydrated by drinking plenty of fluids</li>
            <li>Rest as much as possible</li>
            <li>Use saline nasal sprays or steam inhalation for congestion</li>
            <li>Take over-the-counter remedies as advised</li>
            <li>Practice good hygiene to avoid spreading the virus</li>
          </ul>
        </div>
      )
    },
    {
      id: 2,
      title: "Healthy Eating Habits for Better Immunity",
      author: "Nutritionist Nikitha Wagmare",
      date: "2025-01-12",
      excerpt: "Discover the best foods to boost your immune system and maintain good health...",
      content: (
        <div>
          <p>A strong immune system is your body’s natural defense against infections and illnesses. While no single food or supplement can guarantee immunity, a balanced diet filled with specific nutrients can help your immune system function at its best.</p>
          <h4>1. Eat a Rainbow of Fruits and Vegetables</h4>
          <p>Brightly colored produce like oranges, carrots, spinach, and berries are rich in vitamins A, C, and E, as well as antioxidants that support immune cells and fight off harmful pathogens.</p>
          <h4>2. Include Protein-Rich Foods</h4>
          <p>Protein helps build and repair body tissues and supports the production of immune cells. Include a variety of sources like eggs, legumes, dairy, poultry, fish, and nuts in your meals.</p>
          <h4>3. Prioritize Gut Health</h4>
          <p>Your gut is closely linked to immunity. Add probiotics (like yogurt, kefir, and fermented foods) and fiber-rich foods (whole grains, bananas, oats) to support a healthy gut microbiome.</p>
          <h4>4. Stay Hydrated</h4>
          <p>Water helps transport nutrients and flush out toxins. Aim for 6–8 glasses of water daily, and include hydrating foods like cucumbers, oranges, and soups.</p>
          <h4>5. Limit Processed and Sugary Foods</h4>
          <p>High intake of sugar and processed foods can weaken immune function and promote inflammation. Choose natural, whole foods instead.</p>
          <h4>6. Don't Skip Essential Micronutrients</h4>
          <ul>
            <li><strong>Vitamin C</strong> – citrus fruits, bell peppers, guava</li>
            <li><strong>Vitamin D</strong> – sunlight, fortified foods, mushrooms</li>
            <li><strong>Zinc</strong> – pumpkin seeds, lentils, chickpeas</li>
            <li><strong>Iron</strong> – spinach, tofu, lean meats</li>
          </ul>
          <h4>Simple Habits for Long-Term Impact</h4>
          <ul>
            <li>Plan balanced meals</li>
            <li>Avoid overeating</li>
            <li>Eat mindfully</li>
            <li>Stick to regular meal times</li>
          </ul>
          <p>A healthy diet, combined with adequate sleep, exercise, and stress management, creates a solid foundation for lifelong wellness. Remember, good nutrition isn't about restrictions—it's about making smarter choices every day.</p>
        </div>
      )
    },
    {
      id: 3,
      title: "Mental Health and Physical Wellbeing",
      author: "Dr. Eswar Reddy",
      date: "2025-01-10",
      excerpt: "Exploring the connection between mental health and physical symptoms...",
      content: (
        <div>
          <p>Mental and physical health are deeply interconnected. When your mind is under stress, anxious, or emotionally drained, your body often responds in noticeable ways. Understanding this mind-body connection is crucial to achieving overall wellbeing.</p>
          <h4>How Mental Health Affects the Body</h4>
          <ul>
            <li>Headaches or migraines</li>
            <li>Fatigue and low energy</li>
            <li>Muscle tension or pain</li>
            <li>Sleep disturbances</li>
            <li>Digestive issues (e.g., bloating, cramps, appetite changes)</li>
            <li>Increased heart rate or high blood pressure</li>
          </ul>
          <p>Over time, untreated mental health issues can contribute to more serious health problems, such as cardiovascular disease, weakened immunity, and poor lifestyle habits.</p>
          <h4>Physical Health’s Impact on Mental State</h4>
          <p>Conversely, chronic physical illnesses—such as diabetes, arthritis, or thyroid disorders—can affect your mood and mental health. Long-term pain, limited mobility, or lifestyle restrictions can lead to feelings of isolation, anxiety, or depression.</p>
          <h4>Strategies for Holistic Wellbeing</h4>
          <ul>
            <li>Exercise regularly – Boosts mood, improves sleep, and strengthens the body</li>
            <li>Eat a balanced diet – Nutrients like omega-3s, B vitamins, and magnesium support brain health</li>
            <li>Practice mindfulness – Techniques like meditation, deep breathing, or yoga help reduce stress</li>
            <li>Stay socially connected – Talking to friends or joining a support group promotes emotional resilience</li>
            <li>Seek help early – Don’t hesitate to consult a psychologist, psychiatrist, or general physician</li>
          </ul>
          <h4>Takeaway</h4>
          <p>Your mental and physical health are two sides of the same coin. By nurturing both through healthy habits, early intervention, and self-awareness, you can build a stronger, healthier you—inside and out.</p>
        </div>
      )
    }
  ]);

  const [expandedPostId, setExpandedPostId] = useState(null);

  return (
    <div className="community-container">
      <h2>👥 Community & Health Blog</h2>
      <p>Connect with others and learn from health experts</p>
      
      <div className="community-stats">
        <div className="stat-card">
          <h3>1,234</h3>
          <p>Community Members</p>
        </div>
        <div className="stat-card">
          <h3>567</h3>
          <p>Health Articles</p>
        </div>
        <div className="stat-card">
          <h3>89</h3>
          <p>Expert Contributors</p>
        </div>
      </div>
      
      <div className="blog-section">
        <h3>Latest Health Articles</h3>
        <div className="blog-posts">
          {posts.map(post => (
            <div key={post.id} className="blog-post">
              <h4>{post.title}</h4>
              <div className="post-meta">
                <span>By {post.author}</span>
                <span>{post.date}</span>
              </div>
              <p>{post.excerpt}</p>
              {expandedPostId === post.id ? (
                <>
                  <div style={{marginTop: '1em'}}>{post.content}</div>
                  <button className="read-more-btn" onClick={() => setExpandedPostId(null)}>Show Less</button>
                </>
              ) : (
                <button className="read-more-btn" onClick={() => setExpandedPostId(post.id)}>Read More</button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="community-features">
        <h3>Community Features</h3>
        <div className="features-list">
          <div className="feature-item">
            <h4>💬 Discussion Forums</h4>
            <p>Join conversations about health topics</p>
          </div>
          <div className="feature-item">
            <h4>👨‍⚕️ Expert Q&A</h4>
            <p>Get answers from healthcare professionals</p>
          </div>
          <div className="feature-item">
            <h4>📱 Support Groups</h4>
            <p>Connect with people facing similar health challenges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
