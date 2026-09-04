import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';


export default function Home() {

  const [message, setMessage] = useState('');
    useEffect(() => {
      
    fetch('https://fullstack-web-app-developed-by-jayanta-db.joyjagatbondu.com/api/events/welcome')
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  return (
    <section className="hero">




      <div>
                      <h1 >Message from Backend: <strong>{message || 'Loading...'}</strong></h1>

        <p className="eyebrow">Full Stack Event Feedback Management System</p>
        <h1>Full Stack Development Task List</h1>

                              <p className="lead">Message from Backend: <strong>{message || 'Loading...'}</strong></p>

        <div className="actions">
          <Link className="button primary" to="/events">Browse Events</Link>
          <Link className="button secondary" to="/events/new">Create an Event</Link>
        </div>
      </div>
      <div className="hero-card">
        <div className="hero-icon">📅</div>
        <h3>Full Stack Development Task List</h3>
        <p>Full Stack Event Feedback Management System</p>
      </div>

 

    </section>
  )
}
