import { supabase } from "../supabase";

export const adminCheck = async (pass) => {

  const { data, error } = await supabase
  .from("administrator")
  .select("pass")
  .eq("id", 1)

if (error) {
  console.log("couldn't do it,", error)
  return([])
}

if (data) {
  return data
}
    }