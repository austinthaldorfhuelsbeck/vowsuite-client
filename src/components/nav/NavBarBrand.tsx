// Dependencies
import * as React from "react"
import { useAuth0 } from "@auth0/auth0-react"
// Styles
import {
	NavLinkBrand,
	NavLinkLogo,
} from "../../styles/components/nav-bar.style"

export const NavBarBrand: React.FC = () => {
	const { isAuthenticated } = useAuth0()
	// go to studio if authenticated
	return (
		<NavLinkBrand to={isAuthenticated ? "/studio" : "/"}>
			<NavLinkLogo>Vowsuite</NavLinkLogo>
		</NavLinkBrand>
	)
}
