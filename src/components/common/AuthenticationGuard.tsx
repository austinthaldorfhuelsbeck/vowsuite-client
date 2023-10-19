// Dependencies
import React, { ComponentType, PropsWithChildren } from "react"
import { withAuthenticationRequired } from "@auth0/auth0-react"
// Components
import { PageLoader } from "./PageLoader"
// Styles
import { PageContent } from "../../styles/layouts/page-layout.style"

interface ComponentProps {
	component: ComponentType
}

function AuthenticationGuard({ component }: PropsWithChildren<ComponentProps>) {
	// only return if authenticated
	const Component = withAuthenticationRequired(component, {
		onRedirecting: () => (
			<PageContent>
				<PageLoader />
			</PageContent>
		),
	})

	return <Component />
}

export { AuthenticationGuard }
