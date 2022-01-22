import { ThemeProvider } from '@material-ui/core';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { routes } from './routes';
import theme from './theme';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					{routes.map(({ path, element }, key) => (
						<Route path={path} element={element} key={key} />
					))}
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
