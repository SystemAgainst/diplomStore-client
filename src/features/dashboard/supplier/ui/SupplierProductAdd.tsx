import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { useState } from 'react';
import { createProduct } from '@/shared/api/product.ts';

type CreateProductModalProps = {
  onProductCreated: () => void;
};

export function CreateProductModal({ onProductCreated }: CreateProductModalProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    quantity: 1,
    price: '',
    sellingPrice: '',
    images: [] as File[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setForm((prev) => ({ ...prev, images: Array.from(files) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('quantity', form.quantity.toString());
    formData.append('price', form.price);
    formData.append('sellingPrice', form.sellingPrice);

    if (form.images.length === 0) {
      const fallbackBlob = await fetch('/mock-product.jpg').then((res) => res.blob());
      const fallbackFile = new File([fallbackBlob], 'mock-product.jpg', { type: 'image/jpeg' });
      formData.append('images', fallbackFile);
    } else {
      form.images.forEach((file) => formData.append('images', file));
    }

    await createProduct(formData);
    setForm({
      title: '',
      quantity: 1,
      price: '',
      sellingPrice: '',
      images: [],
    });
    onProductCreated();
    setOpen(false); // закрываем модалку
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-8">Создать товар</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новый товар</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название</Label>
            <Input id="title" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Количество</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Закупочная цена</Label>
            <Input
              id="sellingPrice"
              name="sellingPrice"
              value={form.sellingPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sellingPrice">Цена продажи</Label>
            <Input
              id="price"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="images">Изображения</Label>
            <Input
              id="images"
              name="images"
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <Button type="submit" className="w-full">
            Сохранить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
