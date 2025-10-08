import React, { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import { Request } from '../../helpers/Request';
import { ListPosts } from './ListPosts';


export const Posts = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts();

  }, []);

  const getPosts = async () => {
    try {
      const { info, loading } = await Request(Global.url + "posts", "GET");

      /* let request = await fetch(url, {
        method: "GET"
      });
      let query = await request.json(); */

      if (info.status === "success") {
        setPosts(info.posts);
      }
      setLoading(false);

    } catch (error) {
      console.error("Error fetching posts:", error);
    }

  }

  return (
    <>
      {loading ? "Loading..." :
        posts.length >= 1 ?
          <ListPosts posts={posts} setPosts={setPosts} />
          : <p className="not-found">There are no posts yet</p>
      }
    </>
  )
}
