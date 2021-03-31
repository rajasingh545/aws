import React, { useState, useEffect } from "react";
import { Message, Container } from "semantic-ui-react";

import { instance, Layout, apiUrl } from "../Component";

const Home = () => {
  const [posts, setPost] = useState([]);

  const init = async () => {
    try {
      const result = await instance.get("/post");
      if (result.status === 200) setPost([...result.data]);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const renderPost = () => {
    if (Array.isArray(posts) && posts.length) {
      return posts.map((post) => {
        return (
          <Message key={post.id}>
            <Message.Header>{post.title}</Message.Header>
            <p>{post.description}</p>
            <a href={`${apiUrl}/post/${post.id}`}>{post.key}</a>
          </Message>
        );
      });
    }
    return (
      <Message>
        <Message.Header>{`No Post available`}</Message.Header>
      </Message>
    );
  };
  return (
    <Layout>
      <Container>{renderPost()}</Container>
    </Layout>
  );
};

export default Home;
