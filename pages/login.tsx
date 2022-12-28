import React, { useMemo } from 'react'

import * as yup from 'yup'
import { requiredValidationMessage } from '../src/constants'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IAcknowledgementResponse, ILogin } from '../src/interfaces'
import { routes } from '../src/routes'

import { ToastContainer, toast, TypeOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
	//Validation
	const validationSchema = useMemo(
		() =>
			yup.object({
				username: yup
					.string()
					.required(`Username ${requiredValidationMessage}`),
				password: yup
					.string()
					.required(`Password ${requiredValidationMessage}`),
			}),
		[],
	)

	const notify = (text: string, type: TypeOptions) => toast(text, { type })

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ILogin>({
		resolver: yupResolver(validationSchema),
	})

	async function handleLogin(data: ILogin) {
		try {
			console.log('Login: ', data)
			const res = await fetch(routes.login, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			const resData: IAcknowledgementResponse = await res.json()

			if (resData.success) {
				notify(resData.message, 'success')
			} else {
				notify(resData.message, 'warning')
			}
		} catch (error) {
			console.error(error)
			const caughtError: Error = error
			console.log('caughtError => ', caughtError)
			notify(caughtError.message, 'error')
		}
	}

	return (
		<div className='container'>
			<p className='flow-text center'>Login</p>
			<ToastContainer />
			<form
				className='col s12'
				autoComplete='off'
				onSubmit={handleSubmit(handleLogin)}
			>
				<div className='row'>
					<div className='input-field col s6'>
						<input
							name='username'
							required
							{...register('username')}
							id='username'
							type='text'
							className='validate'
						/>
						{errors.username && (
							<span className='helper-text red-text'>
								{errors.username.message}
							</span>
						)}
						<label
							className={`${errors.username ? 'red-text' : ''}`}
							htmlFor='username'
						>
							Username
						</label>
					</div>
					<div className='input-field col s6'>
						<input
							required
							name='password'
							{...register('password')}
							id='password'
							type='password'
							className='validate'
						/>
						{errors.password && (
							<span className='helper-text red-text'>
								{errors.password.message}
							</span>
						)}
						<label
							className={`${errors.password ? 'red-text' : ''}`}
							htmlFor='password'
						>
							Password
						</label>
					</div>

					<div className='input-field col s6'>
						<button
							className='btn teal  waves-effect waves-light'
							type='submit'
						>
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Login
