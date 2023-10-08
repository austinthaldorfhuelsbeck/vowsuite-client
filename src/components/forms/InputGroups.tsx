// Dependencies
import * as React from "react"
// Styles
import { ModalFormContainer } from "../../styles/components/modal.style"
import { useFormContext } from "react-hook-form"
import { findInputError, isFormInvalid } from "../../utils"
import { Alert } from "../../styles/components/content.style"

// Data
interface BaseProps {
	label: string
	id: string
	validation: any
}
interface InputGroupProps extends BaseProps {
	type: string
	placeholder: string | undefined
}
interface ControlGroupProps extends BaseProps {
	options: string[]
}

export const InputGroup: React.FC<InputGroupProps> = ({
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

export const ControlInputGroup: React.FC<ControlGroupProps> = ({
	label,
	id,
	options,
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
			<select id={id} {...register(id, validation)}>
				{options.map((option, index) => (
					<option key={index}>{option}</option>
				))}
			</select>
		</ModalFormContainer>
	)
}

const InputError: React.FC<{ message: string }> = ({ message }) => {
	return <Alert error={true}>{message}</Alert>
}

// export const ColorTextInputGroup: React.FC<TextInputGroupProps> = ({
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
