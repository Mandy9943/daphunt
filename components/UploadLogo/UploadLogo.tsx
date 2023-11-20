"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function AvatarC({
  id,

  size,
  onChange: onChange,
}: {
  id: number;
  size: number;
  onChange: (file: File) => void;
}) {
  const supabase = createClientComponentClient();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  //   useEffect(() => {
  //     async function downloadImage(path: string) {
  //       try {
  //         const { data, error } = await supabase.storage
  //           .from("avatars")
  //           .download(path);
  //         if (error) {
  //           throw error;
  //         }

  //         const url = URL.createObjectURL(data);
  //         setAvatarUrl(url);
  //       } catch (error) {
  //         console.log("Error downloading image: ", error);
  //       }
  //     }

  //     if (url) downloadImage(url);
  //   }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];

      var reader = new FileReader();
      reader.onload = function (e) {
        setAvatarUrl(e?.target?.result as any);
      };

      reader.readAsDataURL(file);

      onChange(file);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex mb-14 items-center gap-6 relative flex-col sm:flex-row">
      {avatarUrl ? (
        <Avatar className="flex uppercase w-[100px] h-[100px]">
          <AvatarImage src={avatarUrl} />
        </Avatar>
      ) : (
        <div className="w-[100px] h-[100px] rounded-full border-dashed border-2 "></div>
      )}

      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <div>Dapp logo</div>
          <div className="text-muted-foreground">
            Recommended size: 220x220 or 210x210 pixels
          </div>
        </div>

        <Button size={"sm"} asChild>
          <label
            className="button primary block whitespace-nowrap"
            htmlFor="single"
          >
            {uploading ? "Uploading ..." : "Select an image"}
          </label>
        </Button>
      </div>
      <div>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
            left: 0,
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
