import { useState, useEffect } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const upload = async () => {
    const form = new FormData();
    form.append("file", file);

    await fetch("http://localhost:5000/api/files/upload", {
      method: "POST",
      headers: { Authorization: token },
      body: form,
    });

    loadFiles();
  };

  const loadFiles = async () => {
    const res = await fetch("http://localhost:5000/api/files", {
      headers: { Authorization: token },
    });
    setFiles(await res.json());
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>

      <h3>Your Files</h3>
      {files.map(f => (
        <p key={f.id}>{f.filename}</p>
      ))}
    </div>
  );
}
