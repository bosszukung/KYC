import { Button, HStack, IconButton, Text } from "native-base";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../../Dashboard/Dcontexts/hooks/useAPI"; 
import { useAuthContext } from "../../Context";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

export function ClientPagination() {
    const {
        state: {pageNo, totalPageNumber}
    } = useAuthContext();
    const {listLodaing} = useAPI();
    const navigate = useNavigate();
    if (listLodaing) {
        return <></>;
    } 
    return totalPageNumber <= 1 ? (
        <></>
    )  : (
        <HStack justifyContent={"space-between"} w="100%" alignItems={"center"}>
      <HStack alignItems={"center"}>
        <ModeEditOutlineIcon sx={{color: "white"}} />
        <Text ml="2" color="white">
          {`Page ${pageNo} of ${totalPageNumber} pages`}
        </Text>
      </HStack>
      <HStack>
        {pageNo !== 1 && (
          <IconButton
            variant={"ghost"}
            color="white"
            icon={<ArrowBackIosIcon />}
            onPress={() => navigate(`/client?page=${pageNo - 1}`)}
          />
        )}
        <HStack w="80px" justifyContent={"space-evenly"} mx="2">
          <Button h="35px">{pageNo}</Button>
        </HStack>
        {pageNo < totalPageNumber && (
          <IconButton
            onPress={() => navigate(`/client?page=${pageNo + 1}`)}
            variant={"ghost"}
            color="white"
            icon={<ArrowForwardIosIcon />}
          />
        )}
      </HStack>
    </HStack>
    )
}