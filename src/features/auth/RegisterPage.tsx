import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useNavigate } from 'react-router-dom';
import type { RegisterSupplierDtoRequest } from '@/shared/api/dto/supplier';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select.tsx';
import { type Role, ROLES } from '@/shared/const';
import { registerSupplier } from '@/shared/api/user.ts';
import { useAuthStore } from '@/features/auth/useAuthStore.ts';

export const RegisterPage = () => {
  const [form, setForm] = useState<RegisterSupplierDtoRequest>({
    login: 'supplier_user32',
    password: 'securePasswo321rd123',
    loginTelegram: 'supplier_tel312egram1',
    chatId: 'supplier_tel312egram',
    fio: 'Иванов Иван Иванович',
    email: 'supplier321@example.com',
    "phoneNumber": "+79991234567",
    role: ROLES.SUPPLIER,
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const authStore = useAuthStore((s) => s.login);

  const handleChange = (field: keyof RegisterSupplierDtoRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleRoleChange = (value: Role) => {
    setForm({ ...form, role: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await registerSupplier(form);
      authStore(res.data.user.login, form.role, res.data.token);
      navigate(`/${form.role}`, { replace: true });
    } catch (err) {
      setError('Ошибка регистрации. Проверьте введённые данные.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-[500px] space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Регистрация</h2>
          <Select value={form.role} onValueChange={handleRoleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите роль" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SUPPLIER">Поставщик</SelectItem>
              <SelectItem value="SOLE_TRADER">Клиент</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <Input placeholder="Логин" value={form.login} onChange={handleChange('login')} required />
        <Input placeholder="Пароль" value={form.password} onChange={handleChange('password')} type="password" required />
        <Input placeholder="Логин Telegram" value={form.loginTelegram} onChange={handleChange('loginTelegram')} required />
        <Input placeholder="Chat ID Telegram" value={form.chatId} onChange={handleChange('chatId')} required />
        <Input placeholder="ФИО" value={form.fio} onChange={handleChange('fio')} required />
        <Input placeholder="Email" value={form.email} onChange={handleChange('email')} type="email" required />
        <Input placeholder="Телефон" value={form.phoneNumber} onChange={handleChange('phoneNumber')} required />

        <Button className="w-full" type="submit">
          Зарегистрироваться
        </Button>
        <div className="text-xs text-center">
          Уже есть аккаунт?{' '}
          <Button variant="link" size="sm" type="button" onClick={() => navigate('/auth')}>
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
};
