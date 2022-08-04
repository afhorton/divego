import axios from "axios";

  export const insertphoto = (values) => {
    console.log("AXIOS", values)
    return axios
      .post("/api/photoAdd", {
        File: values.file,
        Animal: values.animal,
        Date: values.date,
        Lat: values.lat,
        Lng: values.lng,
      })
      .then((response) => {
        // console.log("AXIOS SENDS", response.data)
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };

 
    