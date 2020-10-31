import dotenv from "dotenv";
dotenv.config();

export default {
  REACT_APP_BASIC_SERVER_URL: process.env.REACT_APP_BASIC_SERVER_URL,
  REACT_APP_DEFAULT_IMAGE_URL: process.env.REACT_APP_DEFAULT_IMAGE_URL,
  REACT_APP_DEFAULT_FOLDER_URL: process.env.REACT_APP_DEFAULT_FOLDER_URL,
};
