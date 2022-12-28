import React, { Fragment, useEffect } from 'react'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import { routes } from '../src/routes'
import {
	IAcknowledgementResponse,
	ICurrentUser,
	IGetResponse,
} from '../src/interfaces'
import { getMeAtom } from '../src/recoil'
import { useRecoilState } from 'recoil'
import { toast, TypeOptions } from 'react-toastify'

const Navbar = () => {
	const { isValidating, data, error } = useSWR<IGetResponse, Error>(
		routes.getMe,
	)

	const [getMe, setGetMe] = useRecoilState<ICurrentUser | null>(getMeAtom)

	useEffect(() => {
		if (data && data.success) {
			setGetMe(data.data)
		}
	}, [data])

	useEffect(() => {
		if (error) {
			setGetMe(null)
		}
	}, [error])

	console.log(isValidating, data, error)

	const notify = (text: string, type: TypeOptions) => toast(text, { type })

	async function handleLogout(_e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
		try {
			const res = await fetch(routes.logout, {
				method: 'DELETE',
				credentials: 'include',
			})
			const resData: IAcknowledgementResponse = await res.json()

			if (resData.success) {
				notify(resData.message, 'info')
				mutate(routes.getMe)
			} else if (resData.errors) {
				notify(resData.errors.toString(), 'error')
			}
		} catch (err) {
			console.error(err)
			const caughtError: Error = err
			console.log('caughtError => ', caughtError)
			notify(caughtError.message, 'error')
		}
	}

	const authLinks = (
		<Fragment>
			<li>
				<Link href='/dashboard'>Dashboard</Link>
			</li>
			<li onClick={handleLogout}>
				<Link href='/'>Logout</Link>
			</li>
		</Fragment>
	)

	const guestLinks = (
		<Fragment>
			<li>
				<Link href='/login'>Login</Link>
			</li>
			<li>
				<Link href='/register'>Register</Link>
			</li>
		</Fragment>
	)

	return (
		<Fragment>
			<nav className='teal'>
				<div className='nav-wrapper container'>
					<Link href='/' className='brand-logo'>
						Phoenix
					</Link>
					<ul className='right'>{getMe ? authLinks : guestLinks}</ul>
				</div>
			</nav>
		</Fragment>
	)
}

export default Navbar
