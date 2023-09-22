// Dependencies
import * as React from "react"
import { useAuth0 } from "@auth0/auth0-react"
// Styles
import {
	ContentBody,
	ContentContainer,
	ContentTitle,
} from "../styles/layouts/content-layout.style"

export const CallbackPage: React.FC = () => {
	const { error } = useAuth0()

	return error ? (
		<ContentContainer>
			<ContentTitle id="page-title">Error</ContentTitle>
			<ContentBody id="page-description">{error.message}</ContentBody>
		</ContentContainer>
	) : (
		<></>
	)
}
