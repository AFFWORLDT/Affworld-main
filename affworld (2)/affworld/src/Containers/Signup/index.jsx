import React, { useState, useEffect } from "react";
import PageTitle from "../../Components/UI/PageTitle";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import Input from "../../Components/UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { createUserProfile, signup, setError } from "../../actions/auth.action";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  child,
  get,
} from "firebase/database";

// import { createUserProfile } from "../firebase";

/**
 * @author
 * @function Signup
 **/

const Signup = (props) => {
  const toastId = React.useRef(null);
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [trafficNumber, setTrafficNumber] = useState("");
  const [trafficSource, setTrafficSource] = useState("");
  const [experience, setExperience] = useState("");
  const [userId, setUserId] = useState("");
  const [allSources, setAllSources] = useState([]);

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const generateUid = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uid = "";
    for (let i = 0; i < 4; i++) {
      uid += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uid;
  };

  const handleGenerateUserId = async () => {
    let newUserId = generateUid();
    let userIdExists = true;

    const usersRef = ref(getDatabase(), "users");
    while (userIdExists) {
      const uidQuery = query(
        usersRef,
        orderByChild("userId"),
        equalTo(newUserId)
      );
      const snapshot = await get(uidQuery);
      if (snapshot.val() === null) {
        userIdExists = false;
      } else {
        newUserId = generateUid();
      }
    }
    setUserId(newUserId);
  };

  useEffect(() => {
    handleGenerateUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signupSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await dispatch(signup(email, password));
      await createUserProfile(user.uid, {
        username,
        email,
        trafficSource,
        trafficNumber,
        experience,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `sources`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setAllSources(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (auth.loading) {
      toastId.current = toast.info("❕ Loading...", { autoClose: false });
    }
    if (auth.user) {
      toast.dismiss(toastId.current);
      toast.success(`✔ Signup Succes!`);
      setEmail("");
      setPassword("");
      setTrafficNumber("");
      setTrafficSource("");
      navigate("/user/dashboard");
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

  // if (auth.authenticate) {
  //   return <Redirect to={'/blogs'} />
  // }

  // if(done) {
  //   return <Redirect to={'/user/login'} />
  // }

  return (
    <>
      <PageTitle
        title="Signup"
        para="Hey There! Looks Like You Have Finally Decided To Join Us And Become Part Of An Amazing Community."
      />
      <div className="signup-section section-padding">
        <Container>
          <Row>
            <Col lg={12}>
              <Card className="login-card">
                <Card.Body>
                  <h3 className="text-center">Signup</h3>
                  <Form onSubmit={signupSubmit}>
                    <Input
                      controlId="lastName"
                      title="User Name"
                      type="text"
                      placeholder="Enter User name"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      required={true}
                    />

                    {/* <Input
                      controlId="trafficSource"
                      title="Traffic Source"
                      type="text"
                      placeholder="Enter traffic Source"
                      value={trafficSource}
                      onChange={(e) => setTrafficSource(e.target.value)}
                    /> */}

                    <Form.Group style={{ marginBottom: "1rem" }}>
                      <Form.Label> Select Traffic Source </Form.Label>
                      <Form.Select
                        name="source"
                        onChange={(e) => {
                          setTrafficSource(e.target.value);
                        }}
                        aria-label="Select Traffic Source"
                        value={trafficSource}
                      >
                        <option value="" disabled selected>
                          Open This Traffic Source Menu
                        </option>
                        {allSources.map((source, index) => {
                          return (
                            <>
                              <option key={index} value={source.value}>
                                {source.name}
                              </option>
                              ;
                            </>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>

                    <Input
                      controlId="trafficNumber"
                      title="Traffic Number"
                      type="number"
                      placeholder="Enter Traffic Number"
                      value={trafficNumber}
                      onChange={(e) => setTrafficNumber(e.target.value)}
                    />

                    <Input
                      controlId="signupEmail"
                      title="Email address"
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      message="We'll never share your email with anyone else."
                      required={true}
                    />

                    <Input
                      controlId="signupPassword"
                      title="Password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required={true}
                    />

                    <Form.Group className="mb-3" controlId="experienceTextArea">
                      <Form.Label> Your Experience </Form.Label>
                      <Form.Control
                        required={true}
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        as="textarea"
                        placeholder="Describe your Experience / How would You Bring Traffic From Your Sources"
                        rows={3}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                  <div className="confirmDiv">
                    {" "}
                    Already a user? <NavLink to="/user/login"> Login </NavLink>
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

export default Signup;
