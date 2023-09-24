// Dependencies
import * as React from "react"
import { useAuth0 } from "@auth0/auth0-react"
// Components
import { NavButton, NavProfileImg } from "../../styles/components/nav-bar.style"

export const LogoutButton: React.FC = () => {
	const { user, logout } = useAuth0()

	// Go home on logout
	const onLogout = () => {
		logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		})
	}

	if (user?.picture)
		return <NavProfileImg src={user.picture} onClick={onLogout} />
	return <NavButton onClick={onLogout}>Log Out</NavButton>
}
