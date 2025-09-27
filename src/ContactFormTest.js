import React, { useState } from 'react'

export default function ContactFormTest({ endpoint = '/api/contact', className = '' }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function validate() {
    if (name.trim().length < 2) return 'Te rog introdu un nume valid.'
    if (!/^\+?[0-9\s-]{7,15}$/.test(phone)) return 'Te rog introdu un număr de telefon valid.'
    if (!emailRegex.test(email)) return 'Te rog introdu o adresă de email validă.'
    if (message.trim().length < 5) return 'Mesajul trebuie să aibă cel puțin 5 caractere.'
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    try {
      const payload = { name, phone, email, message }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Eroare la trimitere. Încearcă din nou.')

      setSuccess('Mesajul a fost trimis cu succes!')
      setName('')
      setPhone('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`max-w-md mx-auto p-4 bg-white rounded-xl shadow ${className}`}>
      <h2 className="text-xl font-semibold mb-4">Contact</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-3">
          <span className="text-sm">Nume</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border rounded p-2"
            required
          />
        </label>

        <label className="block mb-3">
          <span className="text-sm">Telefon</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full border rounded p-2"
            required
          />
        </label>

        <label className="block mb-3">
          <span className="text-sm">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border rounded p-2"
            required
          />
        </label>

        <label className="block mb-3">
          <span className="text-sm">Mesaj</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 w-full border rounded p-2 min-h-[100px]"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? 'Se trimite...' : 'Trimite'}
        </button>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-3 text-sm text-green-600">{success}</p>}
      </form>
    </div>
  )
}

