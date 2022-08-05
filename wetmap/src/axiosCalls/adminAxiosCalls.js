import axios from "axios";

export const adminCheck = (pass) => {
    //  console.log("AXIOS", GPSBubble)
      return axios
        .post("/api/session", { pass: pass })
        .then((response) => {
          console.log("AXIOS SENDS", response.data)
            return response.data;
        })
        .catch((err) => {
          return err;
        });
    }