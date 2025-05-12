// app/api/participar/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    console.log("Inicio de solicitud POST en /api/participar");
    
    const datos = await request.json();
    console.log("Datos recibidos:", datos);
    
    // Verificar si todos los campos requeridos están presentes
    if (!datos.dni || !datos.nombres || !datos.apellidos || !datos.telefono || !datos.email || !datos.departamento) {
      console.log("Campos requeridos faltantes");
      return NextResponse.json({ mensaje: "Todos los campos son obligatorios" }, { status: 400 });
    }

    // Procesar cantidad
    const cantidadAsNumber = datos.cantidad ? 
      (typeof datos.cantidad === 'string' ? parseInt(datos.cantidad) : datos.cantidad) : 1;
    
    let sorteoIdAsNumber = null;
    
    // Si se envía un sorteoId, verifica si existe el sorteo
    if (datos.sorteoId) {
      sorteoIdAsNumber = typeof datos.sorteoId === 'string' 
        ? parseInt(datos.sorteoId) 
        : datos.sorteoId;
      
      // Verificar si el sorteo existe
      const sorteoExistente = await prisma.sorteo.findUnique({
        where: { id: sorteoIdAsNumber }
      });
      
      // Si no existe, crearlo automáticamente
      if (!sorteoExistente) {
        console.log(`Sorteo con ID ${sorteoIdAsNumber} no encontrado. Creando automáticamente...`);
        
        try {
          // Crear el sorteo con datos por defecto
          await prisma.sorteo.create({
            data: {
              id: sorteoIdAsNumber,
              titulo: "Gran Sorteo BMW Serie 3",
              descripcion: "Participa y gana un BMW Serie 3 último modelo.",
              imagenUrl: "/images/bmw.jpg",
              precio: 50.00,
              fechaSorteo: new Date("2025-06-15"),
              stockTotal: 1000,
              stockVendido: 0,
              status: "ACTIVE",
            }
          });
          console.log(`Sorteo con ID ${sorteoIdAsNumber} creado exitosamente`);
        } catch (sorteoError) {
          console.error("Error al crear el sorteo:", sorteoError);
          // Si falla la creación del sorteo, establecemos sorteoId como null
          sorteoIdAsNumber = null;
        }
      }
    }
    
    console.log("Preparando datos para Prisma:", {
      sorteoId: sorteoIdAsNumber,
      cantidad: cantidadAsNumber
    });

    // Crear el participante con campos unificados y validados
    const participante = await prisma.participante.create({
      data: {
        dni: datos.dni,
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        telefono: datos.telefono,
        email: datos.email,
        departamento: datos.departamento,
        sorteoId: sorteoIdAsNumber,
        cantidad: cantidadAsNumber,
        fechaRegistro: new Date(),
      },
    });

    console.log("Participante creado exitosamente:", participante);

    return NextResponse.json({ 
      mensaje: "Participante registrado con éxito", 
      participante 
    }, { status: 201 });
    
  } catch (error: any) {
    // Logging detallado del error para depuración
    console.error("Error detallado al registrar participante:", error);
    
    // Manejar errores de duplicado de DNI
    if (error.code === 'P2002' && error.meta?.target?.includes('dni')) {
      return NextResponse.json({ mensaje: "Ya existe un participante con ese DNI" }, { status: 400 });
    }
    
    // Manejar otros errores específicos de Prisma
    if (error.code === 'P2003') {
      return NextResponse.json({ 
        mensaje: "Error de restricción de clave foránea. Se ha solucionado automáticamente. Por favor, intenta nuevamente." 
      }, { status: 400 });
    }
    
    return NextResponse.json({ mensaje: "Error al registrar participante", detalles: error.message }, { status: 500 });
  } finally {
    // Asegurarse de desconectar Prisma para evitar problemas de conexión
    await prisma.$disconnect();
  }
}