import { PropsWithChildren, useEffect, useState } from "react"

import { faSpinner } from "@fortawesome/free-solid-svg-icons"

import { FileUpload } from "./utils/FileUpload"
import { usePreview } from "../../hooks/usePreview"
import { BannerActions } from "./utils/BannerActions"
import { ICompany, IFont } from "../../interfaces/models"
import { copy, imagePaths } from "../../data/app-constants"
import { ControlGroup, InputGroup } from "./utils/InputGroups"
import { listFonts } from "../../services/vs-api/fonts.service"
import { Loader } from "../../styles/layouts/page-layout.style"
import { useCompanyForm } from "../../hooks/useCompanyForm"
import { Form, FormColumn, FormRow } from "../../styles/components/forms.style"
import {
	DashboardHeader,
	StudioHeaderContainer,
} from "../../styles/layouts/dashboard-layout.style"
import {
	color_validation,
	company_name_validation,
	font_validation,
	url_validation,
} from "./utils/inputValidation"

interface ComponentProps {
	company?: ICompany
}

function CompanyForm({ company }: PropsWithChildren<ComponentProps>) {
	// Context
	const { preview, validUrl, getUrlFromAws } = usePreview()
	const {
		useBase,
		useColor0,
		useColor1,
		useColor2,
		useLink0,
		useLink1,
		useLink2,
		useLink3,
		useLink4,
		useLink5,
		bannerProps,
	} = useCompanyForm(company)

	// State
	const [fonts, setFonts] = useState<(IFont | undefined)[]>([])

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
		<Form noValidate autoComplete="off">
			{/* <pre>{JSON.stringify(company, null, "\t")}</pre> */}
			<StudioHeaderContainer>
				<DashboardHeader>{copy.companyFormHeader}</DashboardHeader>
				<BannerActions {...bannerProps} />
			</StudioHeaderContainer>
			<FormRow>
				<FormColumn>
					<InputGroup
						{...company_name_validation}
						value={useBase.formData.company_name}
						onChange={useBase.onChange}
					/>
					<FileUpload
						formData={useBase.formData}
						setFormData={useBase.setFormData}
						label="Company Logo"
						defaultUrl={
							validUrl || preview || imagePaths.defaultUser
						}
						isCircle
					/>

					<DashboardHeader>Branding</DashboardHeader>
					{fonts ? (
						<ControlGroup
							{...font_validation}
							options={fonts}
							value={useBase.formData.font_id}
							onChange={useBase.onChange}
						/>
					) : (
						<Loader icon={faSpinner} />
					)}
					<FormRow>
						<FormColumn>
							<label>Primary Color</label>
							<InputGroup
								{...color_validation}
								value={useColor0.formData.value}
								onChange={useColor0.onChange}
							/>
						</FormColumn>
						<FormColumn>
							<label>Secondary Color</label>
							<InputGroup
								{...color_validation}
								value={useColor1.formData.value}
								onChange={useColor1.onChange}
							/>
						</FormColumn>
						<FormColumn>
							<label>Accent Color</label>
							<InputGroup
								{...color_validation}
								value={useColor2.formData.value}
								onChange={useColor2.onChange}
							/>
						</FormColumn>
					</FormRow>
				</FormColumn>
				<FormColumn>
					<DashboardHeader>Links</DashboardHeader>
					<InputGroup
						{...url_validation}
						label={useLink0.formData.label}
						value={useLink0.formData.target}
						onChange={useLink0.onChange}
					/>
					<InputGroup
						{...url_validation}
						label={useLink1.formData.label}
						value={useLink1.formData.target}
						onChange={useLink1.onChange}
					/>
					<InputGroup
						{...url_validation}
						label={useLink2.formData.label}
						value={useLink2.formData.target}
						onChange={useLink2.onChange}
					/>
					<InputGroup
						{...url_validation}
						label={useLink3.formData.label}
						value={useLink3.formData.target}
						onChange={useLink3.onChange}
					/>
					<InputGroup
						{...url_validation}
						label={useLink4.formData.label}
						value={useLink4.formData.target}
						onChange={useLink4.onChange}
					/>
					<InputGroup
						{...url_validation}
						label={useLink5.formData.label}
						value={useLink5.formData.target}
						onChange={useLink5.onChange}
					/>
				</FormColumn>
			</FormRow>
			{/* <DashboardHeader>Base Form</DashboardHeader>
			<pre>{JSON.stringify(useBase.formData, null, "\t")}</pre>
			<DashboardHeader>Color0</DashboardHeader>
			<pre>{JSON.stringify(useColor0.formData, null, "\t")}</pre>
			<DashboardHeader>Color1</DashboardHeader>
			<pre>{JSON.stringify(useColor1.formData, null, "\t")}</pre>
			<DashboardHeader>Color2</DashboardHeader>
			<pre>{JSON.stringify(useColor2.formData, null, "\t")}</pre>
			<DashboardHeader>Link0</DashboardHeader>
			<pre>{JSON.stringify(useLink0.formData, null, "\t")}</pre>
			<DashboardHeader>Link1</DashboardHeader>
			<pre>{JSON.stringify(useLink1.formData, null, "\t")}</pre>
			<DashboardHeader>Link2</DashboardHeader>
			<pre>{JSON.stringify(useLink2.formData, null, "\t")}</pre>
			<DashboardHeader>Link3</DashboardHeader>
			<pre>{JSON.stringify(useLink3.formData, null, "\t")}</pre>
			<DashboardHeader>Link4</DashboardHeader>
			<pre>{JSON.stringify(useLink4.formData, null, "\t")}</pre>
			<DashboardHeader>Link5</DashboardHeader>
			<pre>{JSON.stringify(useLink5.formData, null, "\t")}</pre> */}
		</Form>
	)
}

export { CompanyForm }
