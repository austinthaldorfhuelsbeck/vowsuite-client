import {
	IBaseGallery,
	IVideo,
	IBaseUser,
	IBaseCompany,
	ICompanyForm,
} from "../interfaces/models"
import { imagePaths } from "./app-constants"

// gallery form data
export const initialGalleryData: IBaseGallery = {
	gallery_id: new Date().valueOf(),
	user_id: 0,
	font_id: 0,
	gallery_name: "",
	img_URL: imagePaths.defaultUser,
	created_at: new Date(),
	updated_at: new Date(),
}

// video form data
export const initialVideoData: IVideo = {
	video_id: new Date().valueOf(),
	gallery_id: 0,
	video_URL: "",
	video_name: "",
	img_URL: imagePaths.defaultUser,
	views: 0,
	downloads: 0,
	is_displayed: true,
	created_at: new Date(),
	updated_at: new Date(),
}

// company form data
const dates = {
	created_at: new Date(),
	updated_at: new Date(),
}
export const initialCompanyData: IBaseCompany = {
	company_id: 0,
	user_id: 0,
	font_id: 0,
	company_name: "",
	img_URL: imagePaths.defaultUser,
	// color0: {
	// 	company_color_id: new Date().valueOf(),
	// 	company_id: id,
	// 	value: "#000000",
	// 	...dates,
	// },
	// color1: {
	// 	company_color_id: new Date().valueOf() + 1,
	// 	company_id: id,
	// 	value: "#000000",
	// 	...dates,
	// },
	// color2: {
	// 	company_color_id: new Date().valueOf() + 2,
	// 	company_id: id,
	// 	value: "#000000",
	// 	...dates,
	// },
	// url0: {
	// 	company_url_id: new Date().valueOf(),
	// 	company_id: id,
	// 	label: "Website",
	// 	target: "",
	// 	...dates,
	// },
	// url1: {
	// 	company_url_id: new Date().valueOf() + 1,
	// 	company_id: id,
	// 	label: "Facebook",
	// 	target: "",
	// 	...dates,
	// },
	// url2: {
	// 	company_url_id: new Date().valueOf() + 2,
	// 	company_id: id,
	// 	label: "Instagram",
	// 	target: "",
	// 	...dates,
	// },
	// url3: {
	// 	company_url_id: new Date().valueOf() + 3,
	// 	company_id: id,
	// 	label: "YouTube",
	// 	target: "",
	// 	...dates,
	// },
	// url4: {
	// 	company_url_id: new Date().valueOf() + 4,
	// 	company_id: id,
	// 	label: "TikTok",
	// 	target: "",
	// 	...dates,
	// },
	// url5: {
	// 	company_url_id: new Date().valueOf() + 5,
	// 	company_id: id,
	// 	label: "Vimeo",
	// 	target: "",
	// 	...dates,
	// },
	...dates,
}

// user form data
export const initialUserData: IBaseUser = {
	user_id: 0,
	user_name: "",
	email: "",
	img_URL: imagePaths.defaultUser,
	created_at: new Date(),
	updated_at: new Date(),
}
