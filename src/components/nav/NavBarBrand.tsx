import React from "react"

import { useAuth0 } from "@auth0/auth0-react"

import {
	NavLinkBrand,
	NavLinkLogo,
} from "../../styles/components/nav-bar.style"

function NavBarBrand() {
	const { isAuthenticated } = useAuth0()
	// go to studio if authenticated
	return (
		<NavLinkBrand to={isAuthenticated ? "/studio" : "/"}>
			<NavLinkLogo>Vowsuite</NavLinkLogo>
		</NavLinkBrand>
	)
}

export { NavBarBrand }
