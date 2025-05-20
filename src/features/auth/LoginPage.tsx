import { type FormEvent, useState } from 'react';
import { useAuthStore } from './useAuthStore';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useNavigate } from 'react-router-dom';
import { authUser } from '@/shared/api/user';


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
      const user = res.data.user;

      setAuth(user.login, user.role, res.data.token);
      navigate(`/${user.role}`, { replace: true });
    } catch (err) {
      console.error(err);
      setError('Неверный логин или пароль');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-auto space-y-4">
        <h2 className="text-2xl font-bold">Вход в систему</h2>
        {error && <div className="text-red-500">{error}</div>}
        <Input
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          type="text"
          required
        />
        <Input
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <Button className="w-full" type="submit">
          Войти
        </Button>
        <div className="text-xs text-center">
          У вас нет аккаунта?{' '}
          <Button variant="link" size="sm" type="button" onClick={goToRegister}>
            Зарегистрируйтесь
          </Button>
        </div>
      </form>
    </div>
  );
};
