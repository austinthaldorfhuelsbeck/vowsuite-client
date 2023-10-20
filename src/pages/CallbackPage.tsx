import React from "react"

import { useAuth0 } from "@auth0/auth0-react"

import {
	ContentBody,
	ContentContainer,
	ContentTitle,
} from "../styles/layouts/content-layout.style"

function CallbackPage() {
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

export { CallbackPage }
