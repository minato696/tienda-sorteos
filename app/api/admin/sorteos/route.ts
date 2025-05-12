/** 
 * app/api/upload/route.ts
 * 
 * Carga de imágenes desde el panel de administrador.
 * 1. Recibe el archivo (campo <input name="imagen" /> o <input name="file" />).
 * 2. Lo convierte a WebP (80 % calidad) con Sharp.
 * 3. Lo guarda en /public/uploads y devuelve la URL pública.
 * 
 * Requisitos:
 *   npm i sharp uuid
 *   (En Windows: instalar las dependencias de Sharp o usar WSL)
 */

import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';

export const runtime = 'nodejs';          // Asegura que NO se ejecute en Edge

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Permite name="imagen" o name="file"
    const file =
      (formData.get('imagen') as File | null) ||
      (formData.get('file') as File | null);

    if (!file) {
      return NextResponse.json(
        { error: 'No se recibió ningún archivo' },
        { status: 400 }
      );
    }

    // Solo imágenes (image/png, image/jpeg, etc.)
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'El archivo debe ser una imagen' },
        { status: 415 }
      );
    }

    // Genera nombre único y carpeta destino
    const fileName = `${uuidv4()}.webp`;
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const fullPath = path.join(uploadsDir, fileName);

    // Asegura que la carpeta exista
    await fs.mkdir(uploadsDir, { recursive: true });

    // Convierte a WebP y guarda
    const buffer = Buffer.from(await file.arrayBuffer());
    await sharp(buffer).webp({ quality: 80 }).toFile(fullPath);

    // Devuelve la ruta pública para que la guardes en la DB
    return NextResponse.json({ url: `/uploads/${fileName}` });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json(
      { error: 'Error al subir la imagen' },
      { status: 500 }
    );
  }
}
