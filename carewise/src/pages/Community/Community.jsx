import React, { useState } from 'react';
import './Community.css';

const Community = () => {
  const [posts] = useState([
    {
      id: 1,
      title: "Understanding Common Cold Symptoms",
      author: "Dr. Ravi Gupta",
      date: "2024-01-15",
      excerpt: "Learn about the early signs of a common cold and when to seek medical attention..."
    },
    {
      id: 2,
      title: "Healthy Eating Habits for Better Immunity",
      author: "Nutritionist Nikitha Wagmare",
      date: "2024-01-12",
      excerpt: "Discover the best foods to boost your immune system and maintain good health..."
    },
    {
      id: 3,
      title: "Mental Health and Physical Wellbeing",
      author: "Dr. Eswar Reddy",
      date: "2024-01-10",
      excerpt: "Exploring the connection between mental health and physical symptoms..."
    }
  ]);

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
              <button className="read-more-btn">Read More</button>
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