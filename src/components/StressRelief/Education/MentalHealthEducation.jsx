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
  return (
    <div className="education-container">
      <h2 className="education-title">Mental Health Education</h2>
      <p className="education-description">
        Explore the basics of mental health, stress, and anxiety management, along with practical tips on improving overall well-being.
      </p>
      <div className="article-cards">
        {articles.map((article, index) => (
          <div
            key={index}
            className="article-card"
            style={{ backgroundColor: article.color }}
          >
            <img src={article.image} alt={article.title} className="article-image" />
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="read-more-link">
              Read Full Article →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentalHealthEducation;