import axios from "axios";

export const getAnimalNames = () => {
  // console.log("AXIOS", values)
  return axios
    .post("/api/photoLabels")
    .then((response) => {
      // console.log("AXIOS SENDS", response.data)
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

  export const insertphoto = (values) => {
    // console.log("AXIOS", values)
    return axios
      .post("/api/photoAdd", {
        File: values.photofile,
        Animal: values.label,
        Date: values.datetaken,
        Lat: values.latitude,
        Lng: values.longitude,
      })
      .then((response) => {
        // console.log("AXIOS SENDS", response.data)
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };

 
    