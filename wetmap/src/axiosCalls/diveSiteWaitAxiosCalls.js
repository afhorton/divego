import axios from "axios";

export const diveSiteWaits = () => {
  //  console.log("AXIOS", GPSBubble)
  return axios
    .post("api/diveSiteWait")
    .then((response) => {
      // console.log("AXIOS SENDS", response.data)
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const insertDiveSiteWaits = (values) => {
  //  console.log("AXIOS", values)
  return axios
    .post("api/diveSiteWaitAdd", {
      Name: values.Site,
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

export const grabDiveSiteWaitById = (id) => {
  //  console.log("AXIOS", values)
  return axios
    .get(`api/diveSiteWait/${id}`)
    .then((response) => {
      // console.log("AXIOS SENDS", response.data)
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteDiveSiteWait = (id) => {

  return axios
    .delete(`/api/diveSiteWait/delete/${id}`, {id})
    .then((response) => {
    })
    .catch((err) => {
      return err;
    });
  }
