// app/components/server/layout/ThumbnailGallery.tsx
import { prisma } from '@/app/lib/prisma';
import ThumbSlider from './ThumbSlider';

export default async function ThumbnailGallery() {
  /* Trae hasta 20 sorteos cuya imagenUrl sea distinta de '' (excluye NULL) */
  const sorteos = await prisma.sorteo.findMany({
    where: {
      imagenUrl: { not: '' },
    },
    orderBy: { createdAt: 'desc' },
    select: { imagenUrl: true },
    take: 20,
  });

  const images = sorteos.map((s) => s.imagenUrl!);

  if (images.length === 0) return null;

  return (
    // Espaciado superior e inferior para separarlo del navbar (como en VAOPE)
    <div className="thumbnail-gallery-wrapper py-4 mt-6 mb-2 bg-gray-50">
      <div className="container mx-auto px-4">
        <ThumbSlider images={images} />
      </div>
    </div>
  );
}