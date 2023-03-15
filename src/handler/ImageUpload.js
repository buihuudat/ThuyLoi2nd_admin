import axios from "axios";
const path = "https://api.cloudinary.com/v1_1/ddtagvynp/upload";

const imageUpload = (images) => {
  let result = [];
  images.map(async ({ url }) => {
    const data = new FormData();
    data.append("file", url);
    data.append("upload_preset", "foodapp");
    data.append("clould_name", "ddtagvynp");
    const image = await axios.post(path, data);
    result = [...result, image.data.url];
  });
  return;
};

export default imageUpload;
