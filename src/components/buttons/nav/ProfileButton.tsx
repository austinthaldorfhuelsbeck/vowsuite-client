import React from "react"

import { useAuth0 } from "@auth0/auth0-react"
import { faSignOut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { ContextMenu } from "../../menus/ContextMenu"
import { imagePaths } from "../../../data/app-constants"
import { ButtonTitle } from "../../../styles/components/buttons.style"
import { NavProfileImg } from "../../../styles/components/nav-bar.style"
import { ContextListItem } from "../../../styles/components/lists.styles"
import { profileContextList, renderMenu } from "../../../data/context-lists"

function ProfileButton() {
	const { user, logout } = useAuth0()

	const onLogout = () => {
		logout({
			logoutParams: {
				// Go home on logout
				returnTo: window.location.origin,
			},
		})
	}

	return (
		<ContextMenu
			button={
				<NavProfileImg src={user?.picture || imagePaths.defaultUser} />
			}
			content={
				<>
					{renderMenu(profileContextList)}
					<ContextListItem onClick={onLogout}>
						<FontAwesomeIcon icon={faSignOut} />
						<ButtonTitle>Log Out</ButtonTitle>
					</ContextListItem>
				</>
			}
		/>
	)
}

export { ProfileButton }
