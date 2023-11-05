// Data Models
interface IRequired {
	value: boolean
	message?: string
}
interface IMaxLength {
	value: number
	message: string
}
interface IValidation {
	required: IRequired
	maxLength?: IMaxLength
}
export interface ErrorProps {
	validation: IValidation
	value?: string
}

export const user_name_validation = {
	label: "Name",
	type: "text",
	id: "user_name",
	placeholder: "Your full name",
	validation: {
		required: {
			value: true,
			message: "User name required",
		},
		maxLength: {
			value: 80,
			message: "80 characters max",
		},
	},
}

export const company_name_validation = {
	label: "Company Name",
	type: "text",
	id: "company_name",
	placeholder: "Name your company",
	validation: {
		required: {
			value: true,
			message: "Company name required",
		},
		maxLength: {
			value: 40,
			message: "40 characters max",
		},
	},
}

export const gallery_name_validation = {
	label: "Gallery Name",
	type: "text",
	id: "gallery_name",
	placeholder: "Name your gallery",
	validation: {
		required: {
			value: true,
			message: "Gallery name required",
		},
		maxLength: {
			value: 40,
			message: "40 characters max",
		},
	},
}

export const video_name_validation = {
	label: "Video Name",
	type: "text",
	id: "video_name",
	placeholder: "Name your video",
	validation: {
		required: {
			value: true,
			message: "Video name required",
		},
		maxLength: {
			value: 40,
			message: "40 characters max",
		},
	},
}

export const user_email_validation = {
	label: "Email",
	type: "text",
	id: "email",
	placeholder: "Your email address",
	validation: {
		required: {
			value: true,
			message: "Email required",
		},
		maxLength: {
			value: 80,
			message: "80 characters max",
		},
	},
}

export const font_validation = {
	label: "Font",
	id: "font_id",
	validation: {
		required: {
			value: true,
			message: "Select a font",
		},
	},
}

export const color_validation = {
	type: "color",
	id: "value",
	color: true,
	validation: {
		required: {
			value: false,
		},
	},
}

export const url_validation = {
	type: "text",
	id: "target",
	placeholder: "Paste URL Here",
	validation: {
		required: {
			value: false,
		},
	},
}
