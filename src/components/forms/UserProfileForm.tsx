// Dependencies
import * as React from "react"
import { useUserContext } from "../../context/ContextProvider"
import { IUser } from "../../interfaces/models"
import { initialUserData } from "../../data/initial-data"
import { useForm } from "react-hook-form"
import { IAppError } from "../../interfaces/api"

export const UserProfileForm: React.FC = () => {
	// load context
	const { userMetadata, setUserMetadata } = useUserContext()
	// determine initial form data from context
	const initialFormData: IUser = userMetadata ? userMetadata : initialUserData

	// state
	const methods = useForm({ defaultValues: initialFormData })
	const [success, setSuccess] = React.useState<boolean>(false)
	const [error, setError] = React.useState<IAppError | undefined>(undefined)
	// handlers
	const handleClear = () => {
		methods.reset(initialUserData)
		setSuccess(false)
		setError(undefined)
	}

	return <></>
}
