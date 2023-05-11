import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Wallet.css";
import Input from "../../../Components/UI/Input";
import CopyButton from "../../../Components/CopyButton";
import { getDatabase, ref, child, get } from "firebase/database";
import { Typography } from "@mui/material";
/**
 * @author
 * @function Wallet
 **/

const Wallet = (props) => {

  return (
    <>
      <Container className="wallet_container">
        <Typography variant="h4" sx={{ color: "#fff" }}>
          Wallet
        </Typography>
      </Container>
    </>
  );
};

export default Wallet;
