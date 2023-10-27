import styled from "styled-components"
import { TransparentButton } from "./buttons.style"

export const Form = styled.form`
	position: relative;
	color: var(--aluminium);

	label {
		font-family: monospace;
		margin-top: 1rem;
	}

	input,
	select {
		padding: 1rem;
		font: inherit;
		background: transparent !important;
		border-top: none;
		border-left: none;
		border-right: none;
		outline: none;
		max-width: 100%;
		vertical-align: bottom;
		color: var(--aluminium);
	}

	input {
		width: 100%;
		min-width: 35rem;
	}

	p {
		font-size: 75%;
		margin-left: auto;
		margin-bottom: 0;
	}
`

export const FormRow = styled.div`
	display: flex;
	justify-content: space-between;
    align-items: center;
	padding: 3rem 0rem 0rem 0rem;
`

export const FormColumn = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem;
`

export const PreviewImg = styled.img`
	border-radius: 100%;
	width: 10rem;
	height: 10rem;
    
`

export const DragUploadButton = styled(TransparentButton)`
    height: 100%;
    width: 30rem;
    font-size: 400%;
    background: none;
    color: var(--aluminium);
    padding: 3rem 0;
    margin-right: 3rem;
    &:hover {
        background-color: var(--dark-aluminium);
		color: var(--white);
	}
`