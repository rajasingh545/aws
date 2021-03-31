import React from "react";
import { Message, Container } from "semantic-ui-react";
import { Layout } from "../Component";

const NotFound = () => {
  return (
    <Layout>
      <Container>
        <Message content="Oops no page found." />
      </Container>
    </Layout>
  );
};

export default NotFound;
