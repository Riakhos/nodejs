import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/layout.css'

const Layout = () => {

	return (
		<main>
			<Header />

			{/* Section pour l'affichage des composants enfant */}
			<div className="container mt-4">
				<Outlet />
			</div>

			<Footer />
		</main>
	)
}

export default Layout