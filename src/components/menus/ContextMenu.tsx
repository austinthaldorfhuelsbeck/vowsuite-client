// Dependencies
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as React from "react"

interface ContextMenuProps {
	children: JSX.Element
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ children }) => {
	return (
		<>
			<button>
				<FontAwesomeIcon icon={faEllipsis} />
			</button>
			{children}
		</>
	)
}
