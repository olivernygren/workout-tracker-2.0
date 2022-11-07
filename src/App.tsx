import { ThemeProvider } from '@material-ui/core';
import { AnimatePresence } from 'framer-motion';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { Header } from './components';
import { routes } from './routes';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AnimatePresence mode="wait">
        <BrowserRouter>
          <Header />
          <Routes>
            {routes.map(({ path, element }, key) => (
              <Route path={path} element={element} key={key} />
            ))}
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
