import React, { useMemo } from 'react'
import Layout from '../components/Layout'
import * as yup from 'yup'
import { requiredValidationMessage } from '../src/constants'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IAcknowledgementResponse, IRegister } from '../src/interfaces'
import axios from 'axios'
import { routes } from '../src/routes'

import { ToastContainer, toast, TypeOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
	//Validation
	const validationSchema = useMemo(
		() =>
			yup.object({
				name: yup
					.string()
					.min(3)
					.max(10)
					.required(`Name ${requiredValidationMessage}`),
				email: yup
					.string()
					.email(`Email is not valid`)
					.required(`Email ${requiredValidationMessage}`),
				username: yup
					.string()
					.min(3)
					.max(10)
					.required(`Username ${requiredValidationMessage}`),
				password: yup
					.string()
					.min(3)
					.max(10)
					.required(`Password ${requiredValidationMessage}`),
			}),
		[],
	)

	const notify = (text: string, type: TypeOptions) => toast(text, { type })

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IRegister>({
		resolver: yupResolver(validationSchema),
	})

	async function handleRegister(data: IRegister) {
		try {
			console.log('Register: ', data)
			const res = await fetch(routes.register, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			const resData: IAcknowledgementResponse = await res.json()
			if (resData.success) {
				notify(resData.message, 'success')
			} else if (resData.errors) {
				notify(resData.errors.toString(), 'error')
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
			<p className='flow-text center'>Register</p>
			<ToastContainer />
			<form
				className='col s12'
				autoComplete='off'
				onSubmit={handleSubmit(handleRegister)}
			>
				<div className='row'>
					<div className='input-field col s6'>
						<input
							name='name'
							required
							{...register('name')}
							id='name'
							type='text'
							className='validate'
						/>
						{errors.name && (
							<span className='helper-text red-text'>
								{errors.name.message}
							</span>
						)}
						<label
							className={`${errors.name ? 'red-text' : ''}`}
							htmlFor='name'
						>
							Name
						</label>
					</div>
					<div className='input-field col s6'>
						<input
							required
							name='email'
							{...register('email')}
							id='email'
							type='email'
							className='validate'
						/>
						{errors.email && (
							<span className='helper-text red-text'>
								{errors.email.message}
							</span>
						)}
						<label
							className={`${errors.email ? 'red-text' : ''}`}
							htmlFor='email'
						>
							Email
						</label>
					</div>

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

export default Register
