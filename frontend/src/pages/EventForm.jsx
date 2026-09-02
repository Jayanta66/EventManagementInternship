import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getEvent, saveEvent, SERVER_BASE } from '../api'

const initial = {
  title: '',
  description: '',
  eventDate: '',
  location: '',
  image: null
}

export default function EventForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const editing = Boolean(id)
  const [form, setForm] = useState(initial)
  const [existingImage, setExistingImage] = useState('')
  const [preview, setPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!editing) return
    getEvent(id)
      .then(event => {
        setForm({
          title: event.title || '',
          description: event.description || '',
          eventDate: event.eventDate || '',
          location: event.location || '',
          image: null
        })
        setExistingImage(event.imageUrl || '')
      })
      .catch(e => setError(e.message))
  }, [editing, id])

  const change = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const chooseImage = e => {
    const file = e.target.files?.[0] || null
    setForm(prev => ({ ...prev, image: file }))
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
    } else {
      setPreview('')
    }
  }

  const submit = async e => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await saveEvent(form, id)
      navigate('/events')
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const displayedImage = preview || (existingImage ? `${SERVER_BASE}${existingImage}` : '')

  return (
    <section className="form-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">EVENT FORM</p>
          <h1>{editing ? 'Update event' : 'Create event'}</h1>
        </div>
        <Link className="button secondary" to="/events">Back to Events</Link>
      </div>

      {error && <div className="alert error">{error}</div>}

      <form className="form-card" onSubmit={submit}>
        <label>
          Event title
          <input name="title" value={form.title} onChange={change} required maxLength={150} placeholder="Type here ..." />
        </label>

        <div className="two-col">
          <label>
            Event date
            <input type="date" name="eventDate" value={form.eventDate} onChange={change} required />
          </label>
          <label>
            Location
            <input name="location" value={form.location} onChange={change} required maxLength={200} placeholder="City / venue" />
          </label>
        </div>

        <label>
          Description
          <textarea name="description" value={form.description} onChange={change} rows="5" placeholder="Describe the event…" />
        </label>

        <label>
          Event picture
          <input type="file" accept="image/*" onChange={chooseImage} />
          <span className="hint">Image files only, up to 5 MB.</span>
        </label>

        {displayedImage && (
          <div className="preview">
            <p>Image preview</p>
            <img src={displayedImage} alt="Selected event preview" />
          </div>
        )}

        <div className="form-actions">
          <Link className="button secondary" to="/events">Cancel</Link>
          <button className="button primary" disabled={saving}>
            {saving ? 'Saving…' : editing ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>
    </section>
  )
}
