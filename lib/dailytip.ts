import { supabase } from "@/lib/supabaseClient";

export async function getDailyTip(userId: string) {

  const day = (new Date().getDate() % 30) + 1;

  const { data, error } = await supabase
    .from("daily_tips")
    .select("*")
    .eq("day_number", day)
    .single();

  if (error) {
    console.log("Supabase error:", error);
    return null;
  }

  return data;
}