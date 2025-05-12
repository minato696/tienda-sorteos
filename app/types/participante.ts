// app/types/participante.ts
export interface Participante {
  id?: number;            // Opcional para creación
  dni: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
  departamento: string;
  sorteoId?: number;      // Opcional
  cantidad?: number;      // Opcional, valor por defecto = 1
  fechaRegistro?: Date;   // Opcional para creación
  creadoEn?: Date;        // Opcional para creación
}