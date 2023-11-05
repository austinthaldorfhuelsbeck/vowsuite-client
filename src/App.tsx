import { useRoutes } from "react-router-dom"

import { routes } from "./routes"
import { PageLoader } from "./components/common/PageLoader"
import { ContextProvider } from "./context/ContextProvider"
import { PageContainer } from "./styles/layouts/page-layout.style"

function App() {
	// load routes
	const content = useRoutes(routes)
	// display loading while useRoutes resolves
	return content ? (
		<ContextProvider>{content}</ContextProvider>
	) : (
		<PageContainer>
			<PageLoader />
		</PageContainer>
	)
}
// Exports
export { App }
