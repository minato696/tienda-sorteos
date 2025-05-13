"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import html2canvas from "html2canvas";

/* ---------- tipos ---------- */
interface Ticket {
  codigo: string;
}
interface ParticipanteData {
  sorteoTitulo: string;
  nombres: string;
  apellidos: string;
  dni: string;
  cantidad: number;
  tickets: Ticket[];
}

/* ============ COMPONENTES ============ */
const TicketDisplay = ({
  codigo,
  sorteoTitulo,
  nombres,
  apellidos,
  dni,
}: {
  codigo: string;
  sorteoTitulo: string;
  nombres: string;
  apellidos: string;
  dni: string;
}) => (
  <div className="border border-gray-300 rounded-lg shadow-md bg-white relative overflow-hidden">
    {/* bordes dentados */}
    <div className="absolute inset-x-0 top-0 h-1.5 border-t-4 border-dotted border-gray-200" />
    <div className="absolute inset-x-0 bottom-0 h-1.5 border-b-4 border-dotted border-gray-200" />
    <div className="absolute inset-y-0 left-0 w-1.5 border-l-4 border-dotted border-gray-200" />
    <div className="absolute inset-y-0 right-0 w-1.5 border-r-4 border-dotted border-gray-200" />

    {/* cabecera */}
    <header className="bg-gray-900 text-white py-2 px-4 flex justify-between">
      <span className="font-bold">SORTEOS PREMIUM</span>
      <span className="font-mono font-bold">{codigo}</span>
    </header>

    <div className="flex">
      {/* izquierda */}
      <div className="w-1/3 border-r border-dashed p-4 flex items-center justify-center text-xl">
        {sorteoTitulo}
      </div>

      {/* derecha */}
      <div className="w-2/3 p-4 space-y-3">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          {sorteoTitulo.toUpperCase()}
        </h2>

        <div className="flex space-x-4">
          <div className="w-1/2 bg-gray-100 p-3 rounded-lg">
            <h3 className="text-xs font-semibold text-gray-700 uppercase mb-1">
              PARTICIPANTE
            </h3>
            <p className="text-gray-800">
              {nombres} {apellidos}
            </p>
            <p className="text-gray-600 text-sm">DNI: {dni}</p>
          </div>

          <div className="w-1/2 bg-gray-100 p-3 rounded-lg">
            <h3 className="text-xs font-semibold text-gray-700 uppercase mb-1">
              DETALLES
            </h3>
            <p className="text-gray-800">Fecha del Sorteo:</p>
            <p className="text-gray-600 text-sm">Revisa nuestras redes</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* componente oculto optimizado para descarga */
const TicketForDownload = ({
  codigo,
  sorteoTitulo,
  nombres,
  apellidos,
  dni,
  ticketRef,
}: {
  codigo: string;
  sorteoTitulo: string;
  nombres: string;
  apellidos: string;
  dni: string;
  ticketRef: React.RefObject<HTMLDivElement>;
}) => (
  <div
    ref={ticketRef}
    style={{
      display: "none",
      position: "fixed",
      width: "800px",
      height: "300px",
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      fontFamily: "Arial, sans-serif",
    }}
  >
    {/* cabecera */}
    <div
      style={{
        background: "#1a202c",
        height: 50,
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        fontWeight: "bold",
        fontSize: 24,
      }}
    >
      <span>SORTEOS PREMIUM</span>
      <span style={{ fontFamily: "monospace" }}>{codigo}</span>
    </div>

    <div style={{ display: "flex", height: 250 }}>
      <div
        style={{
          width: "33%",
          borderRight: "1px dashed #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
        }}
      >
        {sorteoTitulo}
      </div>

      <div style={{ width: "67%", padding: 16 }}>
        <h2 style={{ textAlign: "center", fontSize: 26, marginBottom: 20 }}>
          {sorteoTitulo.toUpperCase()}
        </h2>

        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ width: "50%" }}>
            <div style={{ background: "#f3f4f6", padding: 12, borderRadius: 6 }}>
              <strong>PARTICIPANTE</strong>
              <p>
                {nombres} {apellidos}
              </p>
              <small>DNI: {dni}</small>
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <div style={{ background: "#f3f4f6", padding: 12, borderRadius: 6 }}>
              <strong>DETALLES</strong>
              <p>Sigue nuestras redes para la fecha del sorteo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ============ PÁGINA PRINCIPAL ============ */
export default function ConfirmacionPage() {
  const [datos, setDatos] = useState<ParticipanteData | null>(null);
  const [downloading, setDownloading] = useState(false);
  const ticketRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [ready, setReady] = useState(false);

  /* cargar del localStorage */
  useEffect(() => {
    const raw = localStorage.getItem("participanteData");
    if (!raw) return;
    try {
      const parsed: ParticipanteData = JSON.parse(raw);
      setDatos(parsed);
      ticketRefs.current = parsed.tickets.map(() => null);
    } finally {
      setReady(true);
    }
  }, []);

  /* descarga individual */
  const descargarTicket = async (idx: number) => {
    const el = ticketRefs.current[idx];
    if (!el) return;
    setDownloading(true);
    el.style.display = "block";
    el.style.top = "-9999px";
    el.style.left = "-9999px";

    try {
      const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#fff" });
      const link = document.createElement("a");
      link.download = `ticket-${datos!.tickets[idx].codigo}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      el.style.display = "none";
      setDownloading(false);
    }
  };

  /* descarga en lote */
  const descargarTodos = async () => {
    if (!datos) return;
    for (let i = 0; i < datos.tickets.length; i++) {
      await descargarTicket(i);
      await new Promise((r) => setTimeout(r, 700));
    }
  };

  if (!ready) {
    return (
      <main className="flex h-screen items-center justify-center text-gray-600">
        Cargando…
      </main>
    );
  }

  if (!datos) {
    return (
      <main className="flex h-screen items-center justify-center">
        <p className="text-red-600">No se encontró información del participante.</p>
      </main>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-center">
          ¡Participación Exitosa!
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          Te enviamos un correo con tus códigos. Guárdalos y ¡mucha suerte!
        </p>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl">
              Tus Tickets ({datos.tickets.length})
            </h2>
            <button
              onClick={descargarTodos}
              disabled={downloading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
            >
              {downloading ? "Procesando…" : "Descargar todos"}
            </button>
          </div>

          <div className="space-y-6">
            {datos.tickets.map((t, i) => (
              <div key={t.codigo} className="relative">
                <TicketDisplay
                  codigo={t.codigo}
                  sorteoTitulo={datos.sorteoTitulo}
                  nombres={datos.nombres}
                  apellidos={datos.apellidos}
                  dni={datos.dni}
                />
                <TicketForDownload
                  codigo={t.codigo}
                  sorteoTitulo={datos.sorteoTitulo}
                  nombres={datos.nombres}
                  apellidos={datos.apellidos}
                  dni={datos.dni}
                  ticketRef={(el) => (ticketRefs.current[i] = el)}
                />
                <button
                  onClick={() => descargarTicket(i)}
                  className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2"
                  title="Descargar este ticket"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <Link
            href="/"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-center"
          >
            Volver al Inicio
          </Link>
          <Link
            href="/sorteos"
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md text-center"
          >
            Ver más Sorteos
          </Link>
        </div>
      </div>
    </div>
  );
}
