// --- app/admin/sorteos/page.tsx ---
export default function SorteosPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestionar Sorteos</h1>
      <button className="bg-green-600 text-white px-4 py-2 mb-4">+ Crear nuevo sorteo</button>
      <div className="bg-white p-4 shadow rounded">
        <p>Aquí se listarán los sorteos.</p>
      </div>
    </div>
  );
}