import React, {
	ChangeEvent,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useState,
} from "react"

import { ICompany } from "../../../interfaces/models"
import { PreviewImg } from "../../../styles/components/forms.style"

interface ComponentProps {
	formData: ICompany
	setFormData: Dispatch<SetStateAction<ICompany>>
	defaultImage: string
}

function ImageUpload({
	formData,
	setFormData,
	defaultImage,
}: PropsWithChildren<ComponentProps>) {
	// state
	const [file, setFile] = useState<File | undefined>()
	const [preview, setPreview] = useState<any>()

	// handlers
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		// load file to state
		const target = e.target as HTMLInputElement & {
			files: FileList
		}
		setFile(target.files[0])

		// set preview
		const newFile = new FileReader()
		newFile.onload = function () {
			setPreview(newFile.result)
		}
		newFile.readAsDataURL(target.files[0])

		// upload
		if (file) uploadFile(file)
	}
	async function uploadFile(file: File) {
		const fileData = new FormData()
		fileData.append("file", file)
		fileData.append("upload_preset", "test-vowsuite-uploads-unsigned")
		fileData.append("api_key", "123449859689355")

		const result = await fetch(
			"https://api.cloudinary.com/v1_1/dxuiy4k4i/image/upload",
			{
				method: "POST",
				body: fileData,
			},
		).then((r) => r.json())

		setFormData({ ...formData, img_URL: result.url })
	}

	return (
		<>
			<label htmlFor="img">Company Logo</label>
			<input
				name="img"
				type="file"
				accept="image/*"
				onChange={onChange}
			/>
			<PreviewImg src={preview || defaultImage} />
		</>
	)
}

export { ImageUpload }
