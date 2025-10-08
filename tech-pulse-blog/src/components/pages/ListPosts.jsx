import React from 'react';
import { Global } from '../../helpers/Global';
import defaultImg from '../../images/default.png';
import { Request } from '../../helpers/Request';
// SweetAlert
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

export const ListPosts = ({ posts, setPosts }) => {

  const deletePost = async (id) => {
    // SweetAlert
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
      background: "#1e1e2f",
      color: "#ffffff",
      customClass: {
        popup: "my-popup",
        title: "my-title",
        htmlContainer: "my-text",
        confirmButton: "my-confirm-btn",
        cancelButton: "my-cancel-btn"
      }
    });
    if (!result.isConfirmed) return;

    /* const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return; */

    // Add CSS class for fade out
    const postElement = document.getElementById(`post-${id}`);
    if (postElement) {
      postElement.classList.add("fade-out");
    }

    setTimeout(async () => {

      const { info } = await Request(Global.url + "post/" + id, "DELETE");

      if (info.status === "success") {
        const updatedList = posts.filter(post => post._id !== id);
        setPosts(updatedList);
        Swal.fire({
          title: "¡Post eliminado!",
          text: "El post ha sido eliminado correctamente.",
          icon: "success",
          background: "#1e1e2f",
          color: "#ffffff",
          customClass: {
            popup: "my-popup",
            title: "my-title",
            htmlContainer: "my-text",
            confirmButton: "my-confirm-btn"
          }
        });
      } else {
        Swal.fire("Error", "Something went wrong.", "error");
        Swal.fire({
          title: "¡Error!",
          text: "Hubo un error al eliminar el post",
          icon: "error",
          background: "#1e1e2f",
          color: "#ffffff",
          customClass: {
            popup: "my-popup",
            title: "my-title",
            htmlContainer: "my-text",
            confirmButton: "my-confirm-btn"
          }
        });
      }
    }, 500); // Wait for fade-out before removing

  };


  return (
    <div className="posts-container">
      {posts.map(post => {
        return (
          <article key={post._id} id={`post-${post._id}`} className="post fade-in">

            <span className={`badge ${post.category?.toLowerCase()}`}>{post.category}</span>

            <h2 className="post-title">
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h2>
            <p className="post-description">{post.content.slice(0, 120)}...</p>
            <p className="post-meta">{post.date?.slice(0, 10)}</p>

            {/*  <div className="mask"> */}
            <img
              src={
                post.image && post.image !== "default.png"
                  ? Global.url + "image/" + post.image
                  : defaultImg
              }
              alt={post.title}
            />
            {/* </div> */}
            <div className="post-actions">
              <Link to={`/edit/${post._id}`} className="button">Edit</Link>
              <button className="button" onClick={() => deletePost(post._id)}>Delete</button>
            </div>
          </article >
        );
      })
      }
    </div >
  )
}
