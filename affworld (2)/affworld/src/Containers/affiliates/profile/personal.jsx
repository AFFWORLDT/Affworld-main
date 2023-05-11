import React, { useState, useEffect } from "react";
import "./profile.css";
import { Container, Typography } from "@mui/material";
/**
 * @author
 * @function personal
 **/

const personal = (props) => {

  return (
    <>
      <Container className="profile_container">
        <Typography variant="h4" sx={{ color: "#fff" }}>
          Profile
        </Typography>
      </Container>
    </>
  );
};

export default personal;
