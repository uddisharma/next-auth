"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

interface ImageUploadProps {
  currentImage: string;
  onUpload: (formData: FormData) => Promise<void>;
}

export default function ImageUpload({
  currentImage,
  onUpload,
}: ImageUploadProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (previewImage) {
      const formData = new FormData();
      formData.append("file", dataURItoBlob(previewImage), "profile.jpg");

      startTransition(async () => {
        try {
          await onUpload(formData);
          toast.success("Profile photo updated successfully");
          setPreviewImage(null);
        } catch (error) {
          toast.error("Failed to update profile photo");
        }
      });
    }
  };

  // Helper function to convert Data URI to Blob
  function dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  return (
    <div className="space-y-4">
      <div className="relative w-32 h-32">
        <Image
          src={previewImage || currentImage}
          alt="Profile"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="imageUpload"
      />
      <label htmlFor="imageUpload">
        <Button variant="outline">Choose New Photo</Button>
      </label>
      {previewImage && (
        <Button onClick={handleUpload} disabled={isPending}>
          {isPending ? "Uploading..." : "Upload Photo"}
        </Button>
      )}
    </div>
  );
}
