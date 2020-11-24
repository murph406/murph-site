import React from 'react';

function HomeHero() {
  return (
    <div>
      <div className="hero">
        <div className="flex">
          <div className="flex-item">
            <div className="container">
              <div className="face">
              </div>
              {/* Insert A Pic of Myself Here  */}
              <div className="hero-details">
                <h1>Hello, I'm Ryan.</h1>
                <p>A passionate software developer with experience taking projects from concept to completion, and leading in small cross-functional teams through the development process.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHero;