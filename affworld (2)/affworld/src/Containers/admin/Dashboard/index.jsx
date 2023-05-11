import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../Login/Login.css";
import Input from "../../../Components/UI/Input";
import CopyButton from "../../../Components/CopyButton";
import { getDatabase, ref, child, get } from "firebase/database";

/**
 * @author
 * @function Dashboard
 **/

const Dashboard = (props) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    offerName: "",
    source: "",
  });

  const [userId, setUserId] = useState("");
  const [allOffers, setAllOffers] = useState([]);
  const [allSources, setAllSources] = useState([]);
  const [textToCopy, setTextToCopy] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setTextToCopy(
      `${name === "offerName" ? value : formState.offerName}&utm_source=${
        name === "source" ? value : formState.source
      }&param1=${userId}`
    );
  };

  useEffect(() => {
    if (!auth.user) {
      navigate("/user/login");
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (auth.user) {
      // Get All Sources From DB
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

      // Get All Offers From DB
      get(child(dbRef, `offers`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setAllOffers(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });

      const user = JSON.parse(localStorage.getItem("user"));

      // Get UserId from DB
      get(child(dbRef, `users/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserId(snapshot.val().userId);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <>
      <div className="login-section section-padding">
        <Container>
          <Row>
            <Col lg={12}>
              <Card className="login-card">
                <Card.Body>
                  <h3 className="text-center">Offer Link Generator</h3>
                  {/* <Input
                    controlId="offerName"
                    title="Offer Name"
                    type="text"
                    name="offerName"
                    placeholder="Enter Offer name"
                    value={formState.offerName}
                    onChange={handleInputChange}
                    required={true}
                  /> */}

                  <Form.Group style={{ marginBottom: "1rem" }}>
                    <Form.Label> Select Offer Name </Form.Label>
                    <Form.Select
                      name="offerName"
                      onChange={handleInputChange}
                      aria-label="Select Offer Name"
                      value={formState.offerName}
                    >
                      <option value="" disabled selected>
                        Open This Offer Source Menu
                      </option>
                      {allOffers.map((offer, index) => {
                        return (
                          <>
                            <option key={index} value={offer.url}>
                              {offer.name}
                            </option>
                            ;
                          </>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group style={{ marginBottom: "1rem" }}>
                    <Form.Label> Select Traffic Source </Form.Label>
                    <Form.Select
                      name="source"
                      onChange={handleInputChange}
                      aria-label="Select Traffic Source"
                      value={formState.source}
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
                    controlId="uniqueId"
                    title="Unique ID"
                    type="text"
                    disabled={true}
                    name="userId"
                    placeholder="Enter Unique Id"
                    value={userId}
                  />

                  <h3>{textToCopy}</h3>
                  <CopyButton text={textToCopy}></CopyButton>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
