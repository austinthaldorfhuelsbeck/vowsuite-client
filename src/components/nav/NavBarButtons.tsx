import React from "react"

import { useAuth0 } from "@auth0/auth0-react"

import { LoginButton } from "../buttons/nav/LoginButton"
import { SignupButton } from "../buttons/nav/SignupButton"
import { ProfileButton } from "../buttons/nav/ProfileButton"
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
