import {
	IBaseGallery,
	IVideo,
	IBaseUser,
	IBaseCompany,
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
export const initialCompanyData: IBaseCompany = {
	company_id: new Date().valueOf(),
	user_id: 0,
	font_id: 0,
	company_name: "",
	img_URL: imagePaths.defaultUser,
	created_at: new Date(),
	updated_at: new Date(),
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
