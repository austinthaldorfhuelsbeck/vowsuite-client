import { PropsWithChildren, useEffect, useState } from "react"

import { copy, imagePaths } from "../../data/app-constants"
import { FileUpload } from "./utils/FileUpload"
import { ICompany, IFont } from "../../interfaces/models"
import { usePreview } from "../../hooks/usePreview"
import { ControlGroup, InputGroup } from "./utils/InputGroups"
import { listFonts } from "../../services/vs-api/fonts.service"
import { DashboardHeader } from "../../styles/layouts/dashboard-layout.style"
import {
	color_validation,
	company_name_validation,
	font_validation,
	url_validation,
} from "./utils/inputValidation"
import { FormColumn, FormRow } from "../../styles/components/forms.style"
import { useStatus } from "../../hooks/useStatus"
import { useCompanyForm } from "../../hooks/useCompanyForm"
import { BannerActions } from "./utils/BannerActions"

interface ComponentProps {
	company?: ICompany
}

function CompanyForm({ company }: PropsWithChildren<ComponentProps>) {
	// Context
	const { preview, validUrl, getUrlFromAws } = usePreview()
	const { success, error, handleSuccess, handleError } = useStatus()
	const useCompanySection = useCompanyForm(handleSuccess, handleError)

	// State
	const [fonts, setFonts] = useState<(IFont | undefined)[]>([])

	// Props
	const bannerProps = {
		success,
		error,
		onReset: useCompanySection.onReset,
		onSubmit: useCompanySection.onSubmit,
	}

	// Effects
	// load all available fonts for select options
	useEffect(() => {
		async function getAllFonts() {
			try {
				const allFonts: IFont[] = (await listFonts()).data
				setFonts(allFonts)
			} catch (err) {
				console.error(err)
			}
		}
		getAllFonts()
	}, [])
	// load preview image from aws
	useEffect(() => {
		if (company?.img_URL) getUrlFromAws(company.img_URL)
	}, [getUrlFromAws, company?.img_URL])

	return (
		<>
			<FormColumn>
				<DashboardHeader>{copy.companyFormHeader}</DashboardHeader>
				<BannerActions {...bannerProps} />
				<InputGroup
					{...company_name_validation}
					value={useCompanySection.formData.company_name}
					onChange={useCompanySection.onChange}
				/>
				<FileUpload
					formData={useCompanySection.formData}
					setFormData={useCompanySection.setFormData}
					label="Company Logo"
					defaultUrl={validUrl || preview || imagePaths.defaultUser}
					isCircle
				/>
				<DashboardHeader>{copy.companyFormSubheader}</DashboardHeader>
				{fonts ? (
					<ControlGroup
						{...font_validation}
						options={fonts}
						value={useCompanySection.formData.font_id}
						onChange={useCompanySection.onChange}
					/>
				) : (
					"Loading..."
				)}
				<DashboardHeader>Colors</DashboardHeader>
				<FormRow>
					{useCompanySection.formData.colors.map(
						(color, index) =>
							color && (
								<InputGroup
									key={color.company_color_id}
									{...color_validation}
									value={
										useCompanySection.formData.colors[index]
											.value
									}
									onChange={useCompanySection.onChange}
								/>
							),
					)}
				</FormRow>
				<DashboardHeader>Links</DashboardHeader>
				{useCompanySection.formData.urls.map(
					(url, index) =>
						url && (
							<InputGroup
								key={url.company_url_id}
								label={
									useCompanySection.formData.urls[index].label
								}
								{...url_validation}
								value={
									useCompanySection.formData.urls[index]
										.target
								}
								onChange={(e) =>
									useCompanySection.onUrlChange(
										e,
										url.company_url_id,
									)
								}
							/>
						),
				)}
			</FormColumn>
			<FormColumn>
				<pre>
					{JSON.stringify(useCompanySection.formData, null, "\t")}
				</pre>
			</FormColumn>
		</>
	)
}

export { CompanyForm }
