import { SyntheticEvent } from "react"

import { useUrlForm } from "./useUrlForm"
import { IAppError } from "../../interfaces/api"
import { useCompanyColorForm } from "./useColorForm"
import { useBaseCompanyForm } from "./useBaseCompanyForm"
import { initialCompanyData } from "../../data/initial-data"
import { baseifyCompany } from "../../services/util.service"
import { useUserContext } from "../../context/ContextProvider"
import { IBaseCompany, ICompany } from "../../interfaces/models"
import { BannerActionsProps } from "../../components/forms/utils/BannerActions"

function useCompanyForm(company?: ICompany) {
	// Context
	const { user } = useUserContext()

	// determine initial form data
	const id: number = new Date().valueOf()
	const dates = {
		created_at: new Date(),
		updated_at: new Date(),
	}
	const initialBaseData: IBaseCompany = {
		...initialCompanyData,
		company_id: id,
		user_id: user?.user_id || initialCompanyData.user_id,
	}
	// Form Hooks
	const useBase = useBaseCompanyForm(
		company ? baseifyCompany(company) : initialBaseData,
	)
	const useColor0 = useCompanyColorForm(
		company?.colors
			? company.colors[0]
			: {
					company_color_id: id,
					company_id: company?.company_id || id,
					value: "#ffffff",
					...dates,
			  },
	)
	const useColor1 = useCompanyColorForm(
		company?.colors
			? company.colors[1]
			: {
					company_color_id: id + 1,
					company_id: company?.company_id || id,
					value: "#ffffff",
					...dates,
			  },
	)
	const useColor2 = useCompanyColorForm(
		company?.colors
			? company.colors[2]
			: {
					company_color_id: id + 2,
					company_id: company?.company_id || id,
					value: "#ffffff",
					...dates,
			  },
	)
	const useLink0 = useUrlForm(
		company?.urls[0] || {
			company_url_id: id,
			company_id: company?.company_id || id,
			label: "Website",
			target: "",
			...dates,
		},
	)
	const useLink1 = useUrlForm(
		company?.urls[1] || {
			company_url_id: id + 1,
			company_id: company?.company_id || id,
			label: "Facebook",
			target: "",
			...dates,
		},
	)
	const useLink2 = useUrlForm(
		company?.urls[2] || {
			company_url_id: id + 2,
			company_id: company?.company_id || id,
			label: "Instagram",
			target: "",
			...dates,
		},
	)
	const useLink3 = useUrlForm(
		company?.urls[3] || {
			company_url_id: id + 3,
			company_id: company?.company_id || id,
			label: "YouTube",
			target: "",
			...dates,
		},
	)
	const useLink4 = useUrlForm(
		company?.urls[4] || {
			company_url_id: id + 4,
			company_id: company?.company_id || id,
			label: "Vimeo",
			target: "",
			...dates,
		},
	)
	const useLink5 = useUrlForm(
		company?.urls[5] || {
			company_url_id: id + 5,
			company_id: company?.company_id || id,
			label: "TikTok",
			target: "",
			...dates,
		},
	)

	// Handlers
	const success: boolean =
		useBase.success &&
		useColor0.success &&
		useColor1.success &&
		useColor2.success &&
		useLink0.success &&
		useLink1.success &&
		useLink2.success &&
		useLink3.success &&
		useLink4.success &&
		useLink5.success
	const error: IAppError | undefined =
		useBase.error ||
		useColor0.error ||
		useColor1.error ||
		useColor2.error ||
		useLink0.error ||
		useLink1.error ||
		useLink2.error ||
		useLink3.error ||
		useLink4.error ||
		useLink5.error
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		useBase.onReset(e)
		useColor0.onReset(e)
		useColor1.onReset(e)
		useColor2.onReset(e)
		useLink0.onReset(e)
		useLink1.onReset(e)
		useLink2.onReset(e)
		useLink3.onReset(e)
		useLink4.onReset(e)
		useLink5.onReset(e)
	}
	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
		await useBase.onSubmit(e)
		await useColor0.onSubmit(e)
		await useColor1.onSubmit(e)
		await useColor2.onSubmit(e)
		await useLink0.onSubmit(e)
		await useLink1.onSubmit(e)
		await useLink2.onSubmit(e)
		await useLink3.onSubmit(e)
		await useLink4.onSubmit(e)
		await useLink5.onSubmit(e)
	}

	const bannerProps: BannerActionsProps = {
		success,
		error,
		onReset,
		onSubmit,
	}

	return {
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
	}
}

export { useCompanyForm }
