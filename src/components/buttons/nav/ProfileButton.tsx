import React from "react"

import { useAuth0 } from "@auth0/auth0-react"
import { faSignOut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { ContextMenu } from "../../menus/ContextMenu"
import { imagePaths } from "../../../data/app-constants"
import { ButtonTitle } from "../../../styles/components/buttons.style"
import { NavProfileImg } from "../../../styles/components/nav-bar.style"
import { ContextListItem } from "../../../styles/components/lists.styles"
import {
	profileContextList,
	renderModalContextMenu,
} from "../../../data/context-lists"
import { useUserContext } from "../../../context/ContextProvider"

function ProfileButton() {
	const { logout } = useAuth0()
	const { user } = useUserContext()

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
				<NavProfileImg src={user?.img_URL || imagePaths.defaultUser} />
			}
			content={
				<>
					{renderModalContextMenu(profileContextList)}
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
