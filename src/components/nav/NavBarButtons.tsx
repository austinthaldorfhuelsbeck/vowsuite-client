import React from "react"

import { useAuth0 } from "@auth0/auth0-react"

import { LoginButton } from "../buttons/LoginButton"
import { SignupButton } from "../buttons/SignupButton"
import { ProfileButton } from "../buttons/ProfileButton"
import { NavButtonContainer } from "../../styles/components/nav-bar.style"

function NavBarButtons() {
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

export { NavBarButtons }
