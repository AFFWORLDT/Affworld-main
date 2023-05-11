import React, { useEffect, useState } from "react";
import PageTitle from "../../Components/UI/PageTitle";
import "./Login.css";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Input from "../../Components/UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { login, setError } from "../../actions/auth.action";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * @author
 * @function Login
 **/

const Login = (props) => {
  const toastId = React.useRef(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    toast.dismiss(toastId.current);
    if (auth.loading) {
      toastId.current = toast.info("❕ Loading...", { autoClose: false });
    }
    if (auth.user) {
      navigate('/affiliate/offers')
      toast.dismiss(toastId.current);
      toast.success("✔ Logged In Succesfully!");
    }
    if (auth.error) {
      toast.dismiss(toastId.current);
      toast.error(`❌ ${auth.error}`);
    }

    return () => {
      // Reset the auth.error value when the component unmounts
      if (auth.error) {
        dispatch(setError(null));
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  //   if(auth.authenticate) {
  //     return <Redirect to={"/blogs"} />
  //   }

  return (
    <>
      <PageTitle
        title="Login"
        para="Hey There! Good To See You're Visiting Us Back. Login and get back on the amazing Journey."
      />
      <div className="login-section section-padding">
        <Container>
          <Row>
            <Col lg={12}>
              <Card className="login-card">
                <Card.Body>
                  <h3 className="text-center">Login</h3>
                  <Form onSubmit={loginSubmit}>
                    <Input
                      controlId="loginEmail"
                      title="Email/Phone"
                      type="email"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                      controlId="loginPassword"
                      title="Password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                  <div className="confirmDiv">
                    {" "}
                    Not a user yet?{" "}
                    <NavLink to="/user/signup"> Sign up </NavLink>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
