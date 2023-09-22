// Dependencies
import * as React from "react"
import { useAuth0 } from "@auth0/auth0-react"
// Components
import { NavButton } from "../../styles/components/nav-bar.style"

export const LoginButton: React.FC = () => {
	const { loginWithRedirect } = useAuth0()

	// go to the studio on login
	const onLogin = async () => {
		await loginWithRedirect({
			appState: {
				returnTo: "/studio",
			},
			authorizationParams: {
				prompt: "login",
			},
		})
	}

	return <NavButton onClick={onLogin}>Log In</NavButton>
}
