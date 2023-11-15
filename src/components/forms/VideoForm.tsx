import { useEffect } from "react"

import { FileUpload } from "./utils/FileUpload"
import { useStatus } from "../../hooks/useStatus"
import { usePreview } from "../../hooks/usePreview"
import { BannerActions } from "./utils/BannerActions"
import { useVideoForm } from "../../hooks/useVideoForm"
import { copy, imagePaths } from "../../data/app-constants"
import { CheckboxGroup, InputGroup } from "./utils/InputGroups"
import { video_name_validation } from "./utils/inputValidation"
import { useVideoContext } from "../../context/ContextProvider"
import { FormContainer, FormRow } from "../../styles/components/forms.style"
import {
	DashboardHeader,
	StudioHeaderContainer,
} from "../../styles/layouts/dashboard-layout.style"

function VideoForm() {
	// Context
	const { video } = useVideoContext()
	const { success, error, handleSuccess, handleError } = useStatus()
	const {
		formData,
		setFormData,
		onChange,
		onClear,
		onCheck,
		onReset,
		onSubmit,
	} = useVideoForm(handleSuccess, handleError)
	const { preview, getUrlFromAws } = usePreview()

	// Props
	const bannerActionsProps = {
		success,
		error,
		onReset,
		onClear,
		onSubmit,
	}

	// Effects
	// load preview image from aws
	useEffect(() => {
		if (video?.img_URL) getUrlFromAws(video.img_URL)
	})

	return (
		<FormContainer noValidate autoComplete="off">
			{/* <pre>{JSON.stringify(formData, null, "\t")}</pre> */}
			<StudioHeaderContainer>
				<DashboardHeader>{copy.videoFormHeader}</DashboardHeader>
				<BannerActions {...bannerActionsProps} />
			</StudioHeaderContainer>
			<FormRow>
				<FileUpload
					formData={formData}
					setFormData={setFormData}
					label="Upload Video"
					isVideo
				/>
			</FormRow>
			<FormRow>
				<InputGroup
					{...video_name_validation}
					value={formData.video_name}
					onChange={onChange}
				/>
			</FormRow>
			<FormRow>
				<FileUpload
					formData={formData}
					setFormData={setFormData}
					label="Cover Image"
					defaultUrl={preview || imagePaths.defaultUser}
				/>
			</FormRow>
			<FormRow>
				<CheckboxGroup
					label="Displayed?"
					id="is_displayed"
					type="checkbox"
					validation={{
						required: {
							value: true,
							message: "Is the video displayed?",
						},
					}}
					value={formData.is_displayed}
					onChange={onCheck}
				/>
			</FormRow>
		</FormContainer>
	)
}

export { VideoForm }
