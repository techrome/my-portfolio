import { fs } from "memfs";
import axios from "axios";
import FormData from "form-data";

const client = axios.create({
  baseURL: `https://neocities.org`,
  headers: {
    Authorization: `Bearer ${process.env.FILE_STORAGE_API_TOKEN}`
  }
});

export const uploadFiles = async (files) => {
  const fd = new FormData();

  files.forEach((file) => {
    fd.append(file.name, fs.createReadStream(file.path));
  });

  const res = await client.post("/api/upload", fd, {
    headers: fd.getHeaders()
  });

  return res;
};

export const deleteFiles = async (fileNames) => {
  const fd = new FormData();

  fileNames.forEach((name) => {
    fd.append("filenames[]", name);
  });

  const res = await client.post("/api/delete", fd, {
    headers: fd.getHeaders()
  });

  return res;
};
