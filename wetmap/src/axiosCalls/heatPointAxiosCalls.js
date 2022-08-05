import axios from "axios";

export const heatPoints = (GPSBubble, slider, animal) => {
   console.log("AXIOS", GPSBubble, slider, animal)
    return axios
      .post("/api/heatPoints", { GPSBubble: GPSBubble, SliderValue: slider, AnimalValue: animal })
      .then((response) => {
        // console.log("AXIOS SENDS", response.data)
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

export const getLoneHeatPoint = (values) => {
  //  console.log("AXIOS", values)
  return axios
    .post("/api/heatPoint", {
      Lat: values.lat,
      Lng: values.lng,
      Animal: values.animal,
      Month: values.month,
    })
    .then((response) => {
      // console.log("AXIOS SENDS", response.data)
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const grabHeatPointById = (id) => {
  //  console.log("AXIOS", values)
  return axios
    .get(`/api/heatPoint/${id}`)
    .then((response) => {
      // console.log("AXIOS SENDS", response.data)
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const insertHeatPoint = (values) => {
  console.log("AXIOS", values);
  return axios
    .post("/api/HeatPointAdd", {
      Lat: values.lat,
      Lng: values.lng,
      Animal: values.animal,
      Month: values.month,
    })
    .then((response) => {
      // console.log("AXIOS SENDS", response.data)
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateHeatPoint = (values) => {
  console.log("AXIOS", values);
  return axios
    .post("/api/HeatPointUpdate", {
      Id: values.id,
      Weight: values.weight,
    })
    .then((response) => {
      console.log("AXIOS SENDS", response.data)
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
