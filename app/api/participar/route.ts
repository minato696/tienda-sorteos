import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const datos = await request.json();
    
    // Verificar si todos los campos requeridos están presentes
    if (!datos.dni || !datos.nombres || !datos.apellidos || !datos.telefono || !datos.email || !datos.departamento) {
      return NextResponse.json({ mensaje: "Todos los campos son obligatorios" }, { status: 400 });
    }

    // Crear el participante sin validar el sorteo
    const participante = await prisma.participante.create({
      data: {
        dni: datos.dni,
        nombres: datos.nombres,
        apellidos: datos.apellidos,
        telefono: datos.telefono,
        email: datos.email,
        departamento: datos.departamento,
      },
    });

    return NextResponse.json({ 
      mensaje: "Participante registrado con éxito", 
      participante 
    }, { status: 201 });
    
  } catch (error: any) {
    console.error("Error al registrar participante:", error);
    
    // Manejar errores de duplicado de DNI
    if (error.code === 'P2002' && error.meta?.target?.includes('dni')) {
      return NextResponse.json({ mensaje: "Ya existe un participante con ese DNI" }, { status: 400 });
    }
    
    return NextResponse.json({ mensaje: "Error al registrar participante" }, { status: 500 });
  }
}