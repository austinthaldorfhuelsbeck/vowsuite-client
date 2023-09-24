// Dependencies
import * as React from "react"
// Styles
import {
	ModalFormContainer,
	ModalFormStyleContainer,
} from "../../styles/components/modal.style"
// Data
interface InputGroupProps {
	id: string
	title: string
	onChange: (e: any) => any
	value: string
}
interface TextInputGroupProps extends InputGroupProps {
	maxLength: number | undefined
}
interface ControlGroupProps extends InputGroupProps {
	options: string[]
}

export const TextInputGroup: React.FC<TextInputGroupProps> = ({
	id,
	title,
	maxLength,
	onChange,
	value,
}) => {
	return (
		<ModalFormContainer>
			<label htmlFor={id}>{title}</label>
			<input
				id={id}
				type="text"
				name={id}
				placeholder={title}
				maxLength={maxLength}
				onChange={onChange}
				value={value}
			/>
			{maxLength && <p>{`${value.length} / ${maxLength}`}</p>}
		</ModalFormContainer>
	)
}

export const ControlGroup: React.FC<ControlGroupProps> = ({
	id,
	title,
	options,
	onChange,
	value,
}) => {
	return (
		<ModalFormContainer>
			<label htmlFor={id}>{title}</label>
			<select id={id} name={id} onChange={onChange} value={value}>
				{options.map((option, index) => (
					<option key={index}>{option}</option>
				))}
			</select>
		</ModalFormContainer>
	)
}

export const ColorInputGroup: React.FC<InputGroupProps> = ({
	id,
	title,
	onChange,
	value,
}) => {
	return (
		<ModalFormStyleContainer>
			<label htmlFor={id}>{title}</label>
			<input
				type="color"
				id={id}
				name={id}
				onChange={onChange}
				value={value}
			/>
		</ModalFormStyleContainer>
	)
}
