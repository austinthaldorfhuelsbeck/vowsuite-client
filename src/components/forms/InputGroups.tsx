import React, { PropsWithChildren } from "react"

import { useFormContext } from "react-hook-form"

import { findInputError, isFormInvalid } from "./utils"
import { Alert } from "../../styles/components/content.style"
import { FormContainer } from "../../styles/components/modal.style"

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

function InputGroup({
	label,
	type,
	id,
	placeholder,
	validation,
}: PropsWithChildren<InputGroupProps>) {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	const inputErrors: any = findInputError(errors, id)
	const isInvalid = isFormInvalid(inputErrors)

	return (
		<FormContainer>
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
		</FormContainer>
	)
}

function ControlInputGroup({
	label,
	id,
	options,
	validation,
}: PropsWithChildren<ControlGroupProps>) {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	const inputErrors: any = findInputError(errors, id)
	const isInvalid = isFormInvalid(inputErrors)

	return (
		<FormContainer>
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
		</FormContainer>
	)
}

function InputError({ message }: PropsWithChildren<{ message: string }>) {
	return <Alert error={true}>{message}</Alert>
}

export { InputGroup, ControlInputGroup }
