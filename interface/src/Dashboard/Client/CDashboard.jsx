import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../Theme";
import CHeader from "./Ccomponents/senes/manu/CHeader";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import CStatBox from "./CStatBox";
import CProgressCircle from "./CProgessCircle";

const CDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <CHeader title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box display="flex" justifyContent="space-between" alignItems="center">
        </Box>
      </Box>

      {/*GRID*/}
      <Box
        display="grid"
        gridTemplateColumns= "repeat(12, 1fr)"
        gridAutoRows= "140px"
        gap="20px"
      >
        <Box
          gridColumn= "span 3"
          backgroundColor= {colors.primary[400]}
          display= "flex" 
          alignContent= "center"
          justifyContent= "center"
        >
          <CStatBox 
            title = "12,361"
            subtitle= "Emails Sent"
            progress="0.75"
            increase= "+14%"
            icon={
              <EmailIcon 
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px"
                }}
              />
            }
          />
        </Box>

        <Box
          gridColumn= "span 3"
          backgroundColor= {colors.primary[400]}
          display= "flex" 
          alignContent= "center"
          justifyContent= "center"
        >
          <CStatBox 
            title = "431,225"
            subtitle= "Sales Obtained"
            progress="0.5"
            increase= "+21%"
            icon={
              <PointOfSaleIcon 
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px"
                }}
              />
            }
          />
        </Box>

        <Box
          gridColumn= "span 3"
          backgroundColor= {colors.primary[400]}
          display= "flex" 
          alignContent= "center"
          justifyContent= "center"
        >
          <CStatBox 
            title = "32,441"
            subtitle= "New Client"
            progress="0.30"
            increase= "+5%"
            icon={
              <PersonAddIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px"
                }}
              />
            }
          />
        </Box>

        <Box
          gridColumn= "span 3"
          backgroundColor= {colors.primary[400]}
          display= "flex" 
          alignContent= "center"
          justifyContent= "center"
        >
          <CStatBox 
            title = "1,325,134"
            subtitle= "Traffic Inbound"
            progress="0.80"
            increase= "+43%"
            icon={
              <TrafficIcon 
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px"
                }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <CProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CDashboard;