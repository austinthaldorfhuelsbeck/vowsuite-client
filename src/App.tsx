// Dependencies
import * as React from "react"
import { useRoutes } from "react-router-dom"
// Components
import routes from "./routes"
import { PageLoader } from "./components/common/PageLoader"
// Styles
import { PageContainer } from "./styles/layouts/page-layout.style"
import { ContextProvider } from "./context/ContextProvider"

export const App: React.FC = () => {
	// load routes
	const content = useRoutes(routes)

	// display loading while useRoutes resolve
	return content ? (
		<ContextProvider>{content}</ContextProvider>
	) : (
		<PageContainer>
			<PageLoader />
			Loading...
		</PageContainer>
	)
}
