import { Box } from "@mui/material";
import Header from "../manu/Header";
import APieChart from "../../../APieChart";
import React from "react";

const APie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <APieChart />
      </Box>
    </Box>
  );
};

export default APie;