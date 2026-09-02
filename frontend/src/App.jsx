import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Events from './pages/Events'
import EventForm from './pages/EventForm'
import Feedback from './pages/Feedback'
import FeedbackForm from './pages/FeedbackForm'




export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/new" element={<EventForm />} />
          <Route path="/events/:id/edit" element={<EventForm />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/FeedbackForm" element={<FeedbackForm />} />

        </Routes>
      </main>
      <footer>Full Stack Event Feedback Management System</footer>
    </>
  )
}
