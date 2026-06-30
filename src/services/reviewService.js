import { supabase } from "../lib/supabase";

export async function getApprovedReviews() {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function submitReview({
  name,
  rating,
  review,
}) {
  const { error } = await supabase
    .from("reviews")
    .insert([
      {
        approved: false,
        name,
        rating,
        review,
      },
    ]);

  if (error) throw error;
}