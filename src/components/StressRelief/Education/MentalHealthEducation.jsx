import React from 'react';

const articles = [
  {
    title: 'What is Stress?',
    description: `Stress is a natural physical and mental response to challenges or demands. It can be triggered by a variety of situations, such as work deadlines, financial problems, or personal issues. While some stress can motivate us to take action, chronic stress can have harmful effects on both our mental and physical health. Prolonged exposure to stress can lead to anxiety, depression, and other serious health problems. It's important to identify the sources of stress in your life and learn healthy ways to manage them.`,
    link: 'https://www.helpguide.org/articles/stress/stress-symptoms-causes-and-effects.htm',
    color: '#FFEB3B', // Yellow
  },
  {
    title: 'Understanding Mental Health',
    description: `Mental health refers to a person's emotional, psychological, and social well-being. It affects how we think, feel, and behave in daily life. Mental health problems are common, and many people will experience mental health challenges at some point. These issues can range from stress, anxiety, and depression to more serious conditions like schizophrenia and bipolar disorder. It's essential to prioritize mental health just like physical health and seek help when needed.`,
    link: 'https://www.mentalhealth.gov/basics/what-is-mental-health',
    color: '#81C784', // Green
  },
  {
    title: 'The Importance of Sleep for Mental Health',
    description: `Sleep plays a vital role in mental health. It helps your brain function properly, improve memory, and regulate mood. Lack of sleep, or poor-quality sleep, can lead to problems like irritability, poor concentration, and emotional instability. Over time, sleep deprivation can contribute to mental health issues such as anxiety and depression. It is essential to practice good sleep hygiene, such as maintaining a regular sleep schedule and creating a comfortable sleep environment.`,
    link: 'https://www.sleepfoundation.org/mental-health',
    color: '#64B5F6', // Blue
  },
  {
    title: 'How to Deal with Anxiety',
    description: `Anxiety is a feeling of unease or worry about future events or situations. It's normal to feel anxious from time to time, but chronic anxiety can interfere with daily activities and overall well-being. Coping with anxiety involves recognizing when it’s becoming overwhelming and taking steps to manage it. Relaxation techniques such as deep breathing, mindfulness, and progressive muscle relaxation can help reduce anxiety. If anxiety becomes severe, it's important to seek professional help.`,
    link: 'https://www.psychologytoday.com/us/basics/anxiety',
    color: '#E1BEE7', 
  },
  {
    title: 'How Physical Activity Improves Mental Health',
    description: `Exercise is not only good for your body, but it's also beneficial for your mental health. Physical activity releases endorphins, chemicals in the brain that act as natural painkillers and mood elevators. Regular exercise can reduce symptoms of depression and anxiety. Activities like walking, running, swimming, and yoga can all contribute to better mental well-being. Staying active is an essential component of maintaining both mental and physical health.`,
    link: 'https://www.mentalhealth.org.uk/a-to-z/p/physical-activity',
    color: '#9C27B0', // Purple
  },
  {
    title: 'How to Manage Stress in the Workplace',
    description: `Workplace stress is a common issue that can affect your productivity and overall well-being. It's important to recognize stressors at work and address them early. Simple steps such as prioritizing tasks, taking regular breaks, and seeking support from coworkers or supervisors can help reduce stress. Additionally, practicing relaxation techniques and maintaining a healthy work-life balance are essential to manage workplace stress effectively.`,
    link: 'https://www.verywellmind.com/how-to-manage-workplace-stress-3144610',
    color: '#FFCC80', // Light Orange
  },
  {
    title: 'What is Depression and How Can You Manage It?',
    description: `Depression is a common but serious mood disorder that affects your feelings, thoughts, and behaviors. It can lead to a variety of emotional and physical problems, making it difficult to carry out everyday tasks. Depression can be triggered by life events, genetics, or other factors. Symptoms of depression include persistent sadness, loss of interest in activities, and difficulty concentrating. It’s essential to seek professional help, practice self-care, and engage in activities that promote emotional well-being.`,
    link: 'https://www.nimh.nih.gov/health/topics/depression',
    color: '#81D4FA', // Light Blue
  },
  {
    title: 'Dealing with Post-Traumatic Stress Disorder (PTSD)',
    description: `PTSD can occur after someone has experienced or witnessed a traumatic event, such as a car accident, combat, or sexual assault. Symptoms include flashbacks, nightmares, and emotional numbness. PTSD can significantly impact a person's quality of life, but there are effective treatments available. Therapy, medication, and support groups are all useful tools in helping individuals manage PTSD. Reaching out for support and professional treatment is the first step toward recovery.`,
    link: 'https://www.mentalhealth.org.uk/a-to-z/p/ptsd',
    color: '#FF8A80', // Light Red
  },
  {
    title: 'The Role of Nutrition in Mental Health',
    description: `Nutrition plays a critical role in maintaining mental health. Eating a balanced diet rich in vitamins, minerals, and omega-3 fatty acids can improve brain function, boost mood, and reduce symptoms of anxiety and depression. A healthy diet contributes to better sleep, energy levels, and overall well-being. Foods such as leafy greens, fatty fish, nuts, and whole grains are particularly beneficial for mental health. It’s essential to make mindful eating choices to support both physical and mental health.`,
    link: 'https://www.psychologytoday.com/us/blog/urban-survival/201705/the-role-of-nutrition-in-mental-health',
    color: '#C5E1A5', // Light Green
  },
  {
    title: 'The Power of Meditation for Mental Clarity',
    description: `Meditation is a practice that involves focusing the mind to achieve a state of calm and clarity. It has been shown to reduce stress, improve focus, and promote emotional balance. Regular meditation can also help reduce symptoms of anxiety and depression. There are many types of meditation, including mindfulness meditation, guided meditation, and transcendental meditation. Incorporating meditation into your daily routine can have profound benefits for your mental health.`,
    link: 'https://www.headspace.com/meditation/benefits',
    color: '#FFEB3B', // Yellow
  },
  {
    title: 'How to Build Resilience to Overcome Adversity',
    description: `Resilience is the ability to bounce back from difficult situations and adversity. It is a key component of mental health and well-being. Building resilience involves developing a positive mindset, learning how to manage stress, and seeking support from others when necessary. Resilient individuals are able to navigate challenges with strength and maintain their emotional balance. Practices like gratitude, mindfulness, and problem-solving can help enhance resilience.`,
    link: 'https://www.psychologytoday.com/us/basics/resilience',
    color: '#E1BEE7', // Light Purple
  },
  {
    title: 'The Impact of Social Media on Mental Health',
    description: `Social media is a double-edged sword for mental health. While it connects people, fosters communication, and provides information, excessive use can contribute to anxiety, depression, and low self-esteem. Constant comparison to others on social media can negatively impact one's body image and overall well-being. To maintain good mental health, it's essential to use social media in moderation, set boundaries, and be mindful of the content you engage with.`,
    link: 'https://www.psychologytoday.com/us/blog/mental-health-the-digital-age/201809/how-social-media-affects-mental-health',
    color: '#FFB74D', // Light Orange
  },
];

const MentalHealthEducation = () => {
  return (
    <div className="education-container">
      <h2 className="education-title">Mental Health Education</h2>
      <p className="education-description">
        Explore the basics of mental health, stress, and anxiety management, along with practical tips on improving overall well-being. These articles provide a solid foundation for understanding key mental health topics, along with links to further resources.
      </p>
      <div className="article-cards">
        {articles.map((article, index) => (
          <div
            key={index}
            className="article-card"
            style={{ backgroundColor: article.color }}
          >
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="read-more-link">
              Read Full Article
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentalHealthEducation;
