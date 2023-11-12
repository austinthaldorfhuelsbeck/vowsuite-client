import { SyntheticEvent } from "react"

import { IAppError } from "../../interfaces/api"
import { useGalleryColorForm } from "./useColorForm"
import { useBaseGalleryForm } from "./useBaseGalleryForm"
import { initialGalleryData } from "../../data/initial-data"
import { baseifyGallery } from "../../services/util.service"
import { useUserContext } from "../../context/ContextProvider"
import { IBaseGallery, IGallery } from "../../interfaces/models"
import { BannerActionsProps } from "../../components/forms/utils/BannerActions"

function useGalleryForm(gallery?: IGallery) {
	// Context
	const { user } = useUserContext()

	// determine initial form data
	const id: number = new Date().valueOf()
	const dates = {
		created_at: new Date(),
		updated_at: new Date(),
	}
	const initialBaseData: IBaseGallery = {
		...initialGalleryData,
		gallery_id: id,
		user_id: user?.user_id || initialGalleryData.user_id,
	}
	// Form Hooks
	const useBase = useBaseGalleryForm(
		gallery ? baseifyGallery(gallery) : initialBaseData,
	)
	const useColor0 = useGalleryColorForm(
		gallery?.colors
			? gallery.colors[0]
			: {
					gallery_color_id: id,
					gallery_id: gallery?.gallery_id || id,
					value: "#ffffff",
					...dates,
			  },
	)
	const useColor1 = useGalleryColorForm(
		gallery?.colors
			? gallery.colors[1]
			: {
					gallery_color_id: id + 1,
					gallery_id: gallery?.gallery_id || id,
					value: "#ffffff",
					...dates,
			  },
	)
	const useColor2 = useGalleryColorForm(
		gallery?.colors
			? gallery.colors[2]
			: {
					gallery_color_id: id + 2,
					gallery_id: gallery?.gallery_id || id,
					value: "#ffffff",
					...dates,
			  },
	)

	// Handlers
	const success: boolean =
		useBase.success &&
		useColor0.success &&
		useColor1.success &&
		useColor2.success
	const error: IAppError | undefined =
		useBase.error || useColor0.error || useColor1.error || useColor2.error
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		useBase.onReset(e)
		useColor0.onReset(e)
		useColor1.onReset(e)
		useColor2.onReset(e)
	}
	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
		await useBase.onSubmit(e)
		await useColor0.onSubmit(e)
		await useColor1.onSubmit(e)
		await useColor2.onSubmit(e)
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
		bannerProps,
	}
}

export { useGalleryForm }
