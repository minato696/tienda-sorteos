"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import html2canvas from 'html2canvas';

// Función para generar código único de 6 caracteres
const generarCodigoUnico = () => {
  const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let codigo = '';
  for (let i = 0; i < 6; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
};

// Componente separado solo para mostrar en pantalla (diseño web)
const TicketDisplay = ({ codigo, nombre, apellidos, dni, sorteo }: {
  codigo: string;
  nombre: string;
  apellidos: string;
  dni: string;
  sorteo: string;
}) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden bg-white relative">
      {/* Bordes dentados */}
      <div className="absolute top-0 left-0 w-full border-t-4 border-dotted border-gray-200"></div>
      <div className="absolute bottom-0 left-0 w-full border-b-4 border-dotted border-gray-200"></div>
      <div className="absolute top-0 left-0 h-full border-l-4 border-dotted border-gray-200"></div>
      <div className="absolute top-0 right-0 h-full border-r-4 border-dotted border-gray-200"></div>
      
      {/* Cabecera */}
      <div className="bg-gray-900 text-white py-2 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z"></path>
          </svg>
          <span className="font-bold text-lg">SORTEOS PREMIUM</span>
        </div>
        <div className="font-mono font-bold text-lg mr-8">
          {codigo}
        </div>
      </div>
      
      <div className="flex">
        {/* Izquierda */}
        <div className="w-1/3 border-r border-dashed border-gray-300 p-4 flex items-center justify-center">
          <span className="text-xl">BMW Serie 3</span>
        </div>
        
        {/* Derecha */}
        <div className="w-2/3 p-4">
          <div className="text-center mb-3">
            <h2 className="text-2xl font-bold text-gray-800">AUTO BMW SERIE 3</h2>
            <p className="text-gray-600">Gran Sorteo 2025</p>
          </div>
          
          <div className="flex space-x-4">
            <div className="w-1/2">
              <div className="bg-gray-100 p-3 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 uppercase">PARTICIPANTE</h3>
                <p className="text-gray-800">{nombre} {apellidos}</p>
                <p className="text-gray-600 text-sm">DNI: {dni}</p>
              </div>
            </div>
            <div className="w-1/2">
              <div className="bg-gray-100 p-3 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 uppercase">DETALLES</h3>
                <p className="text-gray-800">{sorteo}</p>
                <p className="text-gray-600 text-sm">Fecha: 14/06/2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente oculto optimizado para descarga


const TicketForDownload = ({ codigo, nombre, apellidos, dni, sorteo, ticketRef }: {
  codigo: string;
  nombre: string;
  apellidos: string;
  dni: string;
  sorteo: string;
  ticketRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div 
      ref={ticketRef}
      style={{
        display: 'none',
        width: '800px',
        height: '300px',
        position: 'fixed',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      {/* CABECERA CON TEXTO MÁS ELEVADO */}
      <div style={{
        width: '100%',
        backgroundColor: '#1a202c',
        padding: '0', // Sin padding para control total
        margin: '0',
        height: '50px',
        position: 'relative'
      }}>
        {/* Texto SORTEOS PREMIUM elevado */}
        <div style={{
          position: 'absolute',
          left: '24px',
          top: '10px', // Posicionado más arriba (antes estaba en top: 50%)
          color: 'white',
          fontWeight: 'bold',
          fontSize: '24px',
          letterSpacing: '0.5px'
        }}>
          SORTEOS PREMIUM
        </div>
        
        {/* Código elevado */}
        <div style={{
          position: 'absolute',
          right: '24px',
          top: '10px', // También posicionado más arriba
          color: 'white',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          fontSize: '24px'
        }}>
          {codigo}
        </div>
      </div>
      
      {/* Cuerpo del ticket */}
      <div style={{
        display: 'flex',
        height: '250px'
      }}>
        {/* Izquierda - texto BMW */}
        <div style={{
          width: '33%',
          borderRight: '1px dashed #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <span style={{fontSize: '24px'}}>BMW Serie 3</span>
        </div>
        
        {/* Derecha - contenido principal */}
        <div style={{
          width: '67%',
          padding: '16px'
        }}>
          {/* Título */}
          <div style={{
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              margin: '0 0 8px 0'
            }}>
              AUTO BMW SERIE 3
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#4b5563',
              margin: '0'
            }}>
              Gran Sorteo 2025
            </p>
          </div>
          
          {/* Datos */}
          <div style={{
            display: 'flex',
            gap: '16px'
          }}>
            {/* Participante */}
            <div style={{width: '50%'}}>
              <div style={{
                backgroundColor: '#f3f4f6',
                padding: '12px',
                borderRadius: '6px'
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#4b5563',
                  margin: '0 0 8px 0',
                  textTransform: 'uppercase'
                }}>
                  PARTICIPANTE
                </h3>
                <p style={{
                  fontSize: '16px',
                  margin: '0 0 4px 0'
                }}>
                  {nombre} {apellidos}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#4b5563',
                  margin: '0'
                }}>
                  DNI: {dni}
                </p>
              </div>
            </div>
            
            {/* Detalles */}
            <div style={{width: '50%'}}>
              <div style={{
                backgroundColor: '#f3f4f6',
                padding: '12px',
                borderRadius: '6px'
              }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#4b5563',
                  margin: '0 0 8px 0',
                  textTransform: 'uppercase'
                }}>
                  DETALLES
                </h3>
                <p style={{
                  fontSize: '16px',
                  margin: '0 0 4px 0'
                }}>
                  {sorteo}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#4b5563',
                  margin: '0'
                }}>
                  Fecha: 14/06/2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bordes dentados */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '4px',
        borderTop: '4px dotted #e5e7eb'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '4px',
        borderBottom: '4px dotted #e5e7eb'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        width: '4px',
        borderLeft: '4px dotted #e5e7eb'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        width: '4px',
        borderRight: '4px dotted #e5e7eb'
      }}></div>
    </div>
  );
};


export default function ConfirmacionPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [downloading, setDownloading] = useState(false);
  const ticketRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Recuperar datos del localStorage
    const participanteData = localStorage.getItem('participanteData');
    
    if (participanteData) {
      const participante = JSON.parse(participanteData);
      const cantidad = participante.cantidadTickets || 1;
      const sorteoNombre = "Auto BMW Serie 3 2025";
      
      // Generar los tickets con códigos únicos
      const nuevosTickets = Array(cantidad).fill(0).map(() => ({
        codigo: generarCodigoUnico(),
        nombre: participante.nombres,
        apellidos: participante.apellidos,
        dni: participante.dni,
        sorteo: sorteoNombre,
      }));
      
      setTickets(nuevosTickets);
      // Inicializar los refs para los tickets
      ticketRefs.current = nuevosTickets.map(() => null);
    }
  }, []);

  // Función para descargar ticket con método mejorado
  const descargarTicket = async (index: number) => {
    if (!ticketRefs.current[index]) return;
    
    setDownloading(true);
    try {
      const ticketElement = ticketRefs.current[index];
      if (!ticketElement) return;
      
      // Asegurar que el elemento es visible para html2canvas
      ticketElement.style.display = 'block';
      ticketElement.style.position = 'fixed';
      ticketElement.style.top = '-9999px';
      ticketElement.style.left = '-9999px';
      
      setTimeout(async () => {
        try {
          const canvas = await html2canvas(ticketElement, {
            backgroundColor: "#ffffff",
            scale: 2,
            logging: true,
            useCORS: true,
            allowTaint: true,
            width: 800,
            height: 300,
            x: 0,
            y: 0
          });
          
          // Crear un enlace para descargar la imagen
          const link = document.createElement('a');
          link.download = `ticket-${tickets[index].codigo}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          
          // Ocultar el elemento nuevamente
          ticketElement.style.display = 'none';
          setDownloading(false);
        } catch (error) {
          console.error("Error al generar imagen:", error);
          ticketElement.style.display = 'none';
          setDownloading(false);
        }
      }, 100); // Pequeña pausa para asegurar que el elemento está renderizado
    } catch (error) {
      console.error("Error al generar la imagen del ticket:", error);
      setDownloading(false);
    }
  };

  // Función para descargar todos los tickets
  const descargarTodosTickets = async () => {
    setDownloading(true);
    try {
      for (let i = 0; i < tickets.length; i++) {
        await descargarTicket(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error("Error al descargar todos los tickets:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-4 text-center">¡Participación Exitosa!</h1>
        
        <p className="text-gray-600 mb-6 text-center">
          Tu participación ha sido registrada correctamente. Hemos enviado un correo electrónico con los detalles de tus tickets.
        </p>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl">Tus Tickets</h2>
            <button 
              onClick={descargarTodosTickets} 
              disabled={downloading || tickets.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Descargar todos
                </>
              )}
            </button>
          </div>
          
          {tickets.length > 0 ? (
            <div className="space-y-6">
              {tickets.map((ticket, index) => (
                <div key={index} className="relative">
                  {/* Ticket visible en la interfaz */}
                  <TicketDisplay
                    codigo={ticket.codigo}
                    nombre={ticket.nombre}
                    apellidos={ticket.apellidos}
                    dni={ticket.dni}
                    sorteo={ticket.sorteo}
                  />
                  
                  {/* Ticket oculto optimizado para descarga */}
                  <TicketForDownload
                    codigo={ticket.codigo}
                    nombre={ticket.nombre}
                    apellidos={ticket.apellidos}
                    dni={ticket.dni}
                    sorteo={ticket.sorteo}
                    ticketRef={el => ticketRefs.current[index] = el}
                  />
                  
                  {/* Botón de descarga */}
                  <button 
                    onClick={() => descargarTicket(index)} 
                    className="download-button absolute top-2 right-2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2 transition-all"
                    title="Descargar ticket"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Cargando tus tickets...</p>
          )}
        </div>
        
        <div className="flex flex-col space-y-3">
          <Link 
            href="/"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 text-center"
          >
            Volver al Inicio
          </Link>
          
          <Link 
            href="/sorteos"
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition duration-300 text-center"
          >
            Ver Más Sorteos
          </Link>
        </div>
      </div>
    </div>
  );
}