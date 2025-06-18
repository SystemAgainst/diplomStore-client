import { useEffect, useState } from 'react';
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Card } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { getSupplierAllProducts } from '@/shared/api/supplier.ts';
import type { MainDtoResponse as ProductDtoResponse} from '@/shared/api/dto/product.ts';
import { getFullImageUrl } from '@/shared/const';

const columnsConfig = (
  editRowId: number | null,
  editedRow: Partial<ProductDtoResponse> | null,
  onEdit: (row: ProductDtoResponse) => void,
  onCancel: () => void,
  onSave: (id: number) => void,
  onChangeField: (field: keyof ProductDtoResponse, value: string | number) => void
): ColumnDef<ProductDtoResponse>[] => [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'title',
    header: 'Название товара',
    cell: ({ row }) =>
      editRowId === row.original.id ? (
        <Input
          value={editedRow?.title ?? ''}
          onChange={(e) => onChangeField('title', e.target.value)}
        />
      ) : (
        row.original.title
      ),
  },
  {
    accessorKey: 'quantity',
    header: 'Количество',
    cell: ({ row }) =>
      editRowId === row.original.id ? (
        <Input
          type="number"
          value={editedRow?.quantity ?? ''}
          onChange={(e) => onChangeField('quantity', Number(e.target.value))}
        />
      ) : (
        row.original.quantity
      ),
  },
  {
    accessorKey: 'sellingPrice',
    header: 'Цена продажи ₽',
    cell: ({ row }) =>
      editRowId === row.original.id ? (
        <Input
          type="number"
          value={editedRow?.price ?? ''}
          onChange={(e) => onChangeField('price', Number(e.target.value))}
        />
      ) : (
        row.original.price
      ),
  },
  {
    accessorKey: 'price',
    header: 'Себестоимость ₽',
    cell: ({ row }) =>
      editRowId === row.original.id ? (
        <Input
          type="number"
          value={editedRow?.sellingPrice ?? ''}
          onChange={(e) => onChangeField('sellingPrice', Number(e.target.value))}
        />
      ) : (
        row.original.sellingPrice
      ),
  },
  {
    accessorKey: 'imageUrl',
    header: 'Изображение',
    cell: ({ row }) =>
      editRowId === row.original.id ? (
        <Input
          type="text"
          value={editedRow?.imageUrl ?? ''}
          onChange={(e) => onChangeField('imageUrl', e.target.value)}
        />
      ) : (
        <img
          src={getFullImageUrl(row.original.imageUrl)}
          alt="preview"
          className="h-14 w-14 object-cover rounded"
          onError={(e) => ((e.target as HTMLImageElement).src = '/mock-product.jpg')}
        />
      ),
  },
  {
    id: 'actions',
    header: 'Действия',
    cell: ({ row }) =>
      editRowId === row.original.id ? (
        <>
          <Button variant="ghost" size="sm" onClick={() => onSave(row.original.id)}>
            ✅
          </Button>
          <Button variant="ghost" size="sm" onClick={onCancel} className="ml-2">
            ❌
          </Button>
        </>
      ) : (
        <Button variant="ghost" size="sm" onClick={() => onEdit(row.original)}>
          ✏️
        </Button>
      ),
  },
];

export const SupplierProductsTable = ({ refreshToken }: { refreshToken: number }) => {
  const [data, setData] = useState<ProductDtoResponse[]>([]);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<Partial<ProductDtoResponse> | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await getSupplierAllProducts();
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshToken]);

  const handleEdit = (row: ProductDtoResponse) => {
    setEditRowId(row.id);
    setEditedRow({ ...row });
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditedRow(null);
  };

  const handleChangeField = (field: keyof ProductDtoResponse, value: string | number) => {
    setEditedRow((prev) => ({ ...prev!, [field]: value }));
  };

  const handleSave = (id: number) => {
    if (!editedRow) return;
    setData((prev) => prev.map((item) => (item.id === id ? { ...item, ...editedRow } : item)));
    // можно отправить PUT на API тут
    handleCancel();
  };

  const table = useReactTable({
    data,
    columns: columnsConfig(editRowId, editedRow, handleEdit, handleCancel, handleSave, handleChangeField),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Продукты поставщика</h2>

      {data.length === 0 ? (
        <p className="text-muted-foreground italic text-sm px-2 py-8 text-center">
          Пока товаров нет.
        </p>
      ) : (
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
      )}
    </Card>
  );
};
