-- CreateEnum
CREATE TYPE "SorteoEstado" AS ENUM ('ACTIVO', 'FINALIZADO', 'CANCELADO');

-- CreateTable
CREATE TABLE "Sorteo" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagenUrl" TEXT NOT NULL DEFAULT '/images/default-sorteo.jpg',
    "precio" INTEGER NOT NULL,
    "fechaSorteo" TIMESTAMP(3) NOT NULL,
    "ticketsDisponibles" INTEGER NOT NULL,
    "ticketsVendidos" INTEGER NOT NULL DEFAULT 0,
    "estado" "SorteoEstado" NOT NULL DEFAULT 'ACTIVO',
    "premio" TEXT NOT NULL,
    "valorPremio" INTEGER,
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sorteo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participante" (
    "id" SERIAL NOT NULL,
    "dni" CHAR(8) NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "telefono" CHAR(9) NOT NULL,
    "email" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sorteoId" INTEGER NOT NULL,

    CONSTRAINT "Participante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participanteId" INTEGER NOT NULL,
    "sorteoId" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Participante_sorteoId_idx" ON "Participante"("sorteoId");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_codigo_key" ON "Ticket"("codigo");

-- CreateIndex
CREATE INDEX "Ticket_sorteoId_idx" ON "Ticket"("sorteoId");

-- AddForeignKey
ALTER TABLE "Participante" ADD CONSTRAINT "Participante_sorteoId_fkey" FOREIGN KEY ("sorteoId") REFERENCES "Sorteo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "Participante"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_sorteoId_fkey" FOREIGN KEY ("sorteoId") REFERENCES "Sorteo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
