import { useId, useState } from 'react'
import { Card } from '../../../shared/ui/Card'
import { Button } from '../../../shared/ui/Button'
import { Navigate } from 'react-router-dom'
import { useUser } from '../../../store/users/userStore'
import { useGetUserByLogin } from '../../../store/users/api/useGetUserByLogin'

const LoginCard = () => {
	const loginId = useId()
	const passwordId = useId()
	const [isLoginError, setIsLoginError] = useState(false)
	const [isPasswordError, setIsPasswordError] = useState(false)
	const [loginInputValue, setLoginInputValue] = useState('')
	const [passwordInputValue, setPasswordInputValue] = useState('')
	const { setUser, user } = useUser()
	const { user: checkedLogin } = useGetUserByLogin(loginInputValue)

	const onClickHandler = () => {
		console.log('clicked')
	}
	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (loginInputValue === '' || passwordInputValue === '') {
			if (loginInputValue === '') {
				setIsLoginError(true)
			}
			if (passwordInputValue === '') {
				setIsPasswordError(true)
			}
		} else {
			if (!checkedLogin) {
				setIsLoginError(true)
			} else {
				if (checkedLogin.login !== loginInputValue) {
					setIsLoginError(true)
				}
				if (checkedLogin.password !== passwordInputValue) {
					setIsPasswordError(true)
				}
				if (
					checkedLogin.login === loginInputValue &&
					checkedLogin.password === passwordInputValue
				) {
					setUser(checkedLogin)
				}
			}
		}
	}
	const loginOnChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		if (isLoginError) {
			setIsLoginError(false)
		}
		setLoginInputValue(e.target.value)
	}
	const passwordOnChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		if (isPasswordError) {
			setIsPasswordError(false)
		}
		setPasswordInputValue(e.target.value)
	}

	return (
		<Card>
			<form
				className='flex items-center justify-center flex-col m-4'
				onSubmit={onSubmitHandler}
			>
				<label htmlFor={loginId}>Login</label>
				<input
					className={`focus:outline-indigo-500 border-2 border-transparent rounded-xl px-2 m-2 shadow-xl shadow-gray-700 focus:shadow-md focus:scale-95 focus:shadow-gray-700 ${
						isLoginError ? 'animate-shake bg-red-200 border-red-500' : ''
					} `}
					id={loginId}
					type='text'
					value={loginInputValue}
					onChange={loginOnChangeHandler}
				/>
				<label htmlFor={passwordId}>Password</label>
				<input
					className={`focus:outline-indigo-500 border-2 border-transparent rounded-xl px-2 m-2 shadow-xl shadow-gray-700 focus:shadow-md focus:scale-95 focus:shadow-gray-700 ${
						isPasswordError ? 'animate-shake bg-red-200 border-red-500' : ''
					}`}
					id={passwordId}
					type='text'
					value={passwordInputValue}
					onChange={passwordOnChangeHandler}
				/>
				<Button onClickHandler={onClickHandler}>sign in</Button>
			</form>
			{user && <Navigate to='/lk' />}
		</Card>
	)
}

export { LoginCard }
