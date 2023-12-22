import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { MdRecycling, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Zoom, toast } from "react-toastify";
import config from "../../config";

const apiUrl = config.apiUrl;
function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    try {
      const response = await fetch(`${apiUrl}/auth/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: username,
          password: password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        login(result.Admin.token);
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
          style: {
            width: "400px",
            fontSize: "16px",
          },
        });

        navigate("/");
      } else {
        console.error("Login failed");
        toast.error("Login failed. Please check your username and password.", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      window.alert("Error during login. Please try again later.");
    }
  };

  return (
    <div className="container mt-0 p-0">
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
                      Login to Your Account
                    </h5>
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
                      <div className="input-group has-validation">
                        <Form.Control
                          type="text"
                          name="username"
                          id="yourUsername"
                          required
                          value={username}
                          autoComplete="username"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your username.
                        </Form.Control.Feedback>
                      </div>
                    </Col>
                    <Col md={12}>
                      <Form.Label htmlFor="yourPassword" className="form-label">
                        Password
                      </Form.Label>
                      <div className="input-group has-validation">
                        <Form.Control
                          type={showPassword ? "text" : "password"} 
                          name="password"
                          id="yourPassword"
                          autoComplete="current-password" 
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                          Please enter your password!
                        </Form.Control.Feedback>
                      </div>
                    </Col>
                    <Col md={12}>
                      <Button className="btn btn-primary w-100" type="submit">
                        Login
                      </Button>
                    </Col>
                    <Col md={12}>
                      <p className="small mb-0">
                        Don't have an account?{" "}
                        <Link to="/signup">Create an account</Link>
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

export default SignIn;
