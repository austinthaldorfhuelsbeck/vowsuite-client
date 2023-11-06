import { PropsWithChildren, SyntheticEvent, useEffect, useState } from "react"

import { InputGroup } from "./utils/InputGroups"
import { useUserContext } from "../../context/ContextProvider"
import { ICompany, ICompanyUrl } from "../../interfaces/models"
import { useCompanyUrlForm } from "../../hooks/useCompanyUrlForm"
import { listCompanyUrls } from "../../services/vs-api/companies.service"
import { Form, FormRow } from "../../styles/components/forms.style"
import { DashboardHeader } from "../../styles/layouts/dashboard-layout.style"
import { IAppError } from "../../interfaces/api"
import { url_validation } from "./utils/inputValidation"

interface ComponentProps {
	submit: SyntheticEvent<HTMLButtonElement> | undefined
	reset: SyntheticEvent<HTMLButtonElement> | undefined
	handleSuccess: () => void
	handleError: (e: IAppError) => void
}

interface UrlProps extends ComponentProps {
	url: ICompanyUrl
}

function UrlInputGroup({
	url,
	submit,
	reset,
	handleSuccess,
	handleError,
}: PropsWithChildren<UrlProps>) {
	// Context
	const { formData, onChange, onReset, onSubmit } = useCompanyUrlForm(
		handleSuccess,
		handleError,
		url,
	)

	// Effects
	useEffect(() => {
		if (submit) onSubmit(submit)
		if (reset) onReset(reset)
	}, [onReset, onSubmit, reset, submit])

	return (
		<FormRow>
			<InputGroup
				label={url.label}
				value={formData.target}
				onChange={onChange}
				{...url_validation}
			/>
		</FormRow>
	)
}

function CompanyUrlsForm({
	submit,
	reset,
	handleSuccess,
	handleError,
}: PropsWithChildren<ComponentProps>) {
	// Context
	const { user } = useUserContext()

	// State
	const [urls, setUrls] = useState<(ICompanyUrl | undefined)[]>([])

	// Props
	const props = {
		submit,
		reset,
		handleSuccess,
		handleError,
	}

	// Effects
	useEffect(() => {
		async function listUrls(company: ICompany) {
			setUrls((await listCompanyUrls(company.company_id)).data)
		}
		if (user?.company) listUrls(user.company)
	}, [user])

	return (
		<>
			<FormRow>
				<DashboardHeader>Links</DashboardHeader>
			</FormRow>
			{urls.map(
				(url) =>
					url && (
						<UrlInputGroup
							key={url.company_url_id}
							url={url}
							{...props}
						/>
					),
			)}
		</>
	)
}

export { CompanyUrlsForm }
