import React, { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import { Request } from '../../helpers/Request';
import { ListPosts } from './ListPosts';
import { useParams } from 'react-router-dom';
import defaultImg from '../../images/default.png';
import { marked } from 'marked';
import DOMPurify from "dompurify";

export const SinglePost = () => {

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    getPost();

  }, []);

  const getPost = async () => {
    try {
      const { info, loading } = await Request(Global.url + "post/" + params.id, "GET");

      if (info.status === "success") {
        setPost(info.post);
      }
      setLoading(false);

    } catch (error) {
      console.error("Error fetching post:", error);
    }

  }

  const rawMarkup = marked.parse(post.content || "");
  const cleanMarkup = DOMPurify.sanitize(rawMarkup);

  return (
    <div className='post'>
      {loading ? "Loading..." :
        (
          <>
            <span className={`badge ${post.category?.toLowerCase()}`}>{post.category}</span>
            <h1 className='post-title'>{post.title}</h1>
            <img
              src={
                post.image && post.image !== "default.png"
                  ? Global.url + "image/" + post.image
                  : defaultImg
              }
              alt={post.title}
            />
            <div className='post-meta'>
              {new Date(post.date).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
              {/* {new Date(post.date).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })} */}
            </div>
            <div
              className="post-description"
              dangerouslySetInnerHTML={{ __html: cleanMarkup }}
            />
          </>
        )
      }
    </div>
  )
}
