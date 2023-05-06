import { Box, useTheme } from "@mui/material";
import { tokens } from "../Theme";
import UHeader from './Ucomponents/senes/manu/UHeader'
import { Center, Button, Heading, Spinner, Text, VStack, HStack } from "native-base";
import { useEffect, useState } from "react";
import { CaseCount } from "../../componants/caseCount";
import { DetailCard } from "./Ucomponents/senes/DetailsCard";
import { HeaderDetails } from "./Ucomponents/senes/HeaderDetails";
import { SearchBox } from "../../componants/SearchBox";
import { AddButton } from "../../componants/addButton";
import { useAPI } from "../Dcontexts/hooks/useAPI";
import { useAuthContext } from "../../Context";
import { KycServices, KYCRequest, KYCStatus } from "../../Repo";
import { useLocation, useNavigate } from "react-router-dom";
import { Error, CaseCounts } from "../../unities";
import { UserPagination } from "../../componants/Pagination";

export const UDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<KYCRequest>(
    {} as KYCRequest
  );
  const [searchResultExist, setSearchResultExists] = useState<
    "Yes" | "No" | "Pending"
  >("Pending");
  const {
    listLodaing,
    searcForClient,
    handleFIPagination,
    getAllFiList,
  } = useAPI();
  const {
    state: { data, totalPageNumber, fetchedData, pageNo },
  } = useAuthContext();
  const state = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    const { search } = state;
    search.length === 0 && navigate("/dashboard?page=1");
  }, [navigate, state]);

  useEffect(() => {
    const { search } = state;
    search.length !== 0 &&
      handleFIPagination(
        +search.slice(-1),
        fetchedData,
        totalPageNumber
      );
  }, [fetchedData, handleFIPagination, state, totalPageNumber]);

  useEffect(() => {
    if (searchText === "") {
      setSearchResultExists("Pending");
      setSearchResult({} as KYCRequest);
    }
  }, [searchText]);
  
  const searchOperation = async () => {
    const re = /^0x[a-fA-F0-9]{40}$/;
    if (!re.test(searchText)) {
      Error("Invalid Address");
    } else {
      try {
        const res = await searcForClient(searchText);
        if (res && res[0]) {
          setSearchResult(res[2]);
          setSearchResultExists("Yes");
        } else {
          setSearchResultExists("No");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    function listenAddKYCEvent() {
      KycServices.eventContract.on(
        "KycRequestAdded",
        async (
          reqId: string,
          fiName: string,
          clientName: string,
          event: any
        ) => {
          console.log("inside kyc added", reqId, event);
          await getAllFiList(pageNo);
        }
      );
    }

    function listenKYCReRequested() {
      KycServices.eventContract.on(
        "KycReRequested",
        async (reqId: string, fiName: string, clientName: string) => {
          console.log("here");
          await getAllFiList(pageNo);
        }
      );
    }

    function listenKYCStatusChanged() {
      KycServices.eventContract.on(
        "KYC Status Changed",
        async (
          reqId: string,
          bankName: string,
          customerName: string,
          status: KYCStatus
        ) => {
          console.log("here");
          await getAllFiList(pageNo);
        }
      );
    }

    listenAddKYCEvent();
    listenKYCReRequested();
    listenKYCStatusChanged();
  }, [getAllFiList, pageNo]);




  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <UHeader title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box display="flex" justifyContent="space-between" alignItems="center"></Box>
      </Box>

      {/*GRID*/}
      <Box
        display="grid"
        gridTemplateColumns= "repeat(12, 1fr)"
        gridAutoRows= "140px"
        gap="20px"
      >
        <Box
          sx={{
          gridColumn: "span 3",
          backgroundColor:colors.primary[400]
          }}
          display= "flex" 
          alignContent= "center"
          justifyContent= "center"
        >
          <CaseCount count={data.length} heading={"Registered Cases"} />
        </Box>

        <Box
          sx={{
            gridColumn: "span 3",
            backgroundColor:colors.primary[400]
            }}
          display= "flex" 
          alignContent= "center"
          justifyContent= "center"
        >
          <CaseCount
              count={CaseCounts(data as KYCRequest[]).rejected}
              heading={"Rejected Cases"}
            />
        </Box>

        <Box
          sx={{
            gridColumn: "span 3",
            backgroundColor:colors.primary[400]
            }}
          display= "flex" 
          alignContent= "center"
          justifyContent= "center"
        >
          <CaseCount
              count={CaseCounts(data as KYCRequest[]).approved}
              heading={"Approved Cases"}
            />
        </Box>

        <Box
          sx={{
            gridColumn: "span 4",
            gridRow: 'span 2',
            backgroundColor:colors.primary[400]
            }}
          p="30px"
        >
          <AddButton add="Client" route="/dashboard/add" />
        </Box>
      </Box>
      <VStack>
        <HStack
        flexDirection={["column", "row"]}
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={'5'}
        >
          <Text
              mb={['2']}
              textTransform={"capitalize"}
              fontWeight={"semibold"}
              color={"white"}
              fontSize={"lg"}
            >
              My Individual Cases
            </Text>
            <SearchBox
              searchText={searchText}
              setSearchText={setSearchText}
              searchOperation={searchOperation}
            />
        </HStack>
        <VStack alignItems={"center"} space={5}>
          <Box
          width={["90vw", "100%"]} 
          overflow={["scroll", "unset"]}
          >
            <HeaderDetails />
            
            {listLodaing ? (
              <Spinner size="lg" />
              ) : (
              <VStack flexDir={"column-reverse"}>
                {searchResultExist === "Pending" &&
                    (data.length === 0 ? (
                      <Center>
                        <Heading color="white" mb="4">
                          No Customers Found
                        </Heading>
                        <Button onPress={() => navigate("/dashboard/add")}>
                          Add one
                        </Button>
                      </Center>
                    ) : (
                      (data as KYCRequest[]).map((item: KYCRequest) => (
                        <DetailCard item={item} />
                      ))
                    ))}
              </VStack>
            )}
          </Box>
          {searchResultExist === "Yes" && <DetailCard item={searchResult} />}
          {searchResultExist === "No" && <Text>Bank Dose not exist</Text>}
        </VStack>
      </VStack>
      <UserPagination/>
    </Box>
  );
};

export default UDashboard;