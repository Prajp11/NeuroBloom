import React from 'react';
import '../../../App.css';
import stressImage from '../../../Images/MentalHealth/Stress_1.png';
import mentalImage from '../../../Images/MentalHealth/Mental_H.png';
import sleep from '../../../Images/MentalHealth/Sleep.png';
import anxiety from '../../../Images/MentalHealth/Anxiety.png';
import exerice from '../../../Images/MentalHealth/Exercise.png';
import workplace from '../../../Images/MentalHealth/Workplace.png';
import depression from '../../../Images/MentalHealth/Depression.png';
import ptsd from '../../../Images/MentalHealth/PTSD.png';
import nutrition from '../../../Images/MentalHealth/Nutrition.png';
import power from '../../../Images/MentalHealth/Power.png';
import resilience from '../../../Images/MentalHealth/Resilience.png';
import socialmedia from '../../../Images/MentalHealth/Social Media.png';

const articles = [
  {
    title: 'What is Stress?',
    summary: 'Stress is a natural response to challenges and demands in life. It can be beneficial in small doses but becomes harmful when chronic. Understanding the causes and learning to manage it effectively is essential for maintaining mental and physical well-being.',
    image: stressImage,
    link: 'https://www.helpguide.org/articles/stress/stress-symptoms-causes-and-effects.htm',
    color: '#FFEB3B',
  },
  {
    title: 'Understanding Mental Health',
    summary: 'Mental health includes emotional, psychological, and social well-being. It influences cognition, perception, and behavior. Prioritizing mental health is crucial for coping with stress, connecting with others, and making sound decisions in daily life.',
    image: mentalImage,
    link: 'https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response',
    color: '#81C784',
  },
  {
    title: 'The Importance of Sleep for Mental Health',
    summary: 'Sleep plays a vital role in processing emotions and restoring brain function. Inadequate sleep can contribute to anxiety, irritability, and depression. Prioritizing consistent, quality rest improves mental resilience and emotional balance.',
    image: sleep,
    link: 'https://www.sleepfoundation.org/mental-health',
    color: '#64B5F6',
  },
  {
    title: 'How to Deal with Anxiety',
    summary: 'Anxiety is a natural emotion but can become overwhelming if unmanaged. Techniques like deep breathing, progressive relaxation, and cognitive reframing help reduce symptoms. Support networks and therapy also play a key role in long-term management.',
    image: anxiety,
    link: 'https://www.psychologytoday.com/us/basics/anxiety',
    color: '#E1BEE7',
  },
  {
    title: 'How Physical Activity Improves Mental Health',
    summary: 'Regular physical activity reduces stress hormones and boosts endorphins. It helps alleviate symptoms of depression and anxiety while enhancing memory and self-confidence. Even light exercises like walking can make a meaningful difference.',
    image: exerice,
    link: 'https://www.health.harvard.edu/staying-healthy/exercising-to-relax',
    color: '#CEEB87',
  },
  {
    title: 'How to Manage Stress in the Workplace',
    summary: 'Work-related stress can cause burnout and emotional exhaustion. Techniques such as time management, setting boundaries, and mindfulness can enhance productivity and emotional health. Employers also play a role in creating supportive environments.',
    image: workplace,
    link: 'https://www.verywellmind.com/how-to-manage-workplace-stress-3144610',
    color: '#FFCC80',
  },
  {
    title: 'What is Depression and How Can You Manage It?',
    summary: 'Depression affects how you feel, think, and handle daily activities. It may manifest as prolonged sadness, fatigue, and lack of interest. Effective treatment may include therapy, medication, lifestyle changes, and strong social support.',
    image: depression,
    link: 'https://www.nimh.nih.gov/health/topics/depression',
    color: '#81D4FA',
  },
  {
    title: 'Dealing with Post-Traumatic Stress Disorder (PTSD)',
    summary: 'PTSD can develop after exposure to traumatic events. Symptoms include nightmares, flashbacks, and emotional numbness. Early intervention with therapy and support can significantly improve recovery and quality of life.',
    image: ptsd,
    link: 'https://www.nhs.uk/mental-health/conditions/post-traumatic-stress-disorder-ptsd/treatment/',
    color: '#FF8A80',
  },
  {
    title: 'The Role of Nutrition in Mental Health',
    summary: 'What you eat influences how you feel. Nutrient-rich diets improve mood and cognitive function, while deficiencies can contribute to anxiety and depression. Consuming whole foods, omega-3s, and probiotics supports brain and gut health.',
    image: nutrition,
    link: 'https://www.health.harvard.edu/blog/nutritional-psychiatry-your-brain-on-food-201511168626',
    color: '#C5E1A5',
  },
  {
    title: 'The Power of Meditation for Mental Clarity',
    summary: 'Meditation fosters awareness, inner calm, and emotional control. Regular practice has been shown to lower cortisol levels, increase focus, and reduce negative thought patterns. It’s a valuable tool for mental and emotional well-being.',
    image: power,
    link: 'https://www.headspace.com/meditation/benefits',
    color: '#FFEB3B',
  },
  {
    title: 'How to Build Resilience to Overcome Adversity',
    summary: 'Resilience enables individuals to recover from setbacks and thrive. It involves developing coping strategies, optimism, and a strong sense of purpose. Through practice and support, resilience can be strengthened over time.',
    image: resilience,
    link: 'https://www.psychologytoday.com/us/basics/resilience',
    color: '#E1BEE7',
  },
  {
    title: 'The Impact of Social Media on Mental Health',
    summary: 'Social media can affect self-image, mood, and attention span. While it offers connection, excessive use may lead to anxiety, loneliness, or comparison. Setting time limits and curating feeds can improve digital well-being.',
    image: socialmedia,
    link: 'https://health.ucdavis.edu/blog/cultivating-health/social-medias-impact-our-mental-health-and-tips-to-use-it-safely/2024/05',
    color: '#FFB74D',
  },
];

const MentalHealthEducation = () => {
  // Function to get article tags based on content
  const getArticleTags = (title) => {
    const tagMap = {
      'What is Stress?': ['Stress Management', 'Wellness', 'Health Tips'],
      'Understanding Mental Health': ['Mental Wellness', 'Psychology', 'Self-Care'],
      'The Importance of Sleep for Mental Health': ['Sleep Health', 'Recovery', 'Mental Wellness'],
      'How to Deal with Anxiety': ['Anxiety', 'Coping Skills', 'Mental Health'],
      'How Physical Activity Improves Mental Health': ['Exercise', 'Mental Wellness', 'Fitness'],
      'How to Manage Stress in the Workplace': ['Work-Life Balance', 'Stress Management', 'Professional'],
      'What is Depression and How Can You Manage It?': ['Depression', 'Mental Health', 'Treatment'],
      'Dealing with Post-Traumatic Stress Disorder (PTSD)': ['PTSD', 'Trauma', 'Recovery'],
      'The Role of Nutrition in Mental Health': ['Nutrition', 'Brain Health', 'Wellness'],
      'The Power of Meditation for Mental Clarity': ['Meditation', 'Mindfulness', 'Mental Clarity'],
      'How to Build Resilience to Overcome Adversity': ['Resilience', 'Coping Skills', 'Personal Growth'],
      'The Impact of Social Media on Mental Health': ['Digital Wellness', 'Social Media', 'Mental Health']
    };
    return tagMap[title] || ['Mental Health', 'Wellness'];
  };

  return (
    <div className="education-page">
      <div className="education-container">
        {/* Hero Section */}
        <div className="education-hero">
          <div className="education-hero-icon">📚</div>
          <h2 className="education-title">Mental Health Education Hub</h2>
          <p className="education-description">
            Discover evidence-based insights, expert guidance, and practical strategies to 
            enhance your mental well-being through comprehensive educational resources.
          </p>
          <div className="education-motivation">
            <span>🧠</span>
            <span>Knowledge is the first step to healing</span>
          </div>
        </div>

        {/* Educational Stats */}
        <div className="education-stats">
          <div className="stat-card">
            <span className="stat-number">12</span>
            <span className="stat-label">Expert Articles</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">100%</span>
            <span className="stat-label">Evidence-Based</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Available</span>
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="article-cards">
          {articles.map((article, index) => (
            <div
              key={index}
              className="article-card"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                background: `linear-gradient(135deg, ${article.color}15 0%, ${article.color}08 100%)`
              }}
            >
              <img 
                src={article.image} 
                alt={article.title} 
                className="article-image"
                loading="lazy"
              />
              <div className="article-content">
                <div className="article-tags">
                  {getArticleTags(article.title).map((tag, tagIndex) => (
                    <span key={tagIndex} className="article-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="read-more-link"
                  onClick={(e) => {
                    // Add a subtle click feedback
                    e.currentTarget.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                      e.currentTarget.style.transform = '';
                    }, 150);
                  }}
                >
                  <span>Read Full Article</span>
                  <span className="read-more-arrow">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information Section */}
        <div style={{
          marginTop: '60px',
          textAlign: 'center',
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(15px)',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)'
        }}>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '800',
            color: '#2c3e50',
            marginBottom: '15px'
          }}>
            Continue Your Mental Wellness Journey
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 25px'
          }}>
            These articles are curated by mental health professionals to provide you with 
            reliable, actionable information for your wellness journey.
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.2) 0%, rgba(78, 205, 196, 0.1) 100%)',
            padding: '12px 25px',
            borderRadius: '30px',
            border: '1px solid rgba(78, 205, 196, 0.3)',
            color: '#2c3e50',
            fontWeight: '600'
          }}>
            <span>💡</span>
            <span>Remember: Professional help is always available when you need it</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthEducation;