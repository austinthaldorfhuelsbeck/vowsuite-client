import { FileUpload } from "./utils/FileUpload"
import { copy } from "../../data/app-constants"
import { CheckboxGroup, InputGroup } from "./utils/InputGroups"
import { useStatus } from "../../hooks/useStatus"
import { BannerActions } from "./utils/BannerActions"
import { useVideoForm } from "../../hooks/useVideoForm"
import { initialVideoData } from "../../data/initial-data"
import { useVideoContext } from "../../context/ContextProvider"
import { video_name_validation } from "./utils/inputValidation"
import { Form, FormRow } from "../../styles/components/forms.style"
import {
	DashboardHeader,
	StudioHeaderContainer,
} from "../../styles/layouts/dashboard-layout.style"

function VideoForm() {
	// load context
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

	// build props
	const bannerActionsProps = {
		success,
		error,
		onReset,
		onClear,
		onSubmit,
	}

	return (
		<Form onSubmit={onSubmit} noValidate autoComplete="off">
			<StudioHeaderContainer>
				<DashboardHeader>{copy.videoFormHeader}</DashboardHeader>
				<BannerActions {...bannerActionsProps} />
			</StudioHeaderContainer>
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
					defaultUrl={video?.video_URL || initialVideoData.video_URL}
					label="Upload Video"
					isVideo
				/>
			</FormRow>
			<FormRow>
				<FileUpload
					formData={formData}
					setFormData={setFormData}
					defaultUrl={video?.img_URL || initialVideoData.img_URL}
					label="Thumbnail Image"
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
		</Form>
	)
}

export { VideoForm }
