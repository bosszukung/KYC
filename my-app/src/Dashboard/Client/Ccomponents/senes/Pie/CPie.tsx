import { Box } from "@mui/material";
import CHeader from "../manu/CHeader";
import CPieChart from '../../../CPieChart'
import React from "react";

const CPie = () => {
  return (
    <Box m="20px">
      <CHeader title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <CPieChart />
      </Box>
    </Box>
  );
};

export default CPie;