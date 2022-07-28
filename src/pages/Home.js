import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import PostSection from "../components/PostSection";
import { db } from "../firebase-config";
import Spinner from "../components/spinner";
import { toast } from "react-toastify";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";

const Home = ({ setActive, user }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "posts"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setPosts(list);
        setLoading(false);
        setActive("home");
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [setActive]);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Do you really want to delete this post?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "posts", id));
        toast.success("Kasetsu Deleted Successfully");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log("Posts", posts);

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-0">
          <div className="col-md-8">
            <PostSection
              posts={posts}
              user={user}
              handleDelete={handleDelete}
            />
          </div>
          <div className="col-md-3">
            <Tags tags={tags} />
            <MostPopular posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
