// Dependencies
import * as React from "react"
import { Form, FormActionsContainer } from "../../styles/components/modal.style"
import {
	ContentBlockHeader,
	ContentBlockSubheader,
} from "../../styles/components/content.style"
import { copy } from "../../data/app-constants"

interface VideoDeleteFormProps {
	children: JSX.Element
}

export const VideoDeleteForm: React.FC<VideoDeleteFormProps> = ({
	children,
}) => {
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
