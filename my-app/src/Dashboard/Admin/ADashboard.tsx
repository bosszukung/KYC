import { Box, useTheme } from "@mui/material";
import { HStack, Spinner, Text, VStack, Heading, Center, Button} from "native-base";
import { useEffect } from "react";
import { tokens } from "../Theme";
import Header from "./Acomponents/senes/manu/Header"
import { CaseCount } from "../../componants/caseCount";
import {CardDetails} from './Acomponents/AdminCard'
import { HeaderDetails } from "./Acomponents/headerDetail";
import { useLocation, useNavigate } from "react-router-dom";
import { useAPI } from "../Dcontexts/hooks/useAPI";
import { useAuthContext } from "../../Context/auth-context";
import { KycServices, FI } from "../../Repo";
import { adminCaseCount } from "../../unities";
import {AdminPagination} from "../../componants/Pagination";
import { AddButton } from "../../componants/addButton";


export const ADashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    state: {data, fetchedData, totalPageNumber, pageNo},
  } = useAuthContext();
  const {listLodaing, handleAdminPagination, getFIList} = useAPI();
  const state = useLocation();
  let navigate = useNavigate();

  useEffect (() => {
    const {search} = state;
    search.length === 0 && navigate('/dashboard?page=1');
  }, [navigate, state]);

  useEffect (() => {
  const {search} = state;
  search.length !== 0 &&
    handleAdminPagination(+search.slice(-1), fetchedData, totalPageNumber);
  }, [fetchedData, handleAdminPagination, state, totalPageNumber]); 

  useEffect(() => {
    const listenEditEvent = async () => {
      KycServices.eventContract.on(
        "Financial Institution updated",
        async (ID: string, name: string, email: string) => {
          await getFIList(pageNo)
        }
      );
    };

    const listenToggleActivateEvent = async () => {
      KycServices.eventContract.on(
        "Financial Institution Activated", 
        async(ID:string, name: string) => {
          await getFIList(pageNo);
        }
      );
    }; 

    const listenToggleDeActivateEvent = async () => {
      KycServices.eventContract.on(
        "Financial Institution Deactivated",
        async (ID:string, name: string) => {
          await getFIList(pageNo);
        }
      )
    }

    listenToggleActivateEvent();
    listenToggleDeActivateEvent();
    listenEditEvent();
  }, [getFIList, pageNo]);

  

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
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
          sx={{backgroundColor:{colors}}}
          display= "flex" 
          alignContent= "center"
          justifyContent= "center"
        >
          <CaseCount 
            count={data.length} 
            heading={"Total Institution"}
          />
        </Box>

        <Box
          gridColumn= "span 3"
          sx= {{backgroundColor:colors.primary[400]}}
          display= "flex" 
          alignContent= "center"
          justifyContent= "center"
        >
          <CaseCount
            count={adminCaseCount(data as FI[]).inActive}
            heading={"Inactive Financial Institutions"}
          />
        </Box>

        <Box
          gridColumn= "span 3"
          sx= {{backgroundColor:colors.primary[400]}}
          display= "flex" 
          alignContent= "center"
          justifyContent= "center"
        >
          <CaseCount 
            count={adminCaseCount(data as FI[]).active} 
            heading={"Active Financial Intitutions"}
          />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          sx= {{backgroundColor:colors.primary[400]}}
          p="30px"
        >
          <AddButton add="Financial Institution" route="/dashboard/add" />
        </Box>
      </Box>
      <VStack>
        <HStack
        flexDirection={["column", "row"]}
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={5}
        >
          <Text
          mb={['2']}
          color={"white"}
          textTransform={"capitalize"}
          fontWeight={"semibold"}
          fontSize={"lg"}
          >
            MY INDIVIDUAL CASE
          </Text>
        </HStack>
        <VStack alignItems={'center'} space={'5'}>
          <Box
          width={['90vw', '100%']} 
          overflow={["scroll", 'unset']}
          >
            <HeaderDetails/>
            {listLodaing ? (
              <Spinner size={'lg'} />
            ) : (
              <VStack flexDir={"column-reverse"}>
                {data.length === 0 ? (
                  <Center>
                    <Heading 
                    color={colors.primary[400]}
                    mb={'4'}
                    >
                      No FI Found
                    </Heading>
                    <Button onPress={() => navigate('/dashboard/add')}>
                      Add FI
                    </Button>
                  </Center>
                ) : (
                  (data as FI[]).map((item: FI) => (
                    <CardDetails item={item} />
                  ))
                )}
              </VStack>
            )}
          </Box>
        </VStack>
      </VStack>
      <AdminPagination/>
    </Box>
  );
};

export default ADashboard;