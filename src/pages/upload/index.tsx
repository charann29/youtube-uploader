import { useState } from "react";
import { api } from "~/utils/api";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutateAsync: getUrl } = api.upload.createPresignedUrl.useMutation();

  const handleGetUrl = async () => {
    try {
      console.log("handleGetUrl");
      const data = await getUrl();

      console.log(data);
      if (!data?.url) return;

      // const formData = new FormData();
      // formData.append("file", selectedFile);

      // const resp = await fetch(data.url, {
      //   method: "PUT",
      //   body: selectedFile,
      //   headers: {
      //     "Content-Type": `image/png`,
      //   },
      // });
      // console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  return (
    <div>
      Upload
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleGetUrl}>Get Url</button>
    </div>
  );
};

export default Upload;
