// Dependencies
import * as React from "react"
import {
	ModalDialog,
	ModalDialogContainer,
} from "../../styles/components/modal.style"

interface ModalFormProps {
	isOpen: boolean
	toggle: () => void
	children: JSX.Element
}

export const Modal: React.FC<ModalFormProps> = ({
	isOpen,
	toggle,
	children,
}) => {
	// ref object
	const modalRef = React.useRef<HTMLDialogElement>(null)

	// event listeners
	const onClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		e.preventDefault()
		if (e.target === modalRef.current) toggle()
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
		<ModalDialog ref={modalRef} onClick={onClick}>
			<ModalDialogContainer>{children}</ModalDialogContainer>
		</ModalDialog>
	)
}
