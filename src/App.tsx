import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/shared/router/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
