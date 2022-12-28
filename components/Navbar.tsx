import React, { Fragment } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { routes } from '../src/routes'
import { fetcher } from '../src/fetcher'
import { IGetResponse } from '../src/interfaces'
import { NextPageContext } from 'next'

const Navbar = () => {
	const { isValidating, data, error } = useSWR<IGetResponse, Error>(
		routes.getMe,
	)

	return (
		<Fragment>
			<nav className='teal'>
				<div className='nav-wrapper container'>
					<Link href='/' className='brand-logo'>
						Phoenix
					</Link>
					<ul className='right'>
						<li>
							<Link href='/login'>Login</Link>
						</li>
						<li>
							<Link href='/register'>Register</Link>
						</li>
					</ul>
				</div>
			</nav>
		</Fragment>
	)
}

export default Navbar
