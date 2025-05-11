// scripts/create-admin.js
const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcrypt");

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Verifica si ya existe un usuario administrador
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
      },
    });

    if (existingAdmin) {
      console.log("Ya existe un administrador:", existingAdmin.email);
      return;
    }

    // Hashea la contraseña
    const hashedPassword = await hash("admin123", 10);

    // Crea el usuario administrador
    const admin = await prisma.user.create({
      data: {
        email: "admin@example.com", // Cambia esto a tu email
        name: "Administrador",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("Administrador creado exitosamente:", admin.email);
  } catch (error) {
    console.error("Error al crear el administrador:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();