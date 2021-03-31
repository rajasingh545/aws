import React, { useState } from "react";
import { Form, Container, Message } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

import { Layout, instance } from "../Component";

const AddPost = () => {
  const [state, setState] = useState({
    title: "",
    description: "",
    attachment: "",
    formData: new FormData(),
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [sucess, setSuccess] = useState(false);

  const { title, description, formData } = state;

  const onChange = (e) => {
    var value =
      e.target.name === "attachment" ? e.target.files[0] : e.target.value;
    formData.set(e.target.name, value);
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const result = await instance.post("/post", formData);
      setLoading(false);
      if (result.status === 200) setSuccess(true);
    } catch (error) {
      setLoading(false);
      if (error && error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <Layout>
      {sucess && <Redirect to="/" />}
      <Container text>
        <Form
          autocomplete="off"
          onSubmit={onSubmit}
          loading={loading}
          error={errors.message}
        >
          <Message error content={errors.message} />
          <Form.Input
            fluid
            label="Title"
            name="title"
            placeholder="Enter the post title."
            value={title}
            onChange={onChange}
          />
          <Form.TextArea
            label="Description"
            name="description"
            placeholder="Tell us more about your post..."
            value={description}
            onChange={onChange}
          />
          <Form.Input
            fluid
            label="Attachment"
            name="attachment"
            placeholder="Attach your files."
            type={`file`}
            onChange={onChange}
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default AddPost;
