import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom'
import Starter from './pages/Starter'
import Login from './pages/Login'
import Registration from './pages/Registration'
import { IUser, useUser } from './store/users/userStore'
import { useEffect } from 'react'
import PersonalAccount from './pages/PersonalAccount'
import { getUserById } from './store/users/api/getUserById'
import Article from './pages/Article'
import CreateNewArticle from './pages/CreateNewArticle'

function App() {
	const { user, clearUser } = useUser()

	useEffect(() => {
		const checkUser = async (user: IUser | null): Promise<void> => {
			if (user) {
				const responseUser = await getUserById(user.id)
				if (
					responseUser.login !== user.login ||
					responseUser.password !== user.password
				) {
					clearUser()
				}
			}
		}
		checkUser(user)
	}, [clearUser, user])

	return (
		<Router>
			<Routes>
				<Route path='/' Component={Starter} />
				<Route path='/login' Component={Login} />
				<Route path='/registration' Component={Registration} />
				<Route
					path='/lk'
					element={user ? <PersonalAccount /> : <Navigate to='/' />}
				/>
				<Route path='/lk/article/create' Component={CreateNewArticle} />
				<Route path='/lk/article/:id' Component={Article} />
			</Routes>
		</Router>
	)
}

export default App
