// Dependencies
import * as React from "react"

export const useModal = () => {
	const [isOpen, setisOpen] = React.useState(false)

	const toggle = () => {
		setisOpen(!isOpen)
	}

	return {
		isOpen,
		toggle,
	}
}
