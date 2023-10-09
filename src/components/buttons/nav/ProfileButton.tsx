// Dependencies
import * as React from "react"
import { useAuth0 } from "@auth0/auth0-react"
// Components
import { NavProfileImg } from "../../../styles/components/nav-bar.style"
import { ContextMenu } from "../../menus/ContextMenu"
import { imagePaths } from "../../../data/app-constants"
import { profileContextList, renderMenu } from "../../../data/context-lists"

export const ProfileButton: React.FC = () => {
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
			content={<>{renderMenu(profileContextList)}</>}
		/>
	)
}
