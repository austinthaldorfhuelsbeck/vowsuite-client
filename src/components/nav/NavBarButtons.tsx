// Dependencies
import * as React from "react"
import { useAuth0 } from "@auth0/auth0-react"
// Components
import { LoginButton } from "../buttons/nav/LoginButton"
import { ProfileButton } from "../buttons/nav/ProfileButton"
import { SignupButton } from "../buttons/nav/SignupButton"
import { NavButtonContainer } from "../../styles/components/nav-bar.style"

export const NavBarButtons: React.FC = () => {
	const { isAuthenticated } = useAuth0()

	return (
		<NavButtonContainer>
			{isAuthenticated ? (
				<ProfileButton />
			) : (
				<>
					<SignupButton />
					<LoginButton />
				</>
			)}
		</NavButtonContainer>
	)
}
