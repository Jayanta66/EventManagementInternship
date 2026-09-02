import { useEffect, useState } from 'react'
import { getFeedback, submitFeedback } from '../api'

const initial = { name: '', email: '', message: '' }

export default function Feedback() {
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
        <div>
          <h2>Recent feedback</h2>
          <div className="feedback-list">
            {items.length === 0 && <div className="empty">No feedback submitted yet.</div>}
            {items.map(item => (
              <article className="feedback-item" key={item.id}>
                <div className="feedback-top">
                  <strong>{item.name}</strong>
                  <span>{item.submittedAt ? new Date(item.submittedAt).toLocaleString() : ''}</span>
                </div>
                <small>{item.email}</small>
                <p>{item.message}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
