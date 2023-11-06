import { PropsWithChildren, SyntheticEvent, useEffect, useState } from "react"

import { InputGroup } from "./utils/InputGroups"
import { IAppError } from "../../interfaces/api"
import { color_validation } from "./utils/inputValidation"
import {
	useGalleryContext,
	useUserContext,
} from "../../context/ContextProvider"
import { ICompanyColor, IGallery, IGalleryColor } from "../../interfaces/models"
import { FormRow } from "../../styles/components/forms.style"
import {
	createGalleryColor,
	listGalleryColors,
} from "../../services/vs-api/galleries.service"
import { DashboardHeader } from "../../styles/layouts/dashboard-layout.style"
import { useGalleryColorForm } from "../../hooks/useGalleryColorForm"
import { listCompanyColors } from "../../services/vs-api/companies.service"

interface ComponentProps {
	submit: SyntheticEvent<HTMLButtonElement> | undefined
	reset: SyntheticEvent<HTMLButtonElement> | undefined
	handleSuccess: () => void
	handleError: (e: IAppError) => void
}

interface InputProps extends ComponentProps {
	galleryColor: IGalleryColor
}

function ColorInputGroup({
	galleryColor,
	submit,
	reset,
	handleSuccess,
	handleError,
}: PropsWithChildren<InputProps>) {
	// Context
	const { formData, onChange, onReset, onSubmit } = useGalleryColorForm(
		handleSuccess,
		handleError,
		galleryColor,
	)

	// Effects
	useEffect(() => {
		if (submit) onSubmit(submit)
		if (reset) onReset(reset)
	}, [onReset, onSubmit, reset, submit])

	return (
		<>
			<InputGroup
				{...color_validation}
				value={formData.value}
				onChange={onChange}
			/>
		</>
	)
}

function GalleryColorsForm({
	submit,
	reset,
	handleSuccess,
	handleError,
}: PropsWithChildren<ComponentProps>) {
	// Context
	const { user } = useUserContext()
	const { gallery } = useGalleryContext()

	// State
	const [colors, setColors] = useState<(IGalleryColor | undefined)[]>([])

	// Props
	const props = {
		submit,
		reset,
		handleSuccess,
		handleError,
	}

	// Effects
	useEffect(() => {
		// Function to create a new gallery color
		async function createColor(color: IGalleryColor) {
			await createGalleryColor(color)
		}

		// Function to list all gallery colors and set state
		async function listColors(gallery: IGallery) {
			const galleryColors: IGalleryColor[] = (
				await listGalleryColors(gallery.gallery_id)
			).data
			console.log("List colors ran! ", galleryColors.length)
			if (galleryColors.length) {
				setColors(galleryColors)
			} else if (user) {
				const companyColors: ICompanyColor[] = (
					await listCompanyColors(user?.company.company_id)
				).data
				const newColors: IGalleryColor[] = companyColors.map(
					(color: ICompanyColor) => ({
						gallery_color_id: 0,
						gallery_id: gallery.gallery_id,
						value: color.value,
						created_at: new Date(),
						updated_at: new Date(),
					}),
				)
				console.log("We'll have to make colors. ", newColors)
				setColors(newColors)
			}
		}
		console.log("Gallery effect hook ran! ", gallery)
		if (gallery && colors.length === 0) listColors(gallery)
	}, [user, gallery, colors])
	// useEffect(() => {
	// 	// Function to list all company colors,
	// 	// create new gallery colors, and post
	// 	async function createColors(companyId: number, galleryId: number) {
	// 		console.log("Create colors ran!")
	// 		const companyColors: ICompanyColor[] = (
	// 			await listCompanyColors(companyId)
	// 		).data
	// 		console.log("Company Colors! ", companyColors)
	// 		const newColors: IGalleryColor[] = companyColors.map(
	// 			(color: ICompanyColor, index) => ({
	// 				gallery_color_id: new Date().valueOf() + index,
	// 				gallery_id: galleryId,
	// 				value: color.value,
	// 				created_at: new Date(),
	// 				updated_at: new Date(),
	// 			}),
	// 		)
	// 		if (colors.length === 0) {
	// 			setColors(newColors)
	// 			newColors.forEach(async (color: IGalleryColor) => {
	// 				console.log("Here is a color: ", color)
	// 				await createGalleryColor(color)
	// 			})
	// 		}
	// 	}
	// 	console.log("User effect hook ran!")
	// 	if (user && gallery && colors.length === 0) {
	// 		createColors(user.company.company_id, gallery.gallery_id)
	// 	}
	// }, [user, gallery, colors])

	return (
		<>
			<DashboardHeader>Colors</DashboardHeader>
			<FormRow>
				{colors &&
					colors.map(
						(color) =>
							color && (
								<ColorInputGroup
									key={color.gallery_color_id}
									galleryColor={color}
									{...props}
								/>
							),
					)}
			</FormRow>
		</>
	)
}

export { GalleryColorsForm }
