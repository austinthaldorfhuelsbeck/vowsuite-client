import styled from "styled-components"

export const CardContainer = styled.div`
	display: flex;
	flex-direction: row;
	cursor: default;
`

export const CardButton = styled.button`
	background: var(--aluminium);
	padding: 1rem;
	border-radius: 1rem 0 0 1rem;
	border: none;
	cursor: pointer;
	font-family: monospace;

	&:hover {
		background: var(--light-aluminium);
	}
`

export const CardText = styled.p`
	background: var(--black);
	padding: 1rem;
	margin: 0;
	border-radius: 0 1rem 1rem 0;
	color: var(--light-aluminium);
	font-family: monospace;
`
