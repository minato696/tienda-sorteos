// app/components/client/participar/ParticiparForm.tsx completo
'use client';

import { useState, useEffect } from 'react';

export default function ParticiparForm() {
  // Sorteo fijo con precio de 50 soles
  const sorteo = {
    id: 1,
    titulo: "Gran Sorteo - Auto BMW Serie 3 2025",
    descripcion: "Participa en nuestro sorteo mensual y llévate un increíble auto 0KM. ¡Tus sueños están a un ticket de distancia!",
    fechaSorteo: new Date("2025-06-15"),
    precio: 50.00
  };

  const [cantidad, setCantidad] = useState(1);
  const [total, setTotal] = useState(sorteo.precio);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    departamento: 'Lima'
  });

  // Actualizar el total cuando cambia la cantidad
  useEffect(() => {
    const nuevoTotal = sorteo.precio * cantidad;
    setTotal(nuevoTotal);
  }, [cantidad]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const incrementCantidad = () => {
    if (cantidad < 10) setCantidad(cantidad + 1);
  };

  const decrementCantidad = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Mostrar un estado de carga
      setLoading(true);
      
      // Preparar los datos para enviar
      const datosParaEnviar = {
        ...formData,
        sorteoId: sorteo.id,
        cantidad,
        total: total
      };
      
      console.log('Enviando datos al backend:', datosParaEnviar);
      
      // Enviar datos al endpoint de la API
      const response = await fetch('/api/participar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosParaEnviar)
      });
      
      // Procesar la respuesta
      if (response.ok) {
        const resultado = await response.json();
        console.log('Respuesta del servidor:', resultado);
        
        // Mostrar mensaje de éxito
        setMensaje({
          tipo: 'exito',
          texto: '¡Tu participación se ha registrado correctamente! Redirigiendo al pago...'
        });
        
        // Redirigir a la página de pago después de 2 segundos
        setTimeout(() => {
          window.location.href = `/pago?referencia=${resultado.referencia}`;
        }, 2000);
      } else {
        const error = await response.json();
        console.error('Error en la respuesta:', error);
        
        // Mostrar mensaje de error
        setMensaje({
          tipo: 'error',
          texto: error.mensaje || 'Ha ocurrido un error al procesar tu solicitud. Inténtalo de nuevo.'
        });
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      
      // Mostrar mensaje de error
      setMensaje({
        tipo: 'error',
        texto: 'No se pudo conectar con el servidor. Verifica tu conexión e inténtalo nuevamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const departamentos = [
    'Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca',
    'Callao', 'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín',
    'La Libertad', 'Lambayeque', 'Lima', 'Loreto', 'Madre de Dios',
    'Moquegua', 'Pasco', 'Piura', 'Puno', 'San Martín', 'Tacna',
    'Tumbes', 'Ucayali'
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 text-[#1a2a63]">Participa en Nuestros Sorteos</h1>
          <p className="text-xl text-gray-600">Completa el formulario y empieza a soñar con tu premio</p>
        </div>
        
        {mensaje.texto && (
          <div className={`max-w-6xl mx-auto mb-6 p-4 rounded-lg ${
            mensaje.tipo === 'exito' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {mensaje.texto}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Información del sorteo */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-[#1a2a63] text-white p-4">
              <h2 className="text-2xl font-bold">
                <span className="text-white">Sorteos</span>
                <span className="text-[#ffc107]">Premium</span>
              </h2>
              <p className="mt-1">Próximo sorteo: {new Date(sorteo.fechaSorteo).toLocaleDateString()}</p>
            </div>
            
            <div className="p-6">
              <div className="flex justify-center mb-6 relative">
                <div className="bg-gray-200 w-full h-60 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Imagen del premio</span>
                </div>
                <div className="absolute top-3 right-3 bg-[#1a337b] text-white px-3 py-1 rounded-full">
                  S/ {sorteo.precio}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#1a2a63] mb-2">{sorteo.titulo}</h3>
                <p className="text-gray-700">{sorteo.descripcion}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Precio por ticket:</span>
                  <span className="text-xl font-bold text-[#1a2a63]">S/ {sorteo.precio.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Total a pagar:</span>
                  <span className="text-2xl font-bold text-[#1a2a63]">
                    S/ {total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Formulario de participación */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#1a2a63]">Regístrate para Participar</h2>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    DNI / CE
                  </label>
                  <input
                    type="text"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-[#1a2a63] focus:border-[#1a2a63]"
                    placeholder="Tu número de documento"
                    required
                    disabled={loading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-[#1a2a63] focus:border-[#1a2a63]"
                    placeholder="Tu número de teléfono"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombres
                </label>
                <input
                  type="text"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-[#1a2a63] focus:border-[#1a2a63]"
                  placeholder="Tus nombres"
                  required
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apellidos
                </label>
                <input
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-[#1a2a63] focus:border-[#1a2a63]"
                  placeholder="Tus apellidos"
                  required
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-[#1a2a63] focus:border-[#1a2a63]"
                  placeholder="tucorreo@ejemplo.com"
                  required
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departamento
                </label>
                <select 
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-[#1a2a63] focus:border-[#1a2a63]"
                  required
                  disabled={loading}
                >
                  {departamentos.map((depto) => (
                    <option key={depto} value={depto}>
                      {depto}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ¿Cuántos tickets quieres comprar?
                </label>
                <div className="flex items-center">
                  <button 
                    type="button" 
                    onClick={decrementCantidad}
                    className="px-4 py-2 bg-gray-200 rounded-l-lg text-gray-700 hover:bg-gray-300"
                    disabled={loading || cantidad <= 1}
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-t border-b text-center text-xl w-16">
                    {cantidad}
                  </span>
                  <button 
                    type="button" 
                    onClick={incrementCantidad}
                    className="px-4 py-2 bg-gray-200 rounded-r-lg text-gray-700 hover:bg-gray-300"
                    disabled={loading || cantidad >= 10}
                  >
                    +
                  </button>
                  <span className="ml-4 text-gray-600">
                    {cantidad} {cantidad === 1 ? 'ticket' : 'tickets'}
                  </span>
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className={`w-full bg-[#dc3545] hover:bg-[#c82333] text-white font-bold py-3 px-4 rounded-lg transition duration-300 text-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </span>
                  ) : (
                    `Comprar Ahora - S/ ${total.toFixed(2)}`
                  )}
                </button>
                <div className="mt-3 text-center">
                  <button 
                    type="button"
                    className="text-[#1a2a63] hover:text-[#ffc107] text-sm font-medium"
                    disabled={loading}
                  >
                    Ver detalles del sorteo
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}