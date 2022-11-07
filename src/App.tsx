import { ThemeProvider } from '@material-ui/core';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { Header } from './components';
import { routes } from './routes';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          {routes.map(({ path, element }, key) => (
            <Route path={path} element={element} key={key} />
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
