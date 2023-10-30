import { FileUpload } from "./utils/FileUpload"
import { copy } from "../../data/app-constants"
import { InputGroup } from "./utils/InputGroups"
import { useStatus } from "../../hooks/useStatus"
import { BannerActions } from "./utils/BannerActions"
import { useVideoForm } from "../../hooks/useVideoForm"
import { initialVideoData } from "../../data/initial-data"
import { useVideoContext } from "../../context/ContextProvider"
import { video_name_validation } from "./utils/inputValidation"
import { Form, FormRow } from "../../styles/components/forms.style"
import { ContentBlockHeader } from "../../styles/components/content.style"

function VideoForm() {
	// load context
	const { video } = useVideoContext()
	const { success, error, handleSuccess, handleError } = useStatus()
	const { formData, setFormData, onChange, onClear, onReset, onSubmit } =
		useVideoForm(handleSuccess, handleError)

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
			<ContentBlockHeader>{copy.videoFormHeader}</ContentBlockHeader>

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

			<BannerActions {...bannerActionsProps} />
		</Form>
	)
}

export { VideoForm }
