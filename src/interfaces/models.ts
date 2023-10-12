export interface IBaseUser {
	user_id: number
	user_name: string
	email: string
	img_URL: string
	created_at: Date
	updated_at: Date
}

export interface IUser extends IBaseUser {
	company: ICompany
	galleries: IGallery[]
}

export interface ICompany {
	company_id: number
	user_id: number
	company_name: string
	img_URL: string
	website_URL: string
	youtube_URL: string
	instagram_URL: string
	facebook_URL: string
	vimeo_URL: string
	tiktok_URL: string
	created_at: Date
	updated_at: Date
}

export interface IBaseGallery {
	gallery_id: number
	user_id: number
	gallery_name: string
	img_URL: string
	font: string
	hex1: string
	hex2: string
	hex3: string
	created_at: Date
	updated_at: Date
}

export interface IGallery extends IBaseGallery {
	videos: IVideo[]
}

export interface IVideo {
	video_id: number
	gallery_id: number
	video_name: string
	video_URL: string
	img_URL: string
	views: number
	downloads: number
	is_displayed: boolean
	created_at: Date
	updated_at: Date
}

export interface ICompany {
	company_id: number
	user_id: number
	company_name: string
	img_URL: string
	website_URL: string
	youtube_URL: string
	instagram_URL: string
	facebook_URL: string
	vimeo_URL: string
	tiktok_URL: string
	created_at: Date
	updated_at: Date
}
