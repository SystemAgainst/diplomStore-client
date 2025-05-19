import { type FormEvent, useState } from 'react';
import { useAuthStore } from './useAuthStore';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input.tsx';
import { useNavigate } from 'react-router-dom';
import { authUser } from '@/shared/api/user.ts';


export const LoginPage = () => {
  const [login, setLogin] = useState('Arsen020');
  const [password, setPassword] = useState('batman05');
  const [error, setError] = useState('');

  const setAuth = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await authUser(login, password);
      setAuth(res.data.user.login, res.data.user.role, res.data.token);
      navigate(`/${res.data.user.role}`, { replace: true });
    } catch (err) {
      setError('Invalid login or password');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-auto">
        <h2 className="text-2xl font-bold mb-6">Вход в систему</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <Input
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            type="text"
            required
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>
        <Button className="w-full" type="submit">
          Войти
        </Button>
        <div className="text-xs text-center mt-4">
          У вас нет аккаунта?{' '}
          <Button variant="link" size="sm" type="button" onClick={goToRegister}>
            Зарегистрируйтесь
          </Button>
        </div>
      </form>
    </div>
  );
};
