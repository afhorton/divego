import axios from "axios";

 export const diveSites = (GPSBubble) => {
  //  console.log("AXIOS", GPSBubble)
    return axios
      .post("api/diveSites", { GPSBubble: GPSBubble })
      .then((response) => {
        // console.log("AXIOS SENDS", response.data)
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  export const insertDiveSite = (values) => {
     console.log("AXIOS", values)
    return axios
      .post("api/diveSiteAdd", {
        Name: values[0].name,
        Lat: values[0].lat,
        Lng: values[0].lng,
      })
      .then((response) => {
        // console.log("AXIOS SENDS", response.data)
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  };