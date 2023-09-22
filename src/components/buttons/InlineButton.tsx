// Dependencies
import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
// Styles
import {
	ButtonTitle,
	TransparentButton,
} from "../../styles/components/buttons.style"

interface Props {
	icon: IconDefinition | null
	title: string
	onClick: (e: any) => any
}

export const InlineButton: React.FC<Props> = ({ icon, title, onClick }) => (
	<TransparentButton onClick={onClick}>
		{icon && <FontAwesomeIcon icon={icon} />}
		<ButtonTitle>{title}</ButtonTitle>
	</TransparentButton>
)
