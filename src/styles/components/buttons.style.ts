import styled from "styled-components"

export const TabButton = styled.button`
	cursor: pointer;
	margin-left: 1rem;
	font-weight: 500;
	color: var(--aluminium);
	font-size: 14px;
	line-height: 16px;
	background-color: var(--dark-aluminium);
	width: 22rem;
	padding: 1rem 0;
	border: none;
	border-radius: 1rem 1rem 0 0;

	&:hover {
		color: var(--white);
	}
`

export const ButtonTitle = styled.label`
	padding: 0 1rem;
	cursor: pointer;
`

export const TransparentButton = styled.button`
	border: 2;
	background: none;
	border-radius: 0.8rem;
	font-family: var(--font-primary);
	font-weight: 600;
	color: var(--white);
	cursor: pointer;
	user-select: none;
	transition: background 0.3s ease-out, color 0.3s ease-out;
	min-width: 10rem;
	width: 100%;
	height: 5rem;
	padding: 1rem 1rem;
	margin: 0 0.5rem;
	font-size: 1.4rem;
	letter-spacing: 0.11rem;
	line-height: 2.4rem;

	@media (max-width: 715px) {
		min-width: 0;
		& label {
			font-size: 0;
		}
	}
`

export const ContextMenuButton = styled.button`
	align-self: end;
	margin-left: auto;
	padding: 0.3rem;
	color: var(--white);
	background: none;
	border: none;
	border-radius: 0.5rem;
	cursor: pointer;
`
