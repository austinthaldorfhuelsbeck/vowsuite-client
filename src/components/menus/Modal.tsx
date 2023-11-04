import React, { useRef, MouseEvent, useEffect, PropsWithChildren } from "react"

import { useModal } from "../../hooks/useModal"
import { BlankSpan } from "../../styles/components/util.style"
import {
	ModalDialog,
	ModalDialogContainer,
} from "../../styles/components/modal.style"

interface ComponentProps {
	button: JSX.Element
	content: JSX.Element
}

function Modal({ button, content }: PropsWithChildren<ComponentProps>) {
	// ref object
	const modalRef = useRef<HTMLDialogElement>(null)
	// modal opener hook
	const { isOpen, toggle } = useModal()

	// event listeners
	const onBackgroundClick = (e: MouseEvent<HTMLDialogElement>) => {
		if (e.target === modalRef.current) {
			e.preventDefault()
			toggle()
		}
	}

	// open and close when isOpen changes
	useEffect(() => {
		const ref = modalRef
		if (ref.current) {
			if (isOpen) {
				ref.current.showModal()
			} else {
				ref.current.close()
			}
		}
	}, [isOpen])

	return (
		<>
			<BlankSpan onClick={toggle}>{button}</BlankSpan>
			<ModalDialog ref={modalRef} onClick={onBackgroundClick}>
				<ModalDialogContainer>{content}</ModalDialogContainer>
			</ModalDialog>
		</>
	)
}

export { Modal }
