import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <NavLink className="brand" to="/">Full Stack Event Feedback Management System</NavLink>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/events/new">Create Event</NavLink>
          <NavLink to="/FeedbackForm">Feedback Form</NavLink>
          <NavLink to="/feedback">Feedback</NavLink>

        </nav>
      </div>
    </header>
  )
}
