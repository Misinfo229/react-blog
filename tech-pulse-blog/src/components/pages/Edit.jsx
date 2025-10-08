import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';
import { Request } from '../../helpers/Request';
import defaultImg from '../../images/default.png';

export const Edit = () => {

  const [post, setPost] = useState({});
  const { myform, sendForm, changeForm, setForm } = useForm({});
  const [result, setResult] = useState(false);
  const params = useParams();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [messageClass, setMessageClass] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {

    try {
      const { info } = await Request(Global.url + "post/" + params.id, "GET");


      if (info.status === "success") {
        setForm(info.post);
        setPost(info.post);
      }

    } catch (error) {
      console.error("Error fetching post:", error);
    }

  }

  const editPost = async (e) => {
    e.preventDefault();
    setResult(false);

    try {
      // Get form info
      const newPost = myform;
      console.log("Form data:", myform);

      // Save post in the backend
      const { info } = await Request(Global.url + "post/" + params.id, "PUT", newPost);

      // Upload image
      const fileInput = fileInputRef.current;
      console.log("fileInput:", fileInput);

      if (info.status === "success") {
        setResult({
          status: "success",
          message: "Post saved successfully"
        });

        // Upload image if a new one was selected
        if (fileInput && fileInput.files[0]) {
          const formData = new FormData();
          formData.append('file', fileInput.files[0]);

          const upload = await Request(Global.url + "upload-image/" + info.post._id, "POST", formData, true);
          console.log(upload.info);

          if (upload.info.status === "success") {
            // Update image in local state, but don't 
            // overwrite success message
            setPost(prev => ({
              ...prev,
              image: upload.info.post.image
            }));
          } else {
            setResult({
              status: "error",
              message: upload.info.message || "Error uploading image"
            });
          }
        }

        setMessageClass("fade-in");

        // Reset myform
        setForm({});
        // Reset HTML fields
        formRef.current.reset();

        // Start exit animation after 1.5s
        // Apply animation class
        setTimeout(() => setMessageClass("fade-out"), 1500);
        setTimeout(() => {
          setResult(false);
          setMessageClass("");
          // Wait 2 seconds and redirect
          navigate("/posts");
        }, 2500);

      } else {
        // Server returned success: false
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
  };



  return (
    <div className="post">
      <div className="post-header">
        <h1 className="post-title">Edit post</h1>
        <p className="post-description">Modify the fields below: </p>
        
        {result && (
          <div className={`alert ${result.status === "success" ? "alert-success" : "alert-error"} message ${messageClass}`}>
            {result.message}
          </div>
        )}
      </div>

      {/* New post form */}
      <form className="form" onSubmit={editPost} ref={formRef}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select name="category" value={myform.category || ""} onChange={changeForm} required>
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
          <input type='text' name="title" onChange={changeForm} defaultValue={post.title || ""} />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea name="content" onChange={changeForm} defaultValue={post.content || ""} />
        </div>
        <div className="form-group">
          <label htmlFor="file0">Featured image</label>

          <img className="thumbnail"
            src={
              post.image && post.image !== "default.png"
                ? Global.url + "image/" + post.image
                : defaultImg
            }
            alt={post.title}
          />
          <input type='file' name="file0" id="file" ref={fileInputRef} />
        </div>
        <input type='submit' value="Save" className="btn btn-success" />
      </form>

    </div>
  )
}
