// app/components/admin/TableSkeleton.tsx
export default function TableSkeleton({ 
  columns = 5, 
  rows = 5 
}: { 
  columns?: number;
  rows?: number;
}) {
  return (
    <div className="animate-pulse">
      <div className="border-b border-gray-200 py-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 px-6">
          {Array.from({ length: columns }).map((_, idx) => (
            <div key={idx} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={rowIdx} className="py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 px-6">
              {Array.from({ length: columns }).map((_, colIdx) => (
                <div key={colIdx} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}