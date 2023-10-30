import React from "react"

import { NavBarBrand } from "./NavBarBrand"
import { NavBarButtons } from "./NavBarButtons"
import {
	NavBarContainer,
	NavContainer,
} from "../../styles/components/nav-bar.style"

function NavBar() {
	return (
		<NavContainer>
			<NavBarContainer>
				<NavBarBrand />
				<NavBarButtons />
			</NavBarContainer>
		</NavContainer>
	)
}

export { NavBar }
