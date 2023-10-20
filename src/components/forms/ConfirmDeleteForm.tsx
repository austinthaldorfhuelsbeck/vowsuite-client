import React, { PropsWithChildren } from "react"

import { copy } from "../../data/app-constants"
import { Form, FormActionsContainer } from "../../styles/components/modal.style"
import {
	ContentBlockHeader,
	ContentBlockSubheader,
} from "../../styles/components/content.style"

interface ComponentProps {
	children: JSX.Element
}

function VideoDeleteForm({ children }: PropsWithChildren<ComponentProps>) {
	return (
		<Form>
			<ContentBlockHeader>{copy.confirmDeleteHeader}</ContentBlockHeader>
			<ContentBlockSubheader>
				{copy.confirmDeleteMessage}
			</ContentBlockSubheader>
			<FormActionsContainer>{children}</FormActionsContainer>
		</Form>
	)
}

export { VideoDeleteForm }
