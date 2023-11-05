import { useAuth0 } from "@auth0/auth0-react"

import { NavButton } from "../../styles/components/nav-bar.style"

function LoginButton() {
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

export { LoginButton }
