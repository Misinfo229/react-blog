import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';
import { Request } from '../../helpers/Request';

export const NewPost = () => {

  const { myform, sendForm, changeForm, setForm } = useForm({});
  const [result, setResult] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [messageClass, setMessageClass] = useState("");
  const fileInputRef = useRef(null);

  const savePost = async (e) => {
    e.preventDefault();
    setResult(false);

    if (!myform.title || !myform.content) {
      setResult({
        status: "error",
        message: "Title and content are required fields."
      });
      return;
    }

    try {
      // Get form info
      const newPost = myform;

      // Save post in the backend
      console.log("Form data:", myform);
      const { info } = await Request(Global.url + "create", "POST", newPost);


      if (info.status === "success") {
        // Set result first
        setResult({
          status: "success",
          message: "Post created successfully"
        });

        // Upload image
        const fileInput = fileInputRef.current;

        // If there's an image, upload it
        if (fileInput && fileInput.files[0]) {
          const formData = new FormData();
          formData.append('file', fileInput.files[0]);
          const upload = await Request(Global.url + "upload-image/" + info.post._id, "POST", formData, true);

          console.log(upload.info);

          if (upload.info?.status === "success") {
            console.log("Image upload OK:", upload.info.post.image);
          } else {
            // Show warning about image, but keep post success
            console.warn("Image upload failed:", upload.info.message);
          }
        }

        setMessageClass("fade-in");
        // Reset myform
        setForm({});

        // Reset HTML fields
        formRef.current.reset();

        // Start exit animation after 1.5s
        setTimeout(() => {
          // Apply animation class
          setMessageClass("fade-out");
        }, 1500);

        // Wait 2 seconds and redirect
        setTimeout(() => {
          setResult(false);
          setMessageClass("");
          navigate("/posts");
        }, 2500);

      } else {
        // Backend returned a controlled error
        setResult({
          status: "error",
          message: info.message || "Error creating post"
        });
        console.warn("Backend error:", info.error);
      }
      console.log("Server response:", info);

    } catch (error) {
      // Unexpected network or JSON error
      setResult({ status: "error", message: "Unexpected error. Please try again later." });
      console.error("Unexpected error:", error);
    }
  }

  return (
    <div className="post">
      <div className="form-header">
        <h1 className="post-title">New post</h1>
        <p className="post-description">Form to create an article</p>
        {/* {result ? <strong>Post created successfully</strong> : ""} */}
        {result && (
          <div className={`alert ${result.status === "success" ? "alert-success" : "alert-error"} message ${messageClass}`}>
            {result.message}
          </div>
        )}
      </div>

      {/* New post form */}
      <form className="form" onSubmit={savePost} ref={formRef}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select name="category" onChange={changeForm} required>
            <option value="">Select a category</option>
            <option value="devops">DevOps</option>
            <option value="react">React</option>
            <option value="ai">AI</option>
            <option value="tools">Tools</option>
            <option value="web">Web</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type='text' name="title" onChange={changeForm} />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea name="content" onChange={changeForm} />
        </div>
        <div className="form-group">
          <label htmlFor="file0">Featured image</label>
          <input type='file' name="file0" id="file" ref={fileInputRef} />
        </div>
        <input type='submit' value="Save" className="btn btn-success" />
      </form>

    </div >
  )
}
