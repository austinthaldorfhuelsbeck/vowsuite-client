// Dependencies
import * as React from "react"
import { withAuthenticationRequired } from "@auth0/auth0-react"
// Components
import { PageLoader } from "./PageLoader"
// Styles
import { PageContent } from "../../styles/layouts/page-layout.style"

interface Props {
	component: React.ComponentType
}

export const AuthenticationGuard: React.FC<Props> = ({ component }) => {
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
