import { FileUpload } from "./utils/FileUpload"
import { copy } from "../../data/app-constants"
import { useStatus } from "../../hooks/useStatus"
import { BannerActions } from "./utils/BannerActions"
import { useVideoForm } from "../../hooks/useVideoForm"
import { CheckboxGroup, InputGroup } from "./utils/InputGroups"
import { video_name_validation } from "./utils/inputValidation"
import { Form, FormRow } from "../../styles/components/forms.style"
import {
	DashboardHeader,
	StudioHeaderContainer,
} from "../../styles/layouts/dashboard-layout.style"

function VideoForm() {
	// load context
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
			{/* {JSON.stringify(formData)} */}
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
					label="Upload Video"
					isVideo
				/>
			</FormRow>
			<FormRow>
				<FileUpload
					formData={formData}
					setFormData={setFormData}
					label="Cover Image"
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
