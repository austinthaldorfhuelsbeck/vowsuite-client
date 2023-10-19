// Dependencies
import React, { PropsWithChildren } from "react"
import { ColorInput, TextInput } from "src/styles/components/modal.style"

type ComponentProps = {
	id: string
	label: string
	value: string
	onChange: (e: any) => void
}

interface TextProps extends ComponentProps {
	placeholder: string
}

function InputGroup({
	id,
	label,
	value,
	placeholder,
	onChange,
}: PropsWithChildren<TextProps>) {
	return (
		<>
			<label htmlFor={id}>{label}</label>
			<TextInput
				type="text"
				id={id}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</>
	)
}

function ColorGroup({
	id,
	label,
	value,
	onChange,
}: PropsWithChildren<ComponentProps>) {
	return (
		<>
			<label htmlFor={id}>{label}</label>
			<ColorInput
				type="color"
				id={id}
				value={value}
				onChange={onChange}
			/>
		</>
	)
}

export { InputGroup, ColorGroup }
