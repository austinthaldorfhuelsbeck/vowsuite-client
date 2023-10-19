export const findInputError = (errors: any, name: any) => {
	const filtered = Object.keys(errors)
		.filter((key) => key.includes(name))
		.reduce((current, key) => {
			return Object.assign(current, { error: errors[key] })
		}, {})
	return filtered
}
