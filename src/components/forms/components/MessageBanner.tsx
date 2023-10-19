import React, { PropsWithChildren } from "react"

import { copy } from "src/data/app-constants"
import { IAppError } from "src/interfaces/api"
import { Alert } from "src/styles/components/content.style"

function SuccessBanner() {
	return <Alert error={false}>{copy.formSuccess}</Alert>
}

function ErrorBanner({ message }: PropsWithChildren<IAppError>) {
	return <Alert error>{message}</Alert>
}

type MessageBannerProps = {
	success: boolean
	error: IAppError | undefined
}

function MessageBanner({
	success,
	error,
}: PropsWithChildren<MessageBannerProps>) {
	return (
		<>
			{error && <ErrorBanner message={error.message} />}
			{success && <SuccessBanner />}
		</>
	)
}

export { MessageBanner }
