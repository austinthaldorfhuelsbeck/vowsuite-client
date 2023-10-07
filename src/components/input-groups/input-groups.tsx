// Dependencies
import * as React from "react"
// Styles
import {
	FormError,
	ModalFormContainer,
	ModalFormStyleContainer,
} from "../../styles/components/modal.style"
import { useFormContext } from "react-hook-form"
import { findInputError, isFormInvalid } from "../../utils"
import { IApiResponse } from "../../interfaces/api"
// Data
interface InputGroupProps {
	label: string
	type: string
	id: string
	placeholder: string
	validation: any
}

export const TextInputGroup: React.FC<InputGroupProps> = ({
	label,
	type,
	id,
	placeholder,
	validation,
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	const inputErrors: any = findInputError(errors, id)
	const isInvalid = isFormInvalid(inputErrors)

	return (
		<ModalFormContainer>
			<label htmlFor={id}>{label}</label>
			{isInvalid && (
				<InputError
					message={inputErrors.error.message}
					key={inputErrors.error.message}
				/>
			)}
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				{...register(id, validation)}
			/>
		</ModalFormContainer>
	)
}

const InputError: React.FC<{ message: string }> = ({ message }) => {
	return <FormError>{message}</FormError>
}

// export const ControlGroup: React.FC<ControlGroupProps> = ({
// 	id,
// 	title,
// 	options,
// 	onChange,
// 	value,
// }) => {
// 	return (
// 		<ModalFormContainer>
// 			<label htmlFor={id}>{title}</label>
// 			<select id={id} name={id} onChange={onChange} value={value}>
// 				{options.map((option, index) => (
// 					<option key={index}>{option}</option>
// 				))}
// 			</select>
// 		</ModalFormContainer>
// 	)
// }

// export const ColorInputGroup: React.FC<InputGroupProps> = ({
// 	id,
// 	title,
// 	onChange,
// 	value,
// }) => {
// 	return (
// 		<ModalFormStyleContainer>
// 			<label htmlFor={id}>{title}</label>
// 			<input
// 				type="color"
// 				id={id}
// 				name={id}
// 				onChange={onChange}
// 				value={value}
// 			/>
// 		</ModalFormStyleContainer>
// 	)
// }
