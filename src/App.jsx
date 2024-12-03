import { useState } from 'react'
import { FaVrCardboard } from 'react-icons/fa'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter an email address')
      return
    }

    try {
      const response = await fetch('https://logtodatabase-rgzyvy3rca-uc.a.run.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "Bhoomika",
          content: email
        })
      })

      if (response.ok) {
        setSubmitted(true)
        setError('')
      } else {
        setError('Failed to submit. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Error:', err)
    }
  }

  return (
    <div className="waitlist-container">
      <div className="logo-section">
        <FaVrCardboard className="vr-icon" />
        <h1>CogniVR</h1>
      </div>
      
      <h2>Enhance Cognitive Wellness with Virtual Reality</h2>
      <p className="subtitle">A cutting-edge VR app designed to boost memory, focus, and mental agility for seniors.</p>
      
      <div className="info-sections-container">
        <div className="features-section">
          <h3>Features</h3>
          <ul className="features-list">
            <li><strong>Interactive Games</strong></li>
            <li><strong>Therapeutic Environments</strong></li>
            <li><strong>User-Friendly Interface</strong></li>
            <li><strong>Multiplayer Options</strong></li>
          </ul>
        </div>

        <div className="benefits-section">
          <h3>Why Choose CogniVR?</h3>
          <ul className="benefits-list">
            <li><strong>Improve Memory and Attention</strong></li>
            <li><strong>Reduce Stress and Anxiety</strong></li>
            <li><strong>Enhance Social Interaction</strong></li>
            <li><strong>Personalized Experience</strong></li>
          </ul>
        </div>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="email-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="email-input"
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="submit-button">
            Join Our Early Access List
          </button>
        </form>
      ) : (
        <div className="success-message">
          <h3>Thank you for joining our early access list!</h3>
          <p>We'll keep you updated on our launch and special offers for early adopters.</p>
        </div>
      )}
    </div>
  )
}

export default App
