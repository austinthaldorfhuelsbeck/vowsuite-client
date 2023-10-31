import { StrictMode } from "react"

import { BrowserRouter } from "react-router-dom"

import { createRoot } from "react-dom/client"

import { App } from "./App"
import { GlobalStyles } from "./styles/global-styles.style"
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate"

// Get root element
const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)
// Render
root.render(
	<StrictMode>
		<BrowserRouter>
			<Auth0ProviderWithNavigate>
				<GlobalStyles />
				<App />
			</Auth0ProviderWithNavigate>
		</BrowserRouter>
	</StrictMode>,
)
