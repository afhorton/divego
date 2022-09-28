import { supabase } from "../supabase";

export const insertPhotoWaits = async (values) => {

  const { data, error } = await supabase
    .from("photoWait")
    .insert([
      {
        photoFile: values.PicFile,
        label: values.Animal,
        dateTaken: values.PicDate,
        latitude: values.Latitude,
        longitude: values.Longitude,
      },
    ]);

  if (error) {
    console.log("couldn't do it,", error);
  }

  if (data) {
    console.log(data);
  }
};
