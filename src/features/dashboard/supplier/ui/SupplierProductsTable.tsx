import { useEffect, useState } from 'react';
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Card } from '@/shared/ui/card';
import type { SupplierProductDto } from '@/shared/api/dto/supplier';
import { Button } from '@/shared/ui/button.tsx';
import api from '@/shared/api/http';

const columns: ColumnDef<SupplierProductDto>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'title', header: 'Название товара' },
  { accessorKey: 'quantity', header: 'Количество' },
  { accessorKey: 'sellingPrice', header: 'Себестоимость ₽' },
  { accessorKey: 'price', header: 'Цена продажи ₽' },
  { accessorKey: 'previewImageId', header: 'Превью', cell: ({ getValue }) => <span>{getValue() ? `ID: ${getValue()}` : '—'}</span> },
  { id: 'actions', header: 'Действия', cell: () => <Button variant="ghost" className="px-2 py-1 rounded">✏️</Button> },
];

export const SupplierProductsTable = () => {
  const [data, setData] = useState<SupplierProductDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<SupplierProductDto[]>('/supplier/my/products')
      .then((res) => setData(res.data))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div className="text-center p-4">Загрузка...</div>;

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Продукты поставщика</h2>
      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="border-b bg-gray-50">
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="text-left p-3 font-medium text-gray-700">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b hover:bg-gray-100">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-3">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </Card>
  );
};
