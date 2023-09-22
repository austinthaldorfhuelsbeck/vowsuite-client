// Dependencies
import * as React from "react"
// Components
import { NavBarBrand } from "./NavBarBrand"
import { NavBarButtons } from "./NavBarButtons"
// Styles
import {
	NavBarContainer,
	NavContainer,
} from "../../styles/components/nav-bar.style"

export const NavBar: React.FC = () => {
	return (
		<NavContainer>
			<NavBarContainer>
				<NavBarBrand />
				<NavBarButtons />
			</NavBarContainer>
		</NavContainer>
	)
}
