import { Box, useTheme } from "@mui/material";
import { tokens } from "../Theme";
import CHeader from "./Ccomponents/senes/manu/CHeader";
import { useEffect, useState } from "react";
import { HStack, Spinner, Text, VStack } from "native-base";
import { CaseCount } from "../../componants/caseCount";
import { DetailsCard } from "./Ccomponents/senes/DetailsCard";
import { HeaderDetails } from "./Ccomponents/senes/HeaderDetails";
import { useAPI } from "../Dcontexts/hooks/useAPI";
import { useAuthContext } from "../../Context";
import { KYCRequest, KycServices } from "../../Repo";
import { Error, costumerCaseCount } from "../../unities";
import { useLocation, useNavigate } from "react-router-dom";
import { ClientPagination } from "../../componants/Pagination";
import { SearchBox } from "../../componants/SearchBox";


export const CDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchResult, setSearchResult] = useState<KYCRequest>(
    {} as KYCRequest
  )
  const [searchResultExist, setSearchResultExist] = useState<
  "Yes" | "No" | "pending"
  >("pending");
  const[searchText, setSearchText] = useState("");
  const {
    listLodaing,
    searchForFI,
    handleClientPagination,
    getFIKycRequest,
  } = useAPI();
  const {
    state: {data, fetchedData, totalPageNumber, pageNo}
  } = useAuthContext();
  const state = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if(searchText === "") {
      setSearchResultExist("pending");
      setSearchResult({} as KYCRequest)
    }
  }, [searchText]);

  useEffect(() => {
    const {search} = state;
    search.length === 0 && navigate("/dashboard?page=1");
  },[navigate, state])

  useEffect(() => {
    const { search } = state;
    search.length !== 0 &&
      handleClientPagination(+search.slice(-1), fetchedData, totalPageNumber);
  }, [fetchedData, handleClientPagination, state, totalPageNumber]);

  const searchOperation = async () => {
    const re = /^0x[a-fA-F0-9]{40}$/;
    if (!re.test(searchText)) {
      Error("invalid Address");
    } else {
      try {
        const res = await searchForFI(searchText);
        if (res?.isFi) {
          setSearchResultExist('Yes');
        } else {
          setSearchResultExist('No')
        }
      } catch (error) {
        console.log(error)
      }
    }
  };

  useEffect(() => {
    const listenToEvent = async () => {
      KycServices.eventContract.on(
        "Data Hash Permission Changed",
        async (reqId, CleintID, FiID, status) => {
          console.log("event", FiID)
          getFIKycRequest(pageNo);
          Error("Data Permission Changed Successfully");
        }
      )
    }
    listenToEvent();
  }, [getFIKycRequest, pageNo])

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
            count={costumerCaseCount(data as KYCRequest[]).rejected}
            heading={"Rejected Cases"}
          />
        </Box>
      </Box>
      <VStack>
        <HStack
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={["column", "row"]}
        mb={'5'}
        >
          <Text
          textTransform={"capitalize"}
          fontWeight={"semibold"}
          fontSize={"lg"}
          color="white">
            My Individual Cases
          </Text>
          <SearchBox
              searchText={searchText}
              setSearchText={setSearchText}
              searchOperation={searchOperation}
            />
        </HStack>
        <VStack
        alignItems={"center"} 
        space={5} width="100%"
        >
          <Box
          width={['90vw', '100%']}
          overflow={['scroll', 'unset']}
          >
            <HeaderDetails />
            {listLodaing ? (
              <Spinner size={'lg'} />
            ) : (
              searchResultExist === 'pending' &&
              ([...data].reverse() as KYCRequest[]).map(
                (item:KYCRequest) => <DetailsCard item={item} />
              )
            )}
            ?
          </Box>
          {searchResultExist === 'Yes' && <DetailsCard item={searchResult} />}
          {searchResultExist === 'No' && 
          <Text>Financial Institution Dose not Exist</Text>}
        </VStack>
      </VStack>
      <ClientPagination />
    </Box>
  );
};

export default CDashboard;