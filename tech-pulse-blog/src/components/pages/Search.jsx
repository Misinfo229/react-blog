import React, { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import { Request } from '../../helpers/Request';
import { ListPosts } from './ListPosts';
import { useParams } from 'react-router-dom';

export const Search = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    getPosts();
  }, [params]);

  const getPosts = async () => {
    try {
      const { info, loading } = await Request(Global.url + "search/" + params.search, "GET");

      if (info.status === "success") {
        setPosts(info.posts);
      } else {
        setPosts([]);
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
          : <div className="post">
            <p className="not-found">There are no posts yet</p>
          </div>
      }
    </>
  )
}
