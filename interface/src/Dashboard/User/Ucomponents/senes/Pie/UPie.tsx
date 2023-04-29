import { Box } from "@mui/material";
import UHeader from "../manu/UHeader";
import UPieChart from '../../../UPieChart'
import React from "react";

const UPie = () => {
  return (
    <Box m="20px">
      <UHeader title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <UPieChart />
      </Box>
    </Box>
  );
};

export default UPie;