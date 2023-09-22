// Dependencies
import * as React from "react"
// Components
import { NavBar } from "../navigation/NavBar"
import { PageFooter } from "../landing/PageFooter"
// Styles
import {
	PageContainer,
	PageContent,
} from "../../styles/layouts/page-layout.style"

interface Props {
	children: JSX.Element
}

export const PageLayout: React.FC<Props> = ({ children }) => {
	return (
		<PageContainer>
			<NavBar />
			<PageContent>{children}</PageContent>
			<PageFooter />
		</PageContainer>
	)
}
