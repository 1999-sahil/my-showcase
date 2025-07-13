import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile: string) => {
    const formData = new FormData();
    formData.append('image', imageFile);    // append image file to form data

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",  // set header for file upload
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading the image file", error);
        throw error;    // Rethrow error for handling
    }
};

export default uploadImage;