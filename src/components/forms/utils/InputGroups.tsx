import { ChangeEvent, PropsWithChildren } from "react"

import { ErrorProps } from "./inputValidation"
import {
	Alert,
	Checkbox,
	CheckboxContainer,
	FormInput,
	FormRow,
} from "../../../styles/components/forms.style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

// Data
interface BaseProps {
	label?: string
	id: string
	onChange: (e: ChangeEvent<any>) => void
	validation: any
}
interface InputProps extends BaseProps {
	type: string
	placeholder?: string
	value: string
}
interface ControlProps extends BaseProps {
	options: any[]
	value: number
}
interface CheckboxProps extends BaseProps {
	type: string
	value: boolean
}

function InputError({ validation, value }: PropsWithChildren<ErrorProps>) {
	if (validation.required.value && value?.length === 0) {
		return <Alert error>{validation.required.message}</Alert>
	}
	if (
		value &&
		validation.maxLength &&
		value.length > validation.maxLength.value
	) {
		return <Alert error>{validation.maxLength?.message}</Alert>
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
		<FormRow>
			{label && <label htmlFor={id}>{label}</label>}
			<FormInput
				name={id}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			<InputError validation={validation} value={value} />
		</FormRow>
	)
}

function ControlGroup({
	label,
	id,
	options,
	value,
	onChange,
	validation,
}: PropsWithChildren<ControlProps>) {
	return (
		<FormRow>
			<label htmlFor={id}>{label}</label>
			<select name={id} value={value} onChange={onChange}>
				{options.map((option: any) => (
					<option key={option.font_id} value={option.font_id}>
						{option.font_name}
					</option>
				))}
			</select>
			<InputError validation={validation} value={value.toString()} />
		</FormRow>
	)
}

function CheckboxGroup({
	label,
	type,
	id,
	value,
	onChange,
	validation,
}: PropsWithChildren<CheckboxProps>) {
	return (
		<CheckboxContainer>
			<label htmlFor={id}>{label}</label>
			<Checkbox checked={value} onClick={onChange}>
				<FontAwesomeIcon icon={faCheck} />
			</Checkbox>

			<InputError validation={validation} value={value.toString()} />
		</CheckboxContainer>
	)
}

export { InputError, InputGroup, ControlGroup, CheckboxGroup }
