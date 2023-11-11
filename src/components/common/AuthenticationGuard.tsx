import React, { ComponentType, PropsWithChildren } from "react"

import { withAuthenticationRequired } from "@auth0/auth0-react"

import { Loader, PageContent } from "../../styles/layouts/page-layout.style"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

interface ComponentProps {
	component: ComponentType
}

function AuthenticationGuard({ component }: PropsWithChildren<ComponentProps>) {
	// only return if authenticated
	const Component = withAuthenticationRequired(component, {
		onRedirecting: () => (
			<PageContent>
				<Loader icon={faSpinner} />
			</PageContent>
		),
	})

	return <Component />
}

export { AuthenticationGuard }
