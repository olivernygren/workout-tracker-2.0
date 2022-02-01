import { ThemeProvider } from '@material-ui/core';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { Header } from './components';
import { routes } from './routes';
import theme from './theme';
import { useEffect } from 'react';

function App() {
	const workoutsCollection = collection(db, 'workouts');

	useEffect(() => {
		const getWorkouts = async () => {
			const data = await getDocs(workoutsCollection);
			console.log(data);
		};
		getWorkouts();
	}, []);

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
}

export default App;
