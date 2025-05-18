import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/shared/router/AppRoutes';
import { Toaster } from '@/shared/ui/sonner.tsx';


function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
