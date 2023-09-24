// Dependencies
import * as React from "react"
import { useAuth0 } from "@auth0/auth0-react"
// Components
import { NavButton } from "../../../styles/components/nav-bar.style"

export const SignupButton: React.FC = () => {
	const { loginWithRedirect } = useAuth0()

	// go to the studio on signup
	const onSignup = async () => {
		await loginWithRedirect({
			appState: {
				returnTo: "/studio",
			},
			authorizationParams: {
				prompt: "login",
				screen_hint: "signup",
			},
		})
	}

	return <NavButton onClick={onSignup}>Sign Up</NavButton>
}
