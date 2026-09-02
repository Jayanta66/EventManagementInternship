import { useEffect, useState } from 'react'
import { getFeedback, submitFeedback } from '../api'

const initial = { name: '', email: '', message: '' }

export default function FeedbackForm() {
  const [form, setForm] = useState(initial)
  const [items, setItems] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const load = () => getFeedback().then(setItems).catch(e => setError(e.message))
  useEffect(() => { load() }, [])

  const change = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setMessage('')
    setError('')
    try {
      await submitFeedback(form)
      setForm(initial)
      setMessage('Thank you! Your feedback was submitted.')
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">FEEDBACK</p>
          <h1>Tell us what you think</h1>
        </div>
      </div>

      <div className="feedback-layout">
        <form className="form-card" onSubmit={submit}>
          <h2>Submit feedback</h2>

          {message && <div className="alert success">{message}</div>}
          {error && <div className="alert error">{error}</div>}

          <label>
            Name
            <input name="name" value={form.name} onChange={change} required maxLength={100} />
          </label>

          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={change} required maxLength={180} />
          </label>

          <label>
            Message
            <textarea name="message" value={form.message} onChange={change} rows="6" required placeholder="Share your experience…" />
          </label>

          <button className="button primary">Submit Feedback</button>
        </form>


      </div>
    </section>
  )
}
