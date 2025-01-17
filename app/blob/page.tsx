"use client";

import { uploadFile } from "@/actions/upload";

export default function EditImageModalWrapper() {
  async function uploadImage(formData: FormData) {
    const blob = await uploadFile(formData);
    console.log(blob);
  }

  return (
    <div style={{ border: "2px solid red" }}>
      <form action={uploadImage}>
        <input type="file" accept="image/*" id="image" name="image" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
