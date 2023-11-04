import { PropsWithChildren, SyntheticEvent, useEffect, useState } from "react"

import { InputGroup } from "./utils/InputGroups"
import { useStatus } from "../../hooks/useStatus"
import { BannerActions } from "./utils/BannerActions"
import { useUserContext } from "../../context/ContextProvider"
import { ICompany, ICompanyUrl } from "../../interfaces/models"
import { useCompanyUrlForm } from "../../hooks/useCompanyUrlForm"
import { listCompanyUrls } from "../../services/companies.service"
import { Form, FormRow } from "../../styles/components/forms.style"
import { DashboardHeader } from "../../styles/layouts/dashboard-layout.style"

interface ComponentProps {
	submit: SyntheticEvent<HTMLButtonElement> | undefined
	reset: SyntheticEvent<HTMLButtonElement> | undefined
}

interface UrlProps extends ComponentProps {
	url: ICompanyUrl
}

function UrlInputGroup({ url, submit, reset }: PropsWithChildren<UrlProps>) {
	// Context
	const { success, error, handleSuccess, handleError } = useStatus()
	const { formData, onChange, onReset, onSubmit } = useCompanyUrlForm(
		handleSuccess,
		handleError,
		url,
	)

	// Props
	const bannerProps = {
		success,
		error,
	}

	// Effects
	useEffect(() => {
		if (submit) onSubmit(submit)
		if (reset) onReset(reset)
	}, [onReset, onSubmit, reset, submit])

	return (
		<FormRow>
			<InputGroup
				label={url.label}
				type="text"
				id="target"
				placeholder="Paste URL here"
				validation={{
					required: { value: true, message: "URL required" },
				}}
				value={formData.target}
				onChange={onChange}
			/>
			<BannerActions {...bannerProps} />
		</FormRow>
	)
}

function CompanyUrlsForm({ submit, reset }: PropsWithChildren<ComponentProps>) {
	// Context
	const { user } = useUserContext()

	// State
	const [urls, setUrls] = useState<(ICompanyUrl | undefined)[]>([])

	// Effects
	useEffect(() => {
		async function listUrls(company: ICompany) {
			setUrls((await listCompanyUrls(company.company_id)).data)
		}
		if (user?.company) listUrls(user.company)
	}, [user])

	return (
		<Form>
			<FormRow>
				<DashboardHeader>Links</DashboardHeader>
			</FormRow>
			{urls.map(
				(url) =>
					url && (
						<UrlInputGroup
							key={url.company_url_id}
							url={url}
							submit={submit}
							reset={reset}
						/>
					),
			)}
		</Form>
	)
}

export { CompanyUrlsForm }
