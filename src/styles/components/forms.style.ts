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

// interface FormInputProps {
// 	type: string
// }

export const FormInput = styled.input`
	min-width: ${(props) => (props.type === "text" ? "30rem" : "8rem")};
	cursor: ${(props) => (props.type === "text" ? "text" : "pointer")};
	min-height: ${(props) => (props.type === "color" ? "8rem" : "none")};
	border: ${(props) =>
		props.type === "color" ? "none !important" : "solid 0.1rem"};
	opacity: ${(props) => (props.type === "checkbox" ? "0" : "100")};
	position: ${(props) =>
		props.type === "checkbox" ? "absolute" : "relative"};
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
	margin: 0.5rem;
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

export const ThumbnailImg = styled.img`
	object-fit: cover;
	width: 20rem;
	height: 10rem;
	cursor: pointer;
`

export const PreviewImg = styled(ThumbnailImg)`
	border-radius: 100%;
	width: 10rem;
	margin-top: 1rem;
`

export const ShadowboxImg = styled.img`
	object-fit: contain;
	width: 100%;
`

export const PreviewVideo = styled.video`
	max-width: 20rem;
	max-height: 20rem;
`

export const PreviewSubheader = styled.p`
	font-size: 50% !important;
`

export const DragUploadButton = styled(TransparentButton)`
	height: 100%;
	width: 15rem;
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

export const CheckboxContainer = styled(FormRow)`
	position: relative;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`

interface CheckboxProps {
	checked: boolean
}

export const Checkbox = styled.div<CheckboxProps>`
	display: inline-block;
	width: 3.5rem;
	height: 3.5rem;
	border: ${(props) =>
		props.checked
			? "0.4rem solid var(--yellow)"
			: "0.2rem solid var(--aluminium)"};
	border-radius: 3px;
	transition: all 150ms;

	svg {
		transition: all 150ms;
		margin: 0.6rem 0 0 0.75rem;
		color: var(--yellow);
		font-size: ${(props) => (props.checked ? "140%" : "0%")};
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
