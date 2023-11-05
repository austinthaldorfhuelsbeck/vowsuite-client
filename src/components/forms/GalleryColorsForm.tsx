import { PropsWithChildren, SyntheticEvent, useEffect, useState } from "react"

import { InputGroup } from "./utils/InputGroups"
import { IAppError } from "../../interfaces/api"
import { color_validation } from "./utils/inputValidation"
import { useGalleryContext } from "../../context/ContextProvider"
import { IGallery, IGalleryColor } from "../../interfaces/models"
import { FormRow } from "../../styles/components/forms.style"
import { listGalleryColors } from "../../services/galleries.service"
import { DashboardHeader } from "../../styles/layouts/dashboard-layout.style"
import { useGalleryColorForm } from "../../hooks/useGalleryColorForm"

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
		async function listColors(gallery: IGallery) {
			setColors((await listGalleryColors(gallery.gallery_id)).data)
		}
		if (gallery) listColors(gallery)
	}, [gallery])

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
