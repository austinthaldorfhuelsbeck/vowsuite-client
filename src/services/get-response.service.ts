// Dependencies
import { createCompany, updateCompany } from "./companies.service"
// Data
import { IBaseGallery, ICompany } from "../interfaces/models"
import { createGallery, updateGallery } from "./galleries.service"

export const getCompanyResponse = async (
	formData: ICompany,
	id: number | undefined,
) => {
	// API call: update/create based on id
	if (id) {
		return await updateCompany(formData, id)
	} else {
		return await createCompany(formData)
	}
}
