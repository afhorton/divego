import axios from "axios";

export const photoWaits = () => {
  //  console.log("AXIOS", GPSBubble)
  return axios
    .post("/api/photoWait")
    .then((response) => {
      // console.log("AXIOS SENDS", response.data)
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const insertPhotoWaits = (values) => {
  //  console.log("AXIOS", values)
  return axios
    .post("/api/photoWaitAdd", {
      File: values.File,
      Animal: values.Animal,
      Date: values.Date,
      Lat: values.Latitude,
      Lng: values.Longitude,
    })
    .then((response) => {
      // console.log("AXIOS SENDS", response.data)
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const grabPhotoWaitById = (id) => {
  //  console.log("AXIOS", values)
  return axios
    .get(`/api/photoWait/${id}`)
    .then((response) => {
      // console.log("AXIOS SENDS", response.data)
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const deletePhotoWait = (id) => {

  return axios
    .delete(`api/photoWait/delete/${id}`, {id})
    .then((response) => {
    })
    .catch((err) => {
      return err;
    });
  }
