import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,
  cloud_secret: process.env.CLOUNDINARY_API_SECRE,
  cloud_api: process.env.CLOUNDINARY_API_KEY,
});

app.listen(process.env.PORT, () => {
  console.log(`server is running at Port ${process.env.PORT}`);
});
