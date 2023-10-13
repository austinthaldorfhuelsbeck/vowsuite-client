import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

export const ModalDialog = styled.dialog`
	position: relative;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	background-color: rgba(58, 58, 58);
	border-width: 0;
	padding: 0;
	padding-top: 2rem;
	width: 50rem;
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
	padding: 2.5rem;
`

export const Form = styled.form`
	position: relative;
	color: var(--aluminium);
`

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 1rem;

	label {
		font-family: monospace;
	}

	input,
	select {
		padding: 1rem;
		font: inherit;
		background: transparent !important;
		color: var(--aluminium);
		border-top: none;
		border-left: none;
		border-right: none;
		outline: none;
		max-width: 100%;
		vertical-align: bottom;
	}

	input {
		width: 100%;
	}

	p {
		font-size: 75%;
		margin-left: auto;
		color: var(--aluminium);
		margin-bottom: 0;
	}
`

export const FormStyleContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-top: 1rem;

	label {
		font-family: monospace;
	}

	input {
		padding: 0;
		margin-left: 1rem;
	}
`

export const ModalCancel = styled(FontAwesomeIcon)`
	color: rgba(255, 255, 255, 0.5);
	font-size: 150%;
	text-align: right;
	background: none;
	border: none;
	cursor: pointer;
	position: absolute;
	left: 90%;
	top: 3%;
`

export const FormActionsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 3rem 0rem 0rem 0rem;
	margin-bottom: -1rem;
`
