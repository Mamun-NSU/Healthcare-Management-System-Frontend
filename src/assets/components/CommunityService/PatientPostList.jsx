import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import PatientPost from "./PatientPost";
import { axiosInstanceCommunityPortalService } from "../../utils/axiosInstanceHMSApp";

const PatientPostList = () => {
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstanceCommunityPortalService.get(
          `/posts/by-patient/${userId}`
        );
        const postsData = response.data;

        setPosts(postsData || []);

        console.log("post data:", postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div>
      <h1 className="text-success">My Posts</h1>
      <div className="row">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <Col key={i} lg={4} md={6} sm={12}>
              <PatientPost key={post.postId} post={post} />
            </Col>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default PatientPostList;
