import { prisma } from '@/app/lib/prisma';
import ThumbSlider from './ThumbSlider';   // client component

export default async function ThumbnailGallery() {
  /* Trae hasta 20 sorteos cuya imagenUrl sea distinta de '' (excluye NULL) */
  const sorteos = await prisma.sorteo.findMany({
    where: {
      imagenUrl: { not: '' },          // ✅ evita el error
    },
    orderBy: { createdAt: 'desc' },
    select: { imagenUrl: true },
    take: 20,
  });

  const images = sorteos.map((s) => s.imagenUrl!);

  if (images.length === 0) return null;

return (
  <div className="py-6 bg-gray-50 relative z-10">  {/* 👈 */}
    <div className="container mx-auto px-4">
      <ThumbSlider images={images} />
    </div>
  </div>
);