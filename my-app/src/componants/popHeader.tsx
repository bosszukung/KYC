import { HStack, Icon, Pressable, Text } from "native-base";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";

export function PopHeader({ text, route }:
  {text: string,
  route: any }) {
  const navigate = useNavigate();
  return (
    <HStack alignItems={"center"} mb="4">
      <Pressable onPress={() => navigate(route)}>
        <Icon as={<ArrowBackIosNewIcon sx={{fontSize:'20'}} className="icon" />} />
      </Pressable>
      <Text
        color="black"
        textTransform={"capitalize"}
        fontWeight={"lg"}
        ml="2"
        fontSize="xl">
        {text}
      </Text>
    </HStack>
  );
}