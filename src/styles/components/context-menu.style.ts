import styled from "styled-components"
import { List } from "./lists.styles"

export const ContextMenuContainer = styled(List)`
	position: absolute;
	min-width: 16rem;
	background-color: var(--dark-aluminium);
	border-radius: 0.5rem;
	padding: 0;

	& li {
		display: flex;
		justify-content: start;
		padding: 1.5rem 1.8rem;
		cursor: pointer;
		font-size: 13px;
		letter-spacing: 0.05rem;
		line-height: 16px;

		&:hover {
			background-color: rgb(73, 73, 73);
			border-radius: 0.5rem;
		}
	}
`
