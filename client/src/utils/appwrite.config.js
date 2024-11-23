import { Client, ID, Storage } from "appwrite";

const client = new Client();
client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const storage = new Storage(client);

export const uploadPhoto = async (file) => {
  try {
    const response = await storage.createFile(
      import.meta.env.VITE_APPWRITE_BUCKET_ID,
      ID.unique(),
      file
    );
    return response;
  } catch (error) {
    console.error("Error uploading photo:", error);
  }
};
