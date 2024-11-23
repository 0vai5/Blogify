import react, { useState } from "react";
import { Input, Label, Button } from "@/components";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadPhoto } from "@/utils/appwrite.config";

const CreateBlog = () => {
  const [content, setContent] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    clear,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // TODO: Firebase Firestore for Images or S3 AWS for Images

    const imgResponse = uploadPhoto(data.file[0]);

    const imageURL = `https://cloud.appwrite.io/v1/storage/buckets/${
      imgResponse.bucket
    }/files/${imgResponse.$id}/view?project=${
      import.meta.env.VITE_APPWRITE_PROJECT_ID
    }`;

    const blogData = {
      title: data.title,
      imageURL: imageURL,
      content,
    };
    try {
      const response = await fetch("https://localhost:3000/blog/createBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(response.message);
      }

      toast.success(response.message);
      clear();
    } catch (error) {
      toast.error(response.message);
    }
  };

  return (
    <section className="max-container">
      <main>
        <Toaster reverseOrder={false} position="top-right" />
        <h1 className="head-text">Create Blog</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Title
            <Input
              type="text"
              {...register("title", {
                required: true,
              })}
            />
          </Label>
          <Label>
            Description
            <Input
              type="text"
              {...register("Description", {
                required: true,
              })}
            />
          </Label>
          <Label>
            File
            <Input
              type="file"
              {...register("file", {
                required: true,
              })}
              className="mb-4"
            />
          </Label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(e) => setContent(e)}
          />
          <Button>Submit</Button>
        </form>
      </main>
    </section>
  );
};

export default CreateBlog;
