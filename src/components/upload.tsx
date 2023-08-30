import { useSession } from "next-auth/react";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data: userData } = useSession();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", title);
      formData.append("description", description);

      await fetch(`/api/upload?userid=${userData?.user.id}`, {
        method: "POST",
        body: formData,
      });
    }
  };
  return (
    <div className="flex  flex-col items-center justify-center gap-y-3 py-2">
      <InputText
        type="text"
        className="p-inputtext-lg rounded-md border border-gray-400 p-2"
        placeholder="Tittle"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <InputText
        type="text"
        className="p-inputtext-lg rounded-md border border-gray-400 p-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        onChange={handleFileChange}
        className="rounded-md border border-gray-400 p-2"
      />
      <button
        onClick={() => void handleUpload()}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadForm;