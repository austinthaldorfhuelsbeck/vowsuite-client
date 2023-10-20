import React, { PropsWithChildren } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

import {
	ButtonTitle,
	TransparentButton,
} from "../../styles/components/buttons.style"

interface ComponentProps {
	icon: IconDefinition | undefined
	title: string
	onClick: ((e: any) => any) | undefined
}

function InlineButton({
	icon,
	title,
	onClick,
}: PropsWithChildren<ComponentProps>) {
	return (
		<TransparentButton onClick={onClick}>
			{icon && <FontAwesomeIcon icon={icon} />}
			<ButtonTitle>{title}</ButtonTitle>
		</TransparentButton>
	)
}

export { InlineButton }
