// Dependencies
import * as React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate"
// Components
import { App } from "./App"
// Styles
import { GlobalStyles } from "./styles/global-styles.style"

// get root element
const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Auth0ProviderWithNavigate>
				<GlobalStyles />
				<App />
			</Auth0ProviderWithNavigate>
		</BrowserRouter>
	</React.StrictMode>,
)
