import React from "react";
import validator from "validatorjs";
import { Button, Form, Alert } from "react-bootstrap";

const ShowErrors = ({ errors }) => {
  return (
    <div>
      {errors.map((error, i) => (
        <Alert variant="danger" key={i}>
          {error}
        </Alert>
      ))}
    </div>
  );
};

export default class From extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    let data = { email, password };
    let rules = { email: "required|email", password: "min: 5|required" };

    let validation = new validator(data, rules);
    validation.passes();
    this.setState({
      errors: [
        ...validation.errors.get("email"),
        ...validation.errors.get("password"),
      ],
    });
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.state.errors && <ShowErrors errors={this.state.errors} />}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
