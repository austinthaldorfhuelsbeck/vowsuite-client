import styled from "styled-components"
import { TransparentButton } from "./buttons.style"

export const Form = styled.form`
	position: relative;
	color: var(--aluminium);

	label {
		font-family: monospace;
		margin: auto 1rem;
		width: 6rem;
		padding: 0;
	}

	input,
	select {
		padding: 0.5rem;
		font: inherit;
		background: transparent !important;
		border-top: none;
		border-left: none;
		border-right: none;
		border-bottom: solid 0.1rem;
		outline: none;
		max-width: 100%;
		vertical-align: bottom;
		color: var(--aluminium);
	}

	p {
		font-size: 75%;
		margin-left: auto;
		margin-bottom: 0;
	}
`

interface FormInputProps {
	text?: boolean
	color?: boolean
}

export const FormInput = styled.input<FormInputProps>`
	position: relative;
	min-width: ${(props) => (props.text ? "30rem" : "8rem")};
	min-height: ${(props) => (props.color ? "8rem" : "none")};
	border: ${(props) => (props.color ? "none !important" : "solid 0.1rem")};
`

export const FormRow = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 0.5rem 0rem 0rem 0rem;
`

export const FormColumn = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem;
`

interface AlertProps {
	error?: boolean
	success?: boolean
}

export const Alert = styled.div<AlertProps>`
	font-family: monospace;
	padding: 0.5rem;
	border-radius: 1rem;
	background-color: ${(AlertProps) => {
		if (AlertProps.error) return "var(--orange)"
		if (AlertProps.success) return "var(--emerald)"
		return "var(--aluminium)"
	}};
	color: ${(AlertProps) =>
		AlertProps.error ? "var(--white)" : "var(--dark-aluminium)"};
`

interface PreviewImgProps {
	circle?: boolean
}

export const PreviewImg = styled.img<PreviewImgProps>`
	border-radius: ${(props) => (props.circle ? "100%" : "0%")};
	object-fit: cover;
	width: ${(props) => (props.circle ? "10rem" : "20rem")};
	height: 10rem;
`

export const PreviewVideo = styled.video`
	max-width: 20rem;
	max-height: 10rem;
`

export const PreviewSubheader = styled.p`
	font-size: 50% !important;
`

export const DragUploadButton = styled(TransparentButton)`
	height: 100%;
	width: 25rem;
	font-size: 400%;
	background: none;
	color: var(--aluminium);
	padding: 3rem 0;
	margin-left: 1rem;
	border: none;

	&:hover {
		background-color: var(--dark-aluminium);
		color: var(--white);
	}
`

export const ProgressBar = styled.div`
	background-color: var(--light-aluminium);
	border-radius: 20px;
	position: relative;
	margin: 3rem;
	height: 3rem;
	width: 30rem;
`

interface ProgressProps {
	done: number
}

export const ProgressBarProgress = styled.div<ProgressProps>`
	background: var(--pink-yellow-gradient);
	box-shadow: 0 3px 3px -5px #f2709c, 0 2px 5px #f2709c;
	border-radius: 20px;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	opacity: 1;
	transition: 1s ease 0.3s;
	width: ${(props) => `${props.done}%`};
`