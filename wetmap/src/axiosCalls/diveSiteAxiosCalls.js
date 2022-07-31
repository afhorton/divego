import axios from "axios";

 export const diveSitesX = () => {
    return axios
      .get("api/diveSites")
      .then((response) => {
        // console.log(response.data)
          return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
