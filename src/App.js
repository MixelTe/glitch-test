import './App.css';
import Layout from "./components/Layout"
import MainPage from "./pages/MainPage"
import ProjectsPage from "./pages/ProjectsPage"
import NotFoundPage from "./pages/NotFoundPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import StartAnim from './anim';

function App()
{
	return <BrowserRouter basename={'/ya-project'}>
		<Layout>
			<Routes>
				<Route index path='/' element={<MainPage />} />
				<Route path="/projects" element={<ProjectsPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Layout>
	</BrowserRouter>
}
StartAnim();


export default App;
