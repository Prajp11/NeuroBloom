import React from "react";
import { Link } from "react-router-dom";

const Games = () => {
  return (
    <div className="games-page">
      <div className="games-container">
        {/* Hero Section */}
        <div className="games-hero">
          <div className="games-hero-icon">🎮</div>
          <h2>Interactive Stress Relief Games</h2>
          <p>
            Discover engaging therapeutic games designed to reduce stress, improve focus, 
            and boost your mental well-being through fun, interactive experiences.
          </p>
          <div className="games-motivation">
            <span>🎯</span>
            <span>Play your way to better mental health</span>
          </div>
        </div>

        {/* Games Grid */}
        <div className="games-grid">
          <Link to="/stress-relief/games/balloonpop" className="game-card balloon-card">
            <div className="game-icon">🎈</div>
            <div className="game-content">
              <h3>Balloon Pop</h3>
              <p>
                Pop colorful balloons in this delightful stress-relief game that helps 
                release tension and brings instant joy through satisfying interactions.
              </p>
              <div className="game-benefits">
                <span className="game-benefit-tag">Stress Relief</span>
                <span className="game-benefit-tag">Hand-Eye Coordination</span>
                <span className="game-benefit-tag">Instant Joy</span>
              </div>
              <button className="game-play-btn">Start Popping</button>
            </div>
          </Link>

          <Link to="/stress-relief/games/memory" className="game-card memory-card">
            <div className="game-icon">🧠</div>
            <div className="game-content">
              <h3>Memory Match</h3>
              <p>
                Challenge your cognitive abilities with this memory-enhancing game that 
                improves focus, concentration, and mental agility through pattern matching.
              </p>
              <div className="game-benefits">
                <span className="game-benefit-tag">Memory Boost</span>
                <span className="game-benefit-tag">Focus Training</span>
                <span className="game-benefit-tag">Brain Exercise</span>
              </div>
              <button className="game-play-btn">Train Memory</button>
            </div>
          </Link>

          <Link to="/stress-relief/games/wordflowpuzzle" className="game-card wordflow-card">
            <div className="game-icon">🧩</div>
            <div className="game-content">
              <h3>Word Flow Puzzle</h3>
              <p>
                Enhance your vocabulary and mental flexibility with engaging word puzzles 
                that promote creative thinking and linguistic problem-solving skills.
              </p>
              <div className="game-benefits">
                <span className="game-benefit-tag">Vocabulary</span>
                <span className="game-benefit-tag">Mental Flexibility</span>
                <span className="game-benefit-tag">Problem Solving</span>
              </div>
              <button className="game-play-btn">Solve Puzzles</button>
            </div>
          </Link>

          <Link to="/stress-relief/games/wordscramble" className="game-card wordscramble-card">
            <div className="game-icon">🔤</div>
            <div className="game-content">
              <h3>Word Scrambler</h3>
              <p>
                Unscramble letters to form words in this brain-teasing game that sharpens 
                cognitive skills while providing relaxing mental stimulation.
              </p>
              <div className="game-benefits">
                <span className="game-benefit-tag">Word Skills</span>
                <span className="game-benefit-tag">Pattern Recognition</span>
                <span className="game-benefit-tag">Mental Agility</span>
              </div>
              <button className="game-play-btn">Unscramble Words</button>
            </div>
          </Link>

          <Link to="/stress-relief/games/doodlecanvas" className="game-card doodle-card">
            <div className="game-icon">🖌️</div>
            <div className="game-content">
              <h3>Doodle Canvas</h3>
              <p>
                Express your creativity and release stress through digital art. This 
                therapeutic drawing experience promotes mindfulness and emotional release.
              </p>
              <div className="game-benefits">
                <span className="game-benefit-tag">Creative Expression</span>
                <span className="game-benefit-tag">Mindfulness</span>
                <span className="game-benefit-tag">Emotional Release</span>
              </div>
              <button className="game-play-btn">Start Drawing</button>
            </div>
          </Link>

          <Link to="/stress-relief/games/bubblepop" className="game-card bubble-card">
            <div className="game-icon">🫧</div>
            <div className="game-content">
              <h3>Bubble Pop</h3>
              <p>
                Enjoy the satisfying sensation of popping bubbles in this calming game 
                that provides instant stress relief and promotes a sense of tranquility.
              </p>
              <div className="game-benefits">
                <span className="game-benefit-tag">Instant Calm</span>
                <span className="game-benefit-tag">Satisfying Feel</span>
                <span className="game-benefit-tag">Stress Reduction</span>
              </div>
              <button className="game-play-btn">Pop Bubbles</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Games;
