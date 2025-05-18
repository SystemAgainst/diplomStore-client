import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useNavigate } from 'react-router-dom';
import type { RegisterSupplierDtoRequest } from '@/shared/api/dto/supplier';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select.tsx';
import { type Role, ROLES } from '@/shared/const';
import { registerClient, registerSupplier } from '@/shared/api/user.ts';
import { toast } from 'sonner';
import type { RegisterClientDtoRequest } from '@/shared/api/dto/client.ts';


type FormType = (RegisterSupplierDtoRequest & Partial<Pick<RegisterClientDtoRequest, 'inn' | 'ogrnip'>>);

export const RegisterPage = () => {
  const [form, setForm] = useState<FormType>({
    login: '',
    password: '',
    loginTelegram: '',
    chatId: '',
    fio: '',
    email: '',
    phoneNumber: '',
    role: ROLES.SUPPLIER,
    inn: '',
    ogrnip: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (field: keyof FormType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleRoleChange = (value: Role) => {
    setForm({ ...form, role: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      switch (form.role) {
        case ROLES.CLIENT: {
          const clientForm = form as RegisterClientDtoRequest;
          await registerClient(clientForm);
          break;
        }

        case ROLES.SUPPLIER: {
          const supplierForm = form as RegisterSupplierDtoRequest;
          await registerSupplier(supplierForm);
          break;
        }

        default:
          throw new Error(`Неизвестная роль: ${form.role}`);
      }

      toast('Вы зарегистрированы!', {
        description: 'Теперь вы можете войти в систему.',
        duration: 3000,
        position: 'top-center',
      });

      navigate('/auth');
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

        {form.role === ROLES.CLIENT && (
          <>
            <Input placeholder="ИНН" value={form.inn} onChange={handleChange('inn')} required />
            <Input placeholder="ОГРНИП" value={form.ogrnip} onChange={handleChange('ogrnip')} required />
          </>
        )}

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
