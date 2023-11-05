import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled, { css } from "styled-components"
import { ButtonTitle } from "./buttons.style"

export const List = styled.ul`
	list-style: none;
	padding-inline-start: 0;
`

export const SelectorListItem = styled.li`
	display: flex;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.04);
	cursor: pointer;
	margin-top: 1.6rem;
	color: rgba(206, 206, 206, 1);
	font-size: 14px;
	line-height: 16px;
	list-style-type: none;
	border-radius: 0 1rem 1rem 0;
	width: 100%;

	&:hover {
		color: var(--white);
		background-color: rgba(255, 255, 255, 0.15);
	}

	${(props) =>
		props["aria-selected"] &&
		css`
			color: var(--white);
			background-color: rgba(255, 255, 255, 0.2);
		`}
`

export const ContextListItem = styled.li`
	width: 100%;

	& label {
		cursor: pointer;
	}

	&:hover {
		& label {
			text-decoration-line: underline;
			text-decoration-style: solid;
			text-decoration-color: var(--indigo);
			text-decoration-thickness: 2px;
			text-underline-offset: 8px;
		}
	}
`

export const ContextListButton = styled(FontAwesomeIcon)`
	margin-right: 1rem;
	margin-bottom: 1rem;
`

export const SidebarLabel = styled(ButtonTitle)`
	padding: 1.5rem 1rem 2.5rem 1rem;
	width: 100%;
`
