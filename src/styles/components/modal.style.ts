import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

export const ModalDialog = styled.dialog`
	position: relative;
	box-shadow:
		0 3px 6px rgba(0, 0, 0, 0.16),
		0 3px 6px rgba(0, 0, 0, 0.23);
	background-color: rgba(58, 58, 58);
	border-width: 0;
	padding: 0;
	padding-top: 2rem;
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
	padding: 2.5rem;
`

export const ModalCancel = styled(FontAwesomeIcon)`
	color: rgba(255, 255, 255, 0.5);
	font-size: 175%;
	text-align: right;
	background: none;
	border: none;
	cursor: pointer;
	position: absolute;
	left: 90%;
	top: 3%;
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
		min-width: 10rem;
	}

	p {
		font-size: 75%;
		margin-left: auto;
		color: var(--aluminium);
		margin-bottom: 0;
	}
`

export const FormRowContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`

export const FormActionsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 3rem 0rem 0rem 0rem;
	margin-bottom: -1rem;
`

export const FormSubheader = styled.h1``

export const FormImage = styled.img`
	width: 20rem;
	margin: 1rem;
`

export const TextInput = styled.input`
	padding: 1rem;
	margin: 1rem;
	font: inherit;
	background: transparent !important;
	color: var(--aluminium);
	border-top: none;
	border-left: none;
	border-right: none;
	outline: none;
	min-width: 35rem;
	max-width: 50rem;
	vertical-align: bottom;
`

export const SelectInput = styled.select`
	padding: 1rem;
	margin: 1rem;
	font: inherit;
	background: transparent !important;
	color: var(--aluminium);
	border-top: none;
	border-left: none;
	border-right: none;
	outline: none;
	min-width: 35rem;
	max-width: 50rem;
	vertical-align: bottom;
`

export const ColorInput = styled.input`
	border: none;
	padding: 0;
	margin: 1rem;
	height: 8rem;
	width: 8rem;
`