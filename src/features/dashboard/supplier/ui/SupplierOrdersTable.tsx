import { useMemo } from 'react';
import {
  type ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { OrderSupplierDto } from '@/shared/api/dto/supplier';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';

const mockOrders: OrderSupplierDto[] = [
  { id: 1, status: 'Pending', total: 500 },
  { id: 2, status: 'Shipped', total: 1500 },
  { id: 3, status: 'Cancelled', total: 300 },
];

export const SupplierOrdersTable = () => {
  const data = useMemo(() => mockOrders, []);

  const columns = useMemo<ColumnDef<OrderSupplierDto>[]>(() => [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'status',
      header: 'Статус',
    },
    {
      accessorKey: 'total',
      header: 'Итого ₽',
    },
    {
      id: 'actions',
      header: 'Действия',
      cell: ({ row }) => (
        <Button size="sm" variant="secondary">
          Детали {row.original.id}
        </Button>
      ),
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Заказы поставщика</h2>
      <table className="min-w-full border bg-white">
        <thead className="bg-gray-100">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className="border p-2 text-left">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className="hover:bg-gray-50">
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="border p-2">
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
