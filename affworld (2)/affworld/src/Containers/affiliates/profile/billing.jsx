import React, { useState, useEffect } from "react";
import "./profile.css";
import { Container, Typography } from "@mui/material";
/**
 * @author
 * @function billing
 **/

const billing = (props) => {

  return (
    <>
      <Container className="profile_container">
        <Typography variant="h4" sx={{ color: "#fff" }}>
          Profile Billing
        </Typography>
      </Container>
    </>
  );
};

export default billing;
