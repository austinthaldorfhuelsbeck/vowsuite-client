import styled from "styled-components"

export const ModalDialog = styled.dialog`
	position: relative;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	background-color: rgba(58, 58, 58);
	border-width: 0;
	padding: 0;
	min-width: 50rem;
	max-width: 90vw;
	border-radius: 0.5rem;
	cursor: default;

	&::backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(1px);
		animation: none;
	}
`

export const ModalDialogContainer = styled.div`
	box-sizing: border-box;
	min-height: 50px;
	min-width: 50px;
	padding: 1.5rem;
`
