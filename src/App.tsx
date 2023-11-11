import { useRoutes } from "react-router-dom"

import { routes } from "./routes"
import { ContextProvider } from "./context/ContextProvider"
import { Loader, PageContainer } from "./styles/layouts/page-layout.style"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

function App() {
	// load routes
	const content = useRoutes(routes)
	// display loading while useRoutes resolves
	return content ? (
		<ContextProvider>{content}</ContextProvider>
	) : (
		<PageContainer>
			<Loader icon={faSpinner} />
		</PageContainer>
	)
}
// Exports
export { App }
