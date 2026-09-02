import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteEvent, getEvents, SERVER_BASE } from '../api'

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      setError('')
      setEvents(await getEvents())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const remove = async (id) => {
    if (!window.confirm('Delete this event?')) return
    try {
      await deleteEvent(id)
      await load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <p className="status">Loading events…</p>

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">EVENTS</p>
          <h1>Events List</h1>
        </div>
        <Link className="button primary" to="/events/new">+ Add Event</Link>
      </div>

      {error && <div className="alert error">{error}</div>}

      {events.length === 0 ? (
        <div className="empty">
          <h3>No events yet</h3>
          <p>Create your first event with an image.</p>
        </div>
      ) : (
        <div className="grid">
          {events.map(event => (
            <article className="card" key={event.id}>
              {event.imageUrl ? (
                <img className="event-image" src={`${SERVER_BASE}${event.imageUrl}`} alt={event.title} />
              ) : (
                <div className="event-image placeholder">📷<span>No image</span></div>
              )}
              <div className="card-body">
                <div className="date">{event.eventDate}</div>
                <h2>{event.title}</h2>
                <p className="location">📍 {event.location}</p>
                <p>{event.description || 'No description provided.'}</p>
                <div className="card-actions">
                  <Link className="button small secondary" to={`/events/${event.id}/edit`}>Edit</Link>
                  <button className="button small danger" onClick={() => remove(event.id)}>Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
