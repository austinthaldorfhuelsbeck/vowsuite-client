import React, { useRef, MouseEvent, useEffect, PropsWithChildren } from "react"

import { faXmark } from "@fortawesome/free-solid-svg-icons"

import { useModal } from "../../hooks/useModal"
import { BlankSpan } from "../../styles/components/util.style"
import {
	ModalCancel,
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
		e.preventDefault()
		if (e.target === modalRef.current) toggle()
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
				<ModalDialogContainer>
					<>
						<ModalCancel icon={faXmark} onClick={toggle} />
						{content}
					</>
				</ModalDialogContainer>
			</ModalDialog>
		</>
	)
}

export { Modal }
