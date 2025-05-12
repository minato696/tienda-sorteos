"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SorteoMini {
  id: number;
  titulo: string;
  precio: number;
  imagenUrl?: string | null;
}

/* ---------- props ---------- */
interface Props {
  sorteo: SorteoMini;
}

/* ---------- tipos ---------- */
interface FormData {
  dni: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
  departamento: string;
  cantidad: number;
}

/* ---------- constantes ---------- */
const initialFormState: FormData = {
  dni: "",
  nombres: "",
  apellidos: "",
  telefono: "",
  email: "",
  departamento: "Lima",
  cantidad: 1,
};

const departamentos = [
  "Amazonas","Áncash","Apurímac","Arequipa","Ayacucho","Cajamarca","Callao",
  "Cusco","Huancavelica","Huánuco","Ica","Junín","La Libertad","Lambayeque",
  "Lima","Loreto","Madre de Dios","Moquegua","Pasco","Piura","Puno","San Martín",
  "Tacna","Tumbes","Ucayali",
];

/* ============================ */
/*            FORM              */
/* ============================ */
export default function ParticiparForm({ sorteo }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const precioTicket = sorteo.precio;

  /* ----- handlers ----- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const incrementarTickets = () =>
    setFormData((p) => ({ ...p, cantidad: p.cantidad + 1 }));
  const decrementarTickets = () =>
    setFormData((p) =>
      p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1 } : p
    );

  /* ------------ VALIDADORES ------------- */
  const validarDNI = (dni: string) => /^\d{8}$/.test(dni);
  const validarEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validarTelefono = (tel: string) => /^9\d{8}$/.test(tel);

  /* ------------ SUBMIT ------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    /* validación mínima */
    if (
      !formData.dni ||
      !formData.nombres ||
      !formData.apellidos ||
      !formData.telefono ||
      !formData.email
    ) {
      setError("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    if (!validarDNI(formData.dni)) {
      setError("El DNI debe tener 8 dígitos numéricos");
      setLoading(false);
      return;
    }
    if (!validarTelefono(formData.telefono)) {
      setError("El teléfono debe empezar en 9 y tener 9 dígitos");
      setLoading(false);
      return;
    }
    if (!validarEmail(formData.email)) {
      setError("El email no es válido");
      setLoading(false);
      return;
    }

    try {
      const body = {
        ...formData,
        sorteoId: sorteo.id,
        cantidad: Number(formData.cantidad),
      };

      const res = await fetch("/api/participar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.mensaje || "Error al registrar");

      setSuccess("¡Registro exitoso! Revisa tu correo.");
      localStorage.setItem("participanteData", JSON.stringify(json));
      setTimeout(() => router.push("/confirmacion"), 1800);
    } catch (err: any) {
      setError(err.message || "Algo salió mal");
    } finally {
      setLoading(false);
    }
  };

  /* ================== RENDER ================== */
  return (
    <main className="bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 max-w-6xl">
        {/* ---------- INFO SORTEO ---------- */}
        <article className="w-full md:w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
          <header className="bg-[#192252] text-white p-4">
            <h2 className="text-xl font-bold">{sorteo.titulo}</h2>
          </header>

          <div className="relative h-64 bg-gray-200">
            {sorteo.imagenUrl ? (
              <Image
                src={sorteo.imagenUrl}
                alt={sorteo.titulo}
                fill
                className="object-cover"
              />
            ) : (
              <p className="flex h-full items-center justify-center text-gray-500">
                Sin imagen
              </p>
            )}
            <div className="absolute top-4 right-4 bg-[#192252] text-white py-1 px-4 rounded-md shadow-md">
              S/ {precioTicket}
            </div>
          </div>

          <div className="p-6 space-y-3">
            <h3 className="text-2xl font-bold text-[#192252]">
              {sorteo.titulo}
            </h3>
            <p className="text-gray-700">
              ¡Participa y gana un increíble premio! Solo necesitas tu ticket.
            </p>
            <div className="bg-gray-50 p-4 rounded-md border">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Precio por ticket:</span>
                <span className="font-bold text-[#192252]">
                  S/ {precioTicket.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-700">Total a pagar:</span>
                <span className="font-bold text-xl text-[#192252]">
                  S/ {(precioTicket * formData.cantidad).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* ---------- FORM ---------- */}
        <section className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#192252]">
            Regístrate para Participar
          </h2>

          {/* mensajes */}
          {error && (
            <p className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
              {error}
            </p>
          )}
          {success && (
            <p className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
              {success}
            </p>
          )}

          {/* formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* DNI & Teléfono */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                name="dni"
                placeholder="DNI (8 dígitos)"
                value={formData.dni}
                onChange={handleChange}
                maxLength={8}
                pattern="\d{8}"
                className="input"
              />
              <input
                name="telefono"
                placeholder="Teléfono (9 dígitos)"
                value={formData.telefono}
                onChange={handleChange}
                maxLength={9}
                pattern="9\d{8}"
                className="input"
              />
            </div>

            <input
              name="nombres"
              placeholder="Nombres"
              value={formData.nombres}
              onChange={handleChange}
              className="input"
            />
            <input
              name="apellidos"
              placeholder="Apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              className="input"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />

            <select
              name="departamento"
              value={formData.departamento}
              onChange={handleChange}
              className="input"
            >
              {departamentos.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>

            {/* cantidad */}
            <label className="block text-sm font-medium text-gray-700">
              Cantidad de tickets
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={decrementarTickets}
                className="btn-minus"
              >
                –
              </button>
              <input
                readOnly
                value={formData.cantidad}
                className="w-16 text-center py-2 border-y border-gray-300"
              />
              <button
                type="button"
                onClick={incrementarTickets}
                className="btn-plus"
              >
                +
              </button>
            </div>

            {/* términos */}
            <label className="flex items-start space-x-2 text-sm">
              <input type="checkbox" required className="mt-1" />
              <span>
                Acepto los{" "}
                <Link href="/terminos" className="text-[#192252] underline">
                  Términos&nbsp;y&nbsp;Condiciones
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e63946] hover:bg-[#d62b39] text-white font-bold py-3 rounded-md"
            >
              {loading
                ? "Procesando..."
                : `Comprar - S/ ${(precioTicket * formData.cantidad).toFixed(
                    2
                  )}`}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

/* ---------- estilos tailwind pequeños ---------- */
const input =
  "w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#192252]";
const btn =
  "px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors select-none";
