import axios from "axios";

  export const uploadphoto = () => {
    // console.log("AXIOS secret", file)
    return axios
      .post("/api/upload")
      .then((response) => {
        console.log("AXIOS SENDS", response.data)
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };

  export const getPhotoFileName = () => {
    // console.log("AXIOS secret", file)
    return axios
      .get("/api/upload")
      .then((response) => {
        console.log("AXIOS SENDS", response.data)
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };