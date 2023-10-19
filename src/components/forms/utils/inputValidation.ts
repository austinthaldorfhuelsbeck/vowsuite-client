import { galleryFonts } from "../../../data/app-constants"


export const img_URL_validation = {
	label: "Cover Image",
	id: "img_URL",
	placeholder: "Your Cover Image URL",
}

export const company_name_validation = {
	label: "Company Name",
	id: "company_name",
	placeholder: "Name your company",
}

export const website_URL_validation = {
	label: "Website",
	id: "website_URL",
	placeholder: "Your company's website",
}

export const youtube_URL_validation = {
	label: "YouTube",
	id: "youtube_URL",
	placeholder: "Your company's YouTube URL",
}

export const instagram_URL_validation = {
	label: "Instagram",
	id: "instagram_URL",
	placeholder: "Your company's Instagram URL",
}

export const facebook_URL_validation = {
	label: "Facebook",
	id: "facebook_URL",
	placeholder: "Your company's Facebook URL",
}

export const vimeo_URL_validation = {
	label: "Vimeo",
	id: "vimeo_URL",
	placeholder: "Your company's Vimeo URL",
}

export const tiktok_URL_validation = {
	label: "TikTok",
	id: "tiktok_URL",
	placeholder: "Your company's TikTok URL",
}

export const hex1_validation = {
	label: "Color 1",
	id: "hex1",
}

export const hex2_validation = {
	label: "Color 2",
	id: "hex2",
}

export const hex3_validation = {
	label: "Color 3",
	id: "hex3",
}

//////////////

export const video_URL_validation = {
	label: "Video URL",
	id: "video_URL",
	placeholder: "Video URL",
	type: "text",
}

export const user_name_validation = {
	label: "Name",
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

export const gallery_name_validation = {
	label: "Gallery Name",
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
	id: "font",
	options: galleryFonts,
	placeholder: undefined,
	validation: {
		required: {
			value: true,
			message: "Select a font",
		},
	},
}