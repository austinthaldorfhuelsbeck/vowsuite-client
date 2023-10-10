// Dependencies
import * as React from "react"
// Components
import { NavBar } from "../nav/NavBar"
import { PageFooter } from "../static/PageFooter"
// Styles
import {
	PageContainer,
	PageContent,
} from "../../styles/layouts/page-layout.style"
import { ContextProvider } from "../../context/ContextProvider"

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
