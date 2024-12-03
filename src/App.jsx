import { useState } from 'react'
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
      <h1>CogniVR</h1>
      <h2>Enhance Your Cognitive Health Through Virtual Reality</h2>
      
      <div className="description">
        <p>Join our waitlist for an innovative VR application designed for adults 65+ 
          to improve cognitive function from the comfort of home.</p>
        <p>Be the first to know when we launch!</p>
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
            Join Waitlist
          </button>
        </form>
      ) : (
        <div className="success-message">
          <h3>Thank you for joining our waitlist!</h3>
          <p>We'll keep you updated on our launch.</p>
        </div>
      )}
    </div>
  )
}

export default App
