import {
	faArrowAltCircleRight,
	faCancel,
	faRefresh,
} from "@fortawesome/free-solid-svg-icons"
import React, { PropsWithChildren } from "react"
import { InlineButton } from "src/components/buttons/InlineButton"
import { FormActionsContainer } from "src/styles/components/modal.style"

type ComponentProps = {
	formData: any
	onClear: () => void
	onReset: () => void
	onSubmit: (e: any) => void
}

function FormActions({
	formData,
	onClear,
	onReset,
	onSubmit,
}: PropsWithChildren<ComponentProps>) {
	return (
		<FormActionsContainer>
			<InlineButton icon={faRefresh} title="Reset" onClick={onReset} />
			<InlineButton icon={faCancel} title="Clear" onClick={onClear} />
			<InlineButton
				icon={faArrowAltCircleRight}
				title="Submit"
				onClick={() => onSubmit(formData)}
			/>
		</FormActionsContainer>
	)
}

export { FormActions }
