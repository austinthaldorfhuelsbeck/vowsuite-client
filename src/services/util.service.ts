import {
	IBaseCompany,
	ICompany,
	ICompanyColor,
	ICompanyForm,
	ICompanyUrl,
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

function baseifyCompany(company: ICompany | ICompanyForm): IBaseCompany {
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

function formifyCompany(company: ICompany): ICompanyForm {
	const {
		company_id,
		user_id,
		font_id,
		company_name,
		img_URL,
		created_at,
		updated_at,
	} = company
	const color0: ICompanyColor = company.colors[0]
	const color1: ICompanyColor = company.colors[1]
	const color2: ICompanyColor = company.colors[2]
	const url0: ICompanyUrl = company.urls[0]
	const url1: ICompanyUrl = company.urls[1]
	const url2: ICompanyUrl = company.urls[2]
	const url3: ICompanyUrl = company.urls[3]
	const url4: ICompanyUrl = company.urls[4]
	const url5: ICompanyUrl = company.urls[5]
	const result: ICompanyForm = {
		company_id,
		user_id,
		font_id,
		company_name,
		img_URL,
		created_at,
		updated_at,
		color0,
		color1,
		color2,
		url0,
		url1,
		url2,
		url3,
		url4,
		url5,
	}
	return result
}

export { formatDatePretty, formatGreeting, baseifyCompany, formifyCompany }
