// Dependencies
import * as React from "react"
import { useRoutes } from "react-router-dom"
// Components
import routes from "./routes"
import { PageLoader } from "./components/common/PageLoader"
import { PageLayout } from "./components/common/PageLayout"
// Styles
import { PageContainer } from "./styles/layouts/page-layout.style"
import { ContextProvider } from "./context/ContextProvider"

export const App: React.FC = () => {
	// load routes
	const content = useRoutes(routes)

	// display loading while useRoutes resolve
	return content ? (
		<ContextProvider>
			<PageLayout>{content}</PageLayout>
		</ContextProvider>
	) : (
		<PageContainer>
			<PageLoader />
		</PageContainer>
	)
}
