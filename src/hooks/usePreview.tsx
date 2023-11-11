import { useState } from "react"

import AWS from "aws-sdk"

// Config
const S3_BUCKET: string = "vowsuite-videos"
const accessKeyId: string = process.env.REACT_APP_AWS_ACCESS_KEY_ID || ""
const secretAccessKey: string =
	process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || ""
const s3 = new AWS.S3({
	region: "us-west-2",
	credentials: {
		accessKeyId: accessKeyId,
		secretAccessKey: secretAccessKey,
	},
})

function usePreview() {
	const [preview, setPreview] = useState<string | undefined>()
	const [validUrl, setValidUrl] = useState<string | undefined>()
	const [progress, setProgress] = useState<number>(0)

	// function to get signed url, and set preview state
	async function getUrlFromAws(key: string) {
		const target = {
			Bucket: S3_BUCKET,
			Key: key,
		}
		const response: string = await s3
			.getSignedUrl("getObject", target)
			.toString()
		setValidUrl(response)
	}

	// function to upload, set progress bar, and call getUrl
	async function uploadToAws(file: File) {
		const target = {
			Bucket: S3_BUCKET,
			Key: file.name,
			Body: file,
		}
		await s3
			.putObject(target)
			.on("httpUploadProgress", (e) => {
				setProgress(Math.round((e.loaded / e.total) * 100))
			})
			.promise()
			.then(() => getUrlFromAws(file.name))
	}

	return {
		preview,
		progress,
		validUrl,
		getUrlFromAws,
		uploadToAws,
		setPreview,
	}
}

export { usePreview }
