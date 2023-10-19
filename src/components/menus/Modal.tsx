import React, { PropsWithChildren, ReactNode } from "react"

import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { BlankSpan } from "../../styles/components/util.style"
import {
	ModalCancel,
	ModalDialog,
	ModalDialogContainer,
} from "../../styles/components/modal.style"
import { useModal } from "src/hooks/useModal"

type ComponentProps = {
	button: ReactNode
	content: ReactNode
}

function Modal({ button, content }: PropsWithChildren<ComponentProps>) {
	// modal opener hook
	const { ref, toggle, onClick } = useModal()

	return (
		<>
			<BlankSpan onClick={toggle}>{button}</BlankSpan>
			<ModalDialog ref={ref} onClick={onClick}>
				<ModalDialogContainer>
					<ModalCancel icon={faXmark} onClick={toggle} />
					{content}
				</ModalDialogContainer>
			</ModalDialog>
		</>
	)
}

export { Modal }
