import React, { useState } from 'react';
import { FaBrain, FaHeart, FaLightbulb, FaRegSmile, FaCheck, FaPen, FaStar, FaClock, FaExclamationTriangle } from 'react-icons/fa';

const CBTJournal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [gratitudes, setGratitudes] = useState(['']);
  const [mood, setMood] = useState('');
  const [time, setTime] = useState('');
  const [trigger, setTrigger] = useState('');
  const [thought, setThought] = useState('');
  const [reframedThought, setReframedThought] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleGratitudeChange = (index, value) => {
    const newGratitudes = [...gratitudes];
    newGratitudes[index] = value;
    setGratitudes(newGratitudes);
  };

  const addGratitude = () => {
    if (gratitudes.length < 5) {
      setGratitudes([...gratitudes, '']);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const resetJournal = () => {
    setGratitudes(['']);
    setMood('');
    setTime('');
    setTrigger('');
    setThought('');
    setReframedThought('');
    setSubmitted(false);
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const moodOptions = [
    { value: 'very-happy', label: 'Very Happy', emoji: '😄', color: '#4CAF50' },
    { value: 'happy', label: 'Happy', emoji: '😊', color: '#66BB6A' },
    { value: 'content', label: 'Content', emoji: '😌', color: '#81C784' },
    { value: 'neutral', label: 'Neutral', emoji: '😐', color: '#FFC107' },
    { value: 'anxious', label: 'Anxious', emoji: '😰', color: '#9C27B0' },
    { value: 'sad', label: 'Sad', emoji: '😢', color: '#FF9800' },
    { value: 'angry', label: 'Angry', emoji: '😠', color: '#E91E63' },
    { value: 'overwhelmed', label: 'Overwhelmed', emoji: '😵‍💫', color: '#F44336' }
  ];

  if (submitted) {
    return (
      <div className="cbt-page">
        <div className="cbt-container">
          <div className="cbt-results">
            <h3>
              <span className="cbt-results-icon">🎉</span>
              Journal Entry Completed Successfully!
            </h3>
            
            <div className="cbt-results-content">
              <div className="cbt-results-item">
                <div className="cbt-results-label">
                  <FaStar /> Entry Details
                </div>
                <div className="cbt-results-value">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at {time || 'Current time'}
                </div>
              </div>

              <div className="cbt-results-item">
                <div className="cbt-results-label">
                  <FaHeart /> Gratitude List
                </div>
                <div className="cbt-results-value">
                  <ul className="cbt-gratitude-list">
                    {gratitudes.filter(Boolean).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="cbt-results-item">
                <div className="cbt-results-label">
                  <FaRegSmile /> Mood & Context
                </div>
                <div className="cbt-results-value">
                  <strong>Mood:</strong> {moodOptions.find(m => m.value === mood)?.emoji} {mood || 'Not specified'}<br/>
                  <strong>Trigger:</strong> {trigger || 'None identified'}
                </div>
              </div>

              <div className="cbt-results-item">
                <div className="cbt-results-label">
                  <FaBrain /> Thought Challenge
                </div>
                <div className="cbt-results-value">
                  <strong>Original Thought:</strong><br/>
                  {thought}<br/><br/>
                  <strong>Reframed Thought:</strong><br/>
                  {reframedThought}
                </div>
              </div>
            </div>

            <button onClick={resetJournal} className="cbt-btn">
              <FaPen /> Create New Entry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cbt-page">
      <div className="cbt-container">
        {/* Hero Section */}
        <div className="cbt-hero">
          <div className="cbt-hero-icon">
            <FaBrain />
          </div>
          <h1 className="cbt-title">CBT Journal</h1>
          <p className="cbt-subtitle">
            Cognitive Behavioral Therapy techniques to help you process emotions, practice gratitude, 
            and reframe negative thoughts. Take a mindful journey through structured self-reflection.
          </p>
          <div className="cbt-motivation">
            <FaHeart />
            <span>Building Resilience One Thought at a Time</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="cbt-progress">
          <div className={`cbt-progress-step ${currentStep >= 1 ? 'active' : 'inactive'}`}>
            <FaHeart />
          </div>
          <div className={`cbt-progress-line ${currentStep > 1 ? 'completed' : ''}`}></div>
          <div className={`cbt-progress-step ${currentStep >= 2 ? 'active' : 'inactive'}`}>
            <FaRegSmile />
          </div>
          <div className={`cbt-progress-line ${currentStep > 2 ? 'completed' : ''}`}></div>
          <div className={`cbt-progress-step ${currentStep >= 3 ? 'active' : 'inactive'}`}>
            <FaBrain />
          </div>
        </div>

        {/* Journal Container */}
        <div className="cbt-journal-container">
          {/* Step 1: Gratitude Practice */}
          {currentStep === 1 && (
            <div className="cbt-section">
              <h3>
                <span className="cbt-section-icon">🌟</span>
                Gratitude Journal
              </h3>
              <p style={{ marginBottom: '25px', color: '#666', fontSize: '1.1rem', lineHeight: '1.6' }}>
                Begin with gratitude. Research shows that regularly practicing gratitude can improve mood, 
                reduce stress, and enhance overall well-being. What positive aspects of your life can you acknowledge today?
              </p>
              
              {gratitudes.map((item, index) => (
                <div key={index} className="gratitude-item">
                  <input
                    type="text"
                    className="cbt-input"
                    placeholder={`What are you grateful for? (Item ${index + 1})`}
                    value={item}
                    onChange={(e) => handleGratitudeChange(index, e.target.value)}
                  />
                </div>
              ))}
              
              {gratitudes.length < 5 && (
                <button onClick={addGratitude} className="cbt-btn add-gratitude-btn">
                  <FaHeart /> Add Another Blessing
                </button>
              )}
              
              <div style={{ marginTop: '30px', textAlign: 'right' }}>
                <button 
                  onClick={nextStep} 
                  className="cbt-btn"
                  disabled={gratitudes.filter(item => item.trim() !== '').length === 0}
                >
                  Next: Mood Diary <FaRegSmile />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Mood Diary */}
          {currentStep === 2 && (
            <div className="cbt-section">
              <h3>
                <span className="cbt-section-icon">📔</span>
                Mood Diary
              </h3>
              <p style={{ marginBottom: '25px', color: '#666', fontSize: '1.1rem', lineHeight: '1.6' }}>
                Track your emotional state and identify patterns. Understanding your moods and their triggers 
                is essential for developing emotional regulation skills.
              </p>
              
              <div style={{ marginBottom: '25px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '10px', 
                  fontWeight: '700', 
                  color: '#2c3e50',
                  fontSize: '1.1rem'
                }}>
                  <FaRegSmile /> How are you feeling right now?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                  {moodOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => setMood(option.value)}
                      style={{
                        padding: '15px 10px',
                        border: `3px solid ${mood === option.value ? option.color : '#e0e6ed'}`,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        backgroundColor: mood === option.value ? `${option.color}15` : 'white',
                        transform: mood === option.value ? 'translateY(-2px)' : 'none',
                        boxShadow: mood === option.value ? `0 6px 20px ${option.color}30` : '0 2px 8px rgba(0,0,0,0.05)'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '5px' }}>
                        {option.emoji}
                      </div>
                      <div style={{ 
                        fontWeight: '600', 
                        color: mood === option.value ? option.color : '#2c3e50',
                        fontSize: '0.9rem'
                      }}>
                        {option.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '10px', 
                  fontWeight: '700', 
                  color: '#2c3e50',
                  fontSize: '1.1rem'
                }}>
                  <FaClock /> What time did you notice this mood?
                </label>
                <input
                  type="time"
                  className="cbt-time-input"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '10px', 
                  fontWeight: '700', 
                  color: '#2c3e50',
                  fontSize: '1.1rem'
                }}>
                  <FaExclamationTriangle /> What triggered this mood?
                </label>
                <input
                  type="text"
                  className="cbt-input"
                  placeholder="Describe the situation, event, or thought that influenced your mood..."
                  value={trigger}
                  onChange={(e) => setTrigger(e.target.value)}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
                <button onClick={prevStep} className="cbt-btn cbt-btn-secondary">
                  ← Back to Gratitude
                </button>
                <button 
                  onClick={nextStep} 
                  className="cbt-btn"
                  disabled={!mood}
                >
                  Next: Thought Challenge <FaBrain />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Thought Challenge */}
          {currentStep === 3 && (
            <div className="cbt-section">
              <h3>
                <span className="cbt-section-icon">💡</span>
                Daily Thought Challenge
              </h3>
              <p style={{ marginBottom: '25px', color: '#666', fontSize: '1.1rem', lineHeight: '1.6' }}>
                Challenge unhelpful thinking patterns through cognitive restructuring. Identify negative thoughts 
                and practice reframing them with more balanced, realistic perspectives.
              </p>
              
              <div style={{ marginBottom: '25px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '10px', 
                  fontWeight: '700', 
                  color: '#2c3e50',
                  fontSize: '1.1rem'
                }}>
                  <FaPen /> Write down one unhelpful thought
                </label>
                <textarea
                  className="cbt-textarea"
                  placeholder="What negative or unhelpful thought have you been having? (e.g., 'I always mess things up', 'I'm not good enough', 'Things will never get better')"
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                />
              </div>
              
              <div style={{ marginBottom: '30px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '10px', 
                  fontWeight: '700', 
                  color: '#2c3e50',
                  fontSize: '1.1rem'
                }}>
                  <FaLightbulb /> Now reframe it positively
                </label>
                <textarea
                  className="cbt-textarea"
                  placeholder="Challenge and reframe your thought: Is this thought realistic? What evidence contradicts it? How would you advise a friend? What's a more balanced perspective?"
                  value={reframedThought}
                  onChange={(e) => setReframedThought(e.target.value)}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
                <button onClick={prevStep} className="cbt-btn cbt-btn-secondary">
                  ← Back to Mood Diary
                </button>
                <button 
                  onClick={handleSubmit}
                  className="cbt-btn"
                  disabled={!thought.trim() || !reframedThought.trim()}
                >
                  <FaCheck /> Complete Journal Entry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CBTJournal;