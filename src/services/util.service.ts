import {
	IBaseCompany,
	IBaseGallery,
	ICompany,
	IGallery,
} from "../interfaces/models"

function formatDatePretty(now: Date): string {
	return new Date(now).toLocaleDateString("en-us", {
		year: "numeric",
		month: "short",
		day: "numeric",
	})
}

function formatGreeting(now: Date, name: string): string {
	const hour: number = Number(now.toString().split(" ")[4].slice(0, 2))
	let message: string = `Hello, ${name}!`
	if (hour < 4) message = `Burning that midnight oil, ${name}?`
	if (4 <= hour && hour < 12) message = `Good morning, ${name}!`
	if (12 <= hour && hour < 17) message = `Good afternoon, ${name}!`
	if (17 <= hour) message = `Good evening, ${name}!`
	return message
}

function baseifyCompany(company: ICompany): IBaseCompany {
	const {
		company_id,
		user_id,
		font_id,
		company_name,
		img_URL,
		created_at,
		updated_at,
	} = company
	const result: IBaseCompany = {
		company_id,
		user_id,
		font_id,
		company_name,
		img_URL,
		created_at,
		updated_at,
	}
	return result
}

function baseifyGallery(gallery: IGallery): IBaseGallery {
	const {
		gallery_id,
		user_id,
		font_id,
		gallery_name,
		img_URL,
		created_at,
		updated_at,
	} = gallery
	const result: IBaseGallery = {
		gallery_id,
		user_id,
		font_id,
		gallery_name,
		img_URL,
		created_at,
		updated_at,
	}
	return result
}

export { formatDatePretty, formatGreeting, baseifyCompany, baseifyGallery }
