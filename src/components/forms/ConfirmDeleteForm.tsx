import React, { PropsWithChildren } from "react"

import { copy } from "../../data/app-constants"

import {
	ContentBlockHeader,
	ContentBlockSubheader,
} from "../../styles/components/content.style"
import { Form, FormRow } from "../../styles/components/forms.style"

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
			<FormRow>{children}</FormRow>
		</Form>
	)
}

export { VideoDeleteForm }
