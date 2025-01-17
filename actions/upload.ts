"use server";
import { put } from "@vercel/blob";

export const uploadFile = async (formData: FormData) => {
  const imageFile = formData.get("image") as File;

  const blob = await put(imageFile.name, imageFile, {
    access: "public",
  });

  return blob;
};
