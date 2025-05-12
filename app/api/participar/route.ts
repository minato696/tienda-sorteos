// app/api/participar/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Función para generar código único de ticket
function generarCodigoTicket() {
  const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let codigo = '';
  for (let i = 0; i < 8; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
}

export async function POST(request: Request) {
  try {
    console.log("Inicio de solicitud POST en /api/participar");
    
    const datos = await request.json();
    console.log("Datos recibidos:", datos);
    
    // Verificar campos requeridos
    if (!datos.dni || !datos.nombres || !datos.apellidos || !datos.telefono || !datos.email || !datos.departamento) {
      console.log("Campos requeridos faltantes");
      return NextResponse.json({ mensaje: "Todos los campos son obligatorios" }, { status: 400 });
    }

    // Procesar cantidad
    const cantidadTickets = datos.cantidad ? 
      (typeof datos.cantidad === 'string' ? parseInt(datos.cantidad) : datos.cantidad) : 1;
    
    console.log(`Creando participante con ${cantidadTickets} tickets`);

    // Crear participante
    const participante = await prisma.participante.create({
      data: {
        dni: datos.dni,
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        telefono: datos.telefono,
        email: datos.email,
        departamento: datos.departamento,
        cantidad: cantidadTickets,
        fechaRegistro: new Date(),
      },
    });

    console.log("Participante creado exitosamente:", participante);

    // Crear tickets en batch (más eficiente)
    const ticketsData = Array(cantidadTickets).fill(0).map(() => ({
      codigo: generarCodigoTicket(),
      participanteId: participante.id
    }));

    const result = await prisma.ticket.createMany({
      data: ticketsData
    });

    console.log(`Se crearon ${result.count} tickets`);

    // Obtener los tickets creados para devolverlos en la respuesta
    const tickets = await prisma.ticket.findMany({
      where: { participanteId: participante.id }
    });

    console.log("Tickets generados:", tickets);

    // Guardar los tickets en la respuesta para que el cliente pueda acceder a ellos
    return NextResponse.json({ 
      mensaje: "Participante registrado con éxito", 
      participante,
      tickets
    }, { status: 201 });
    
  } catch (error: any) {
    console.error("Error detallado al registrar participante:", error);
    
    // Manejar errores específicos
    if (error.code === 'P2002' && error.meta?.target?.includes('dni')) {
      return NextResponse.json({ mensaje: "Ya existe un participante con ese DNI" }, { status: 400 });
    }
    
    return NextResponse.json({ 
      mensaje: "Error al registrar participante", 
      detalles: error.message 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}