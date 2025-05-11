'use client'

import { useState } from 'react'

const departamentos = [
  'Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca',
  'Callao', 'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad',
  'Lambayeque', 'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco',
  'Piura', 'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali'
]

export default function ParticiparPage() {
  const [form, setForm] = useState({
    dni: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    departamento: '',
    cantidad: 1
  })

  const [loading, setLoading] = useState(false)
  const [tickets, setTickets] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: name === 'cantidad' ? Number(value) : value })
  }

  const modificarCantidad = (delta: number) => {
    setForm(prev => ({ ...prev, cantidad: Math.max(1, prev.cantidad + delta) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setTickets([])

    try {
      const res = await fetch('/api/participantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error)
      setTickets(data.participante.tickets.map((t: any) => t.codigo))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Participa en el Sorteo 🎁</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded-lg">
        <div className="grid grid-cols-1 gap-4">
          <input type="text" name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} required className="input" />
          <input type="text" name="nombres" placeholder="Nombres" value={form.nombres} onChange={handleChange} required className="input" />
          <input type="text" name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} required className="input" />
          <input type="text" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required className="input" />
          <input type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} required className="input" />

          <select name="departamento" value={form.departamento} onChange={handleChange} required className="input">
            <option value="">Selecciona tu departamento</option>
            {departamentos.map(dep => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>

          <div className="flex items-center gap-4">
            <span className="font-medium">Tickets:</span>
            <button type="button" onClick={() => modificarCantidad(-1)} className="px-3 py-1 bg-gray-200 rounded">-</button>
            <span className="w-8 text-center">{form.cantidad}</span>
            <button type="button" onClick={() => modificarCantidad(1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
            <span className="ml-auto font-semibold">Total: S/ {form.cantidad * 50}</span>
          </div>

          <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            {loading ? 'Procesando...' : 'Comprar y Participar'}
          </button>

          {error && <p className="text-red-600">{error}</p>}
        </div>
      </form>

      {tickets.length > 0 && (
        <div className="mt-6 bg-green-100 border border-green-400 p-4 rounded">
          <h2 className="text-lg font-bold mb-2">🎉 ¡Tus Códigos de Ticket!</h2>
          <ul className="list-disc pl-6">
            {tickets.map((codigo, i) => (
              <li key={i} className="font-mono">{codigo}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}
