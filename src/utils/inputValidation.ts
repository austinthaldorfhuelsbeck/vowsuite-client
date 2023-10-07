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

export const img_URL_validation = {
	label: "Image URL",
	type: "text",
	id: "img_URL",
	placeholder: "Cover image URL",
	validation: {
		required: {
			value: false,
		},
	},
}

export const website_URL_validation = {
	label: "Website URL",
	type: "text",
	id: "website_URL",
	placeholder: "Your company's website",
	validation: {
		required: {
			value: false,
		},
	},
}

export const youtube_URL_validation = {
	label: "YouTube URL",
	type: "text",
	id: "youtube_URL",
	placeholder: "Your company's YouTube URL",
	validation: {
		required: {
			value: false,
		},
	},
}

export const instagram_URL_validation = {
	label: "Instagram URL",
	type: "text",
	id: "instagram_URL",
	placeholder: "Your company's Instagram URL",
	validation: {
		required: {
			value: false,
		},
	},
}

export const facebook_URL_validation = {
	label: "Facebook URL",
	type: "text",
	id: "facebook_URL",
	placeholder: "Your company's Facebook URL",
	validation: {
		required: {
			value: false,
		},
	},
}

export const vimeo_URL_validation = {
	label: "Vimeo URL",
	type: "text",
	id: "vimeo_URL",
	placeholder: "Your company's Vimeo URL",
	validation: {
		required: {
			value: false,
		},
	},
}

export const tiktok_URL_validation = {
	label: "TikTok URL",
	type: "text",
	id: "tiktok_URL",
	placeholder: "Your company's TikTok URL",
	validation: {
		required: {
			value: false,
		},
	},
}
