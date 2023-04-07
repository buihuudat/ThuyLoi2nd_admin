import axios from "axios";

const path = "https://api.cloudinary.com/v1_1/ddtagvynp/upload";

const imageUpload = async (images) => {
  try {
    const uploadPromises = images.map(async (image) => {
      const data = new FormData();
      data.append("file", image.url);
      data.append("upload_preset", "thuyloi2nd");
      data.append("cloud_name", "ddtagvynp");
      const response = await axios.post(path, data);
      return { url: response.data.url };
    });
    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.error(error);
    throw new Error("Could not upload images to Cloudinary");
  }
};

export default imageUpload;
