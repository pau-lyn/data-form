import { Row, Col, Form, Button } from "react-bootstrap";
import SmileIcon from "../assets/smile";
import "./styles.css";
import { FormEvent } from "react";
import { useState } from "react";

function DataForm() {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Message: "",
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = e.currentTarget;
    const formData = new FormData(formElements);

    setLoading(true);

    fetch(
      "https://script.google.com/macros/s/AKfycbwodnDj_rJR-VLewutg-fUmx5tucj26bqX1E875yc7BWQfAafqkrbeyf1mKleKvvZ4OXw/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => {
        if (response.ok) {
          setSubmitSuccess(true);
          setFormData({
            Name: "",
            Email: "",
            Message: "",
          });
          setTimeout(() => {
            setSubmitSuccess(false);
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleClearAll = () => {
    setFormData({
      Name: "",
      Email: "",
      Message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="form-data">
      <div className="header">
        <h1 className="">
          Send me a message! <SmileIcon />
        </h1>
        <span className="note">
          Please note that fields marked with * are required.
        </span>
      </div>

      <Form className="form" onSubmit={(e) => handleSubmit(e)}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formFirstName">
            <Form.Label>
              Name <span className="required">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="Name"
              placeholder="Enter your name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formEmail">
            <Form.Label>
              Email <span className="required">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              name="Email"
              placeholder="Enter your email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formMessage">
            <Form.Label>
              Message <span className="required">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="Message"
              placeholder="Enter your message"
              className="custom-scrollbar"
              value={formData.Message}
              onChange={handleChange}
              style={{ resize: "none" }}
              required
            />
          </Form.Group>
        </Row>
        <div className="d-flex">
          <Button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
          <Button
            className="clear-all-btn"
            type="button"
            onClick={handleClearAll}
            disabled={loading}
          >
            Clear All
          </Button>
        </div>
      </Form>
      {submitSuccess && (
        <p className="success-message">Your message was successfully sent!</p>
      )}
    </div>
  );
}

export default DataForm;
