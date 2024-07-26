import { useEffect, useId, useState } from 'react'
import { Button } from '../../../shared/ui/Button'
import { Card } from '../../../shared/ui/Card'
import { Navigate } from 'react-router-dom'
import { useUser } from '../../../store/users/userStore'
import { useGetUserByLogin } from '../../../store/users/api/useGetUserByLogin'
import { HTTPError } from 'ky'
import { createUser } from '../../../store/users/api/createUser'

const RegistrationForm = () => {
	const loginId = useId()
	const passwordId = useId()
	const [loginInputValue, setLoginInputValue] = useState('')
	const [passwordInputValue, setPasswordInputValue] = useState('')
	const [loginIsNotBusy, setLoginIsNotBusy] = useState(false)
	const [isLoginError, setIsLoginError] = useState(false)
	const [isPasswordError, setIsPasswordError] = useState(false)
	const { setUser, user } = useUser()
	const { error } = useGetUserByLogin(loginInputValue)

	useEffect(() => {
		if (error && loginInputValue !== '') {
			if (
				(error instanceof HTTPError && error.response.status === 404) ||
				(error instanceof Error && error.message === 'Not found')
			) {
				setLoginIsNotBusy(true)
			} else {
				setLoginIsNotBusy(false)
			}
		}
	}, [error, loginInputValue])

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
			if (!loginIsNotBusy) {
				setIsLoginError(true)
			} else {
				const user = await createUser(loginInputValue, passwordInputValue)
				setUser(user)
			}
		}
	}
	const onClickHandler = () => {
		console.log('clicked')
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
					} ${loginIsNotBusy ? 'bg-green-300' : ''}`}
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
				<Button onClickHandler={onClickHandler}>Register new user</Button>
			</form>
			{user && <Navigate to='/lk' />}
		</Card>
	)
}

export { RegistrationForm }
