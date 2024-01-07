import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import AllPost from "./AllPost";
import { axiosInstanceCommunityPortalService } from "../../utils/axiosInstanceHMSApp";

const AllPostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstanceCommunityPortalService.get(
          "/posts/all"
        );
        const postsData = response.data;

        setPosts(postsData || []);

        console.log("post data:", postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className="text-success">All Posts</h1>
      <div className="row">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <Col key={i} lg={4} md={6} sm={12}>
              <AllPost key={post.postId} post={post} />
            </Col>
          ))
        ) : (
          <p className="text-danger">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default AllPostList;
