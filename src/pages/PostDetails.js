import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import MostPopular from "../components/MostPopular";
import Tags from "../components/Tags";

const PostDetails = ({ setActive }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getPostsData = async () => {
      const postRef = collection(db, "posts");
      const posts = await getDocs(postRef);
      setPosts(posts.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      let tags = [];
      posts.docs.map((doc) => tags.push(...doc.get("tags")));
      let uniqueTags = [...new Set(tags)];
      setTags(uniqueTags);
    };

    getPostsData();
  }, []);

  useEffect(() => {
    id && getPostDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getPostDetail = async () => {
    const docRef = doc(db, "posts", id);
    const postDetail = await getDoc(docRef);
    setPost(postDetail.data());
    setActive(null);
  };

  return (
    <div className="single">
      <div
        className="blog-title-box"
        style={{ backgroundImage: `url('${post?.imageUrl}')` }}
      >
        <div className="overlay"></div>
        <div className="blog-title">
          <span>{post?.timestamp.toDate().toDateString()}</span>
          <h2>{post?.title}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
              <span className="meta-info text-start">
                By <p className="author">{post?.author}</p> -&nbsp;
                {post?.timestamp.toDate().toDateString()}
              </span>
              <p className="text-start">{post?.story}</p>
            </div>
            <div className="col-md-3">
              <Tags tags={tags} />
              <MostPopular posts={posts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
