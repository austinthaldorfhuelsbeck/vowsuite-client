// Dependencies
import * as React from "react"
import {
	ModalDialog,
	ModalDialogContainer,
} from "../../styles/components/modal.style"

interface ModalFormProps {
	isOpen: boolean
	closeModal: () => void
	children: JSX.Element
}

export const Modal: React.FC<ModalFormProps> = ({
	isOpen,
	closeModal,
	children,
}) => {
	// ref object
	const modalRef = React.useRef<HTMLDialogElement>(null)

	// event listeners
	const onEscape = (e: React.KeyboardEvent<HTMLDialogElement>) => {
		e.preventDefault()
		if (e.key === "Escape") closeModal()
	}
	const onClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		e.preventDefault()
		if (e.target === modalRef.current) closeModal()
	}

	// open and close when isOpen changes
	React.useEffect(() => {
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
		<ModalDialog ref={modalRef} onKeyDown={onEscape} onClick={onClick}>
			<ModalDialogContainer>{children}</ModalDialogContainer>
		</ModalDialog>
	)
}
