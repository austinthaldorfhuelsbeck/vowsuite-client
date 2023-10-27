import React, { ChangeEvent, PropsWithChildren } from "react"

import { Alert } from "../../styles/components/content.style"
import { ErrorProps } from "./utils/inputValidation"

// Data
interface BaseProps {
	label: string
	id: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	validation: any
}
interface InputProps extends BaseProps {
	type: string
	placeholder: string | undefined
	value: string
}

function InputError({ validation, value }: PropsWithChildren<ErrorProps>) {
	if (validation.required.value && value.length === 0) {
		return <Alert error>{validation.required.message}</Alert>
	}
	if (value.length > validation.maxLength?.value) {
		return <Alert error>{validation.maxLength.message}</Alert>
	}
	return <></>
}

function InputGroup({
	label,
	type,
	id,
	placeholder,
	value,
	onChange,
	validation,
}: PropsWithChildren<InputProps>) {
	return (
		<>
			<label htmlFor={id}>{label}</label>
			<input
				name={id}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			<InputError validation={validation} value={value}/>
		</>
	)
}

// function ControlGroup({
// 	label,
// 	id,
// 	options,
// }: PropsWithChildren<ControlProps>) {
// 	const {
// 		formState: { errors },
// 	} = useFormContext()

// 	const inputErrors: any = findInputError(errors, id)
// 	const isInvalid = isFormInvalid(inputErrors)

// 	return (
// 		<FormColumn>
// 			<label htmlFor={id}>{label}</label>
// 			{isInvalid && (
// 				<InputError
// 					message={inputErrors.error.message}
// 					key={inputErrors.error.message}
// 				/>
// 			)}
// 			<select id={id} {...register(id, validation)}>
// 				{options.map((option, index) => (
// 					<option key={index}>{option}</option>
// 				))}
// 			</select>
// 		</FormColumn>
// 	)
// }

export { InputGroup }
