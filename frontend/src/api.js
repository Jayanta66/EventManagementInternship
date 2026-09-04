

const API_BASE = 'https://fullstack-web-app-developed-by-jayanta-db.joyjagatbondu.com/api'
export const SERVER_BASE = 'https://fullstack-web-app-developed-by-jayanta-db.joyjagatbondu.com'


async function request(url, options = {}) {
  const response = await fetch(`${API_BASE}${url}`, options)
  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || `Request failed (${response.status})`)
  }
  if (response.status === 204) return null
  return response.json()
}

export const getEvents = () => request('/events')
export const getEvent = (id) => request(`/events/${id}`)
export const deleteEvent = (id) => request(`/events/${id}`, { method: 'DELETE' })

export async function saveEvent(data, id) {
  const form = new FormData()
  form.append('title', data.title)
  form.append('description', data.description || '')
  form.append('eventDate', data.eventDate)
  form.append('location', data.location)
  if (data.image) form.append('image', data.image)

  return request(id ? `/events/${id}` : '/events', {
    method: id ? 'PUT' : 'POST',
    body: form
  })
}

export const getFeedback = () => request('/feedback')

export const submitFeedback = (data) => request('/feedback', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
