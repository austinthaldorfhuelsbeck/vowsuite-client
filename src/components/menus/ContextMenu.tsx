// Dependencies
import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
// Styles
import { BlankSpan } from "../../styles/components/util.style"
import { ContextMenuContainer } from "../../styles/components/context-menu.style"
import { ContextMenuButton } from "../../styles/components/buttons.style"

interface ContextMenuProps {
	children: JSX.Element
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ children }) => {
	// ref for clicking outside
	const ref = React.useRef<HTMLDivElement>(null)

	// menu display state
	const [isMenu, setIsMenu] = React.useState<boolean>(false)
	const flipMenu = (currentState: boolean) => setIsMenu(!currentState)

	// event handlers
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		flipMenu(isMenu)
	}

	// event listeners
	React.useEffect(() => {
		const handleClickOutside = (e: any) => {
			// hide when click is outside context menu
			if (ref.current && !ref.current.contains(e.target)) {
				setIsMenu(false)
			}
		}
		// add listener to DOM
		document.addEventListener("click", handleClickOutside, true)
		// cleanup callback
		return () => {
			document.removeEventListener("click", handleClickOutside, true)
		}
	}, [ref, setIsMenu])

	return (
		<BlankSpan ref={ref}>
			<ContextMenuButton onClick={handleClick}>
				<FontAwesomeIcon icon={faEllipsis} />
			</ContextMenuButton>
			{isMenu && <ContextMenuContainer>{children}</ContextMenuContainer>}
		</BlankSpan>
	)
}
