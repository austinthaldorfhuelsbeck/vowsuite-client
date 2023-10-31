import { PropsWithChildren } from "react"

import { NavBar } from "../nav/NavBar"
import { PageFooter } from "../static/PageFooter"
import {
	PageContainer,
	PageContent,
} from "../../styles/layouts/page-layout.style"

interface ComponentProps {
	children: JSX.Element
}

function PageLayout({ children }: PropsWithChildren<ComponentProps>) {
	return (
		<PageContainer>
			<NavBar />
			<PageContent>{children}</PageContent>
			<PageFooter />
		</PageContainer>
	)
}

export { PageLayout }
