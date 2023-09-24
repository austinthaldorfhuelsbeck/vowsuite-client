// Dependencies
import * as React from "react"
import {
	ModalForm,
	ModalFormActionsContainer,
} from "../../styles/components/modal.style"
import {
	ContentBlockHeader,
	ContentBlockSubheader,
} from "../../styles/components/content-block.style"
import { copy } from "../../data/app-constants"

interface VideoDeleteFormProps {
	children: JSX.Element
}

export const VideoDeleteForm: React.FC<VideoDeleteFormProps> = ({
	children,
}) => {
	return (
		<ModalForm>
			<ContentBlockHeader>{copy.confirmDeleteHeader}</ContentBlockHeader>
			<ContentBlockSubheader>
				{copy.confirmDeleteMessage}
			</ContentBlockSubheader>
			<ModalFormActionsContainer>{children}</ModalFormActionsContainer>
		</ModalForm>
	)
}
