"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Tipo para los datos del formulario
interface FormData {
  dni: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
  departamento: string;
  cantidad: number;
}

// Estado inicial del formulario
const initialFormState: FormData = {
  dni: "",
  nombres: "",
  apellidos: "",
  telefono: "",
  email: "",
  departamento: "Lima",
  cantidad: 1
};

// Opciones para el campo de departamento
const departamentos = [
  "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", 
  "Cajamarca", "Callao", "Cusco", "Huancavelica", "Huánuco", 
  "Ica", "Junín", "La Libertad", "Lambayeque", "Lima", 
  "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura", 
  "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"
];

export default function ParticiparForm() {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const precioTicket = 50.00;

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Funciones para incrementar y decrementar tickets
  const incrementarTickets = () => {
    setFormData(prev => ({
      ...prev,
      cantidad: prev.cantidad + 1
    }));
  };

  const decrementarTickets = () => {
    if (formData.cantidad > 1) {
      setFormData(prev => ({
        ...prev,
        cantidad: prev.cantidad - 1
      }));
    }
  };

  // Función para validar DNI
  const validarDNI = (dni: string) => {
    return /^\d{8}$/.test(dni);
  };

  // Función para validar email
  const validarEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Función para validar teléfono
  const validarTelefono = (telefono: string) => {
    return /^9\d{8}$/.test(telefono);
  };

  // Función para enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validar campos
    if (!formData.dni || !formData.nombres || !formData.apellidos || !formData.telefono || !formData.email || !formData.departamento) {
      setError("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    // Validar formato de DNI
    if (!validarDNI(formData.dni)) {
      setError("El DNI debe tener 8 dígitos numéricos");
      setLoading(false);
      return;
    }

    // Validar formato de email
    if (!validarEmail(formData.email)) {
      setError("El formato de email no es válido");
      setLoading(false);
      return;
    }

    // Validar formato de teléfono
    if (!validarTelefono(formData.telefono)) {
      setError("El teléfono debe comenzar con 9 y tener 9 dígitos en total");
      setLoading(false);
      return;
    }

    try {
      // Preparar los datos
      const dataToSend = {
        ...formData,
        cantidad: Number(formData.cantidad)
      };
      
      console.log("Enviando datos al backend:", dataToSend);
      
      const response = await fetch("/api/participar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.mensaje || "Error al registrar participante");
      }

      // Guardar datos en localStorage para usar en la página de confirmación
      localStorage.setItem('participanteData', JSON.stringify({
        ...formData,
        tickets: responseData.tickets // Guardar también los tickets generados
      }));
      
      setSuccess("¡Registro exitoso! Te hemos enviado un email con los detalles.");
      
      // Resetear el formulario después de un registro exitoso
      setFormData(initialFormState);
      
      // Redirigir a la página de confirmación después de un tiempo
      setTimeout(() => {
        router.push("/confirmacion");
      }, 1500);
      
    } catch (error: any) {
      console.error("Error en la respuesta:", error);
      setError(error.message || "Ocurrió un error al procesar tu solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
          {/* Columna izquierda - Información del sorteo */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg">
            <div className="bg-[#192252] text-white p-4">
              <h2 className="text-xl font-bold">
                Gran Sorteo BMW
              </h2>
            </div>

            <div className="relative bg-gray-200 h-64 flex items-center justify-center overflow-hidden">
              <p className="text-gray-500">Imagen del premio</p>
              <div className="absolute top-4 right-4 bg-[#192252] text-white py-1 px-4 rounded-md shadow-md">
                S/ 50
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#192252] mb-3">Gran Sorteo - Auto BMW Serie 3 2025</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Participa en nuestro sorteo mensual y llévate un increíble auto 0KM. ¡Tus sueños están a un ticket de distancia!
              </p>

              <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                <div className="flex justify-between mb-2 items-center">
                  <span className="text-gray-700 font-medium">Precio por ticket:</span>
                  <span className="font-bold text-[#192252]">S/ {precioTicket.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-gray-700 font-medium">Total a pagar:</span>
                  <span className="font-bold text-xl text-[#192252]">S/ {(precioTicket * formData.cantidad).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Formulario */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-[#192252]">Regístrate para Participar</h2>
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}
            
            {success && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>{success}</span>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* DNI / CE */}
                <div>
                  <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">
                    DNI / CE
                  </label>
                  <input
                    type="text"
                    id="dni"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#192252] transition-colors"
                    placeholder="Tu número de documento"
                    maxLength={8}
                    pattern="\d{8}"
                    title="El DNI debe tener 8 dígitos numéricos"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#192252] transition-colors"
                    placeholder="Tu número de teléfono"
                    maxLength={9}
                    pattern="9\d{8}"
                    title="El teléfono debe comenzar con 9 y tener 9 dígitos en total"
                  />
                </div>
              </div>

              {/* Nombres */}
              <div>
                <label htmlFor="nombres" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombres
                </label>
                <input
                  type="text"
                  id="nombres"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#192252] transition-colors"
                  placeholder="Tus nombres"
                />
              </div>

              {/* Apellidos */}
              <div>
                <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-1">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#192252] transition-colors"
                  placeholder="Tus apellidos"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#192252] transition-colors"
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>

              {/* Departamento */}
              <div>
                <label htmlFor="departamento" className="block text-sm font-medium text-gray-700 mb-1">
                  Departamento
                </label>
                <select
                  id="departamento"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#192252] transition-colors"
                >
                  {departamentos.map((depto) => (
                    <option key={depto} value={depto}>
                      {depto}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cantidad de tickets */}
              <div>
                <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Cuántos tickets quieres comprar?
                </label>
                <div className="flex items-center">
                  <button 
                    type="button" 
                    onClick={decrementarTickets}
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-l-md transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    readOnly
                    value={formData.cantidad}
                    className="w-16 text-center py-2 border-t border-b border-gray-300 bg-white"
                  />
                  <button 
                    type="button" 
                    onClick={incrementarTickets}
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-r-md transition-colors"
                  >
                    +
                  </button>
                  <span className="ml-4 text-gray-700 font-medium">
                    {formData.cantidad} ticket{formData.cantidad > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Términos y condiciones */}
              <div className="flex items-start mt-4">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-[#192252] focus:ring-[#192252] border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    Acepto los <Link href="/terminos" className="text-[#192252] hover:underline">términos y condiciones</Link> y la <Link href="/privacidad" className="text-[#192252] hover:underline">política de privacidad</Link>
                  </label>
                </div>
              </div>

              {/* Botón de compra */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e63946] hover:bg-[#d62b39] text-white font-bold py-3.5 px-4 rounded-md transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </div>
                ) : (
                  `Comprar Ahora - S/ ${(precioTicket * formData.cantidad).toFixed(2)}`
                )}
              </button>
              
              <div className="text-center mt-4">
                <Link href="/detalles-sorteo" className="text-sm text-[#192252] hover:underline font-medium">
                  Ver detalles del sorteo
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}