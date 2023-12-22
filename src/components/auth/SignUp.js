import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { MdRecycling, MdVisibility, MdVisibilityOff } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../config";

const apiUrl = config.apiUrl;
function SignUp() {
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/admin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: newAdmin.username,
          password: newAdmin.password,
        }),
      });

      if (response.ok) {
        toast.success("Account created successfully! You can now log in.", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",

          style: {
            width: "400px",
            fontSize: "16px",
          },
        });

        navigate("/signin");
      } else {
        console.error("Registration failed");

        toast.error("Registration failed. Please try again.", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Error during registration. Please try again later.");
    }
  };

  return (
    <div className="container">
      <section className="section register d-flex flex-column align-items-center justify-content-center py-4">
        <Container>
          <Row className="justify-content-center">
            <Col
              lg={4}
              md={6}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <div className="d-flex justify-content-center py-4">
                <Link
                  to="/index"
                  className="logo d-flex align-items-center w-auto"
                >
                  <MdRecycling color="#1E8449" size={"3rem"} />
                  <span className="d-none d-lg-block">CVS Recycling</span>
                </Link>
              </div>
              <Card className="mb-3">
                <Card.Body>
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Create an Account
                    </h5>
                    <p className="text-center small">
                      Enter your personal details to create an account
                    </p>
                  </div>
                  <Form
                    className="row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Col md={12}>
                      <Form.Label htmlFor="yourUsername" className="form-label">
                        Username
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          name="username"
                          id="yourUsername"
                          value={newAdmin.username}
                          autoComplete="username"
                          onChange={handleInputChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please choose a username.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                    <Col md={12}>
                      <Form.Label htmlFor="yourPassword" className="form-label">
                        Password
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="yourPassword"
                          value={newAdmin.password}
                          onChange={handleInputChange}
                          required
                          autoComplete="current-password" 
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={handlePasswordVisibility}
                          className="password-toggle"
                        >
                          {showPassword ? (
                            <MdVisibilityOff />
                          ) : (
                            <MdVisibility />
                          )}
                        </Button>
                        <Form.Control.Feedback type="invalid">
                          Please enter your password.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                    <Col md={12}>
                      <Button className="btn btn-primary w-100" type="submit">
                        Create Account
                      </Button>
                    </Col>
                    <Col md={12}>
                      <p className="small mb-0">
                        Already have an account?{" "}
                        <Link to="/signin">Log in</Link>
                      </p>
                    </Col>
                  </Form>
                </Card.Body>
              </Card>
              <div className="credits">
                Designed by{" "}
                <Link to="https://www.linkedin.com/company/riada-tech/">
                  Riada Tech
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default SignUp;
