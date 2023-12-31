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
	galleries: (IGallery | undefined)[]
}

export interface IBaseCompany {
	company_id: number
	img_URL: string
	user_id: number
	company_name: string
	font_id: number
	created_at: Date
	updated_at: Date
}

export interface ICompany extends IBaseCompany {
	colors: ICompanyColor[]
	urls: ICompanyUrl[]
}

export interface ICompanyForm extends IBaseCompany {
	color0: ICompanyColor
	color1: ICompanyColor
	color2: ICompanyColor
	url0: ICompanyUrl
	url1: ICompanyUrl
	url2: ICompanyUrl
	url3: ICompanyUrl
	url4: ICompanyUrl
	url5: ICompanyUrl
}

export interface IBaseGallery {
	gallery_id: number
	user_id: number
	font_id: number
	gallery_name: string
	img_URL: string
	created_at: Date
	updated_at: Date
}

export interface IGallery extends IBaseGallery {
	colors: IGalleryColor[]
	videos: IVideo[]
}

export interface IGalleryColor {
	gallery_color_id: number
	gallery_id: number
	value: string
	created_at: Date
	updated_at: Date
}

export interface ICompanyColorReq {
	company_id: number
	value: string
}

export interface ICompanyColor extends ICompanyColorReq {
	company_color_id: number
	created_at: Date
	updated_at: Date
}

export interface ICompanyUrl {
	company_url_id: number
	company_id: number
	label: string
	target: string
	created_at: Date
	updated_at: Date
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

export interface IFont {
	font_id: number
	font_name: string
	created_at: Date
	updated_at: Date
}