import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/shared/router/AppRoutes';
import { Toaster } from '@/shared/ui/sonner.tsx';
import { useInitUser } from '@/features/auth/useInitUser.tsx';


function App() {
  useInitUser();

  return (

    <BrowserRouter>
      <AppRoutes />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
