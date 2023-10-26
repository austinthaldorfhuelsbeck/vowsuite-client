import React, { PropsWithChildren } from "react"

import { useFormContext } from "react-hook-form"

import { findInputError, isFormInvalid } from "./utils"
import { Alert } from "../../styles/components/content.style"
import { FormColumn } from "../../styles/components/forms.style"

// Data
interface BaseProps {
	label: string
	id: string
	validation: any
}
interface InputProps extends BaseProps {
	type: string
	placeholder: string | undefined
}
interface ControlProps extends BaseProps {
	options: string[]
}

function InputGroup({
	label,
	type,
	id,
	placeholder,
}: PropsWithChildren<InputProps>) {
	// TODO: DRY

	return (
		<FormColumn>
			<label htmlFor={id}>{label}</label>

			<input name={id} type={type} placeholder={placeholder} />
		</FormColumn>
	)
}

function ControlGroup({
	label,
	id,
	options,
	validation,
}: PropsWithChildren<ControlProps>) {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	const inputErrors: any = findInputError(errors, id)
	const isInvalid = isFormInvalid(inputErrors)

	return (
		<FormColumn>
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
		</FormColumn>
	)
}

function InputError({ message }: PropsWithChildren<{ message: string }>) {
	return <Alert error={true}>{message}</Alert>
}

export { InputGroup, ControlGroup }
