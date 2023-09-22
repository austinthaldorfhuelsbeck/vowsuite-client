import { IBaseGallery } from "../interfaces/models"
import { defaultGalleryStyle, imagePaths } from "./app-constants"

// initial gallery form data
export const initialGalleryData: IBaseGallery = {
	gallery_id: new Date().valueOf(),
	user_id: 0,
	gallery_name: "",
	img_URL: imagePaths.defaultUser,
	font: "",
	hex1: defaultGalleryStyle.hex1,
	hex2: defaultGalleryStyle.hex2,
	hex3: defaultGalleryStyle.hex3,
	created_at: new Date(),
	updated_at: new Date(),
}
