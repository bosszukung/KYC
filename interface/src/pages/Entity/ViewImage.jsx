import { Box, useTheme } from "@mui/material";
import {HStack, Pressable, Text, VStack} from "native-base";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { tokens } from "../../Dashboard/Theme";


export const ViewPhoto = ({
    url= '',
    type ='',
    setShowModal = false,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
        <Box 
            position={"fixed"}
            top={"12%"}
            left={["", "10%"]}
            sx={{borderWidth:'2'}}
            borderColor={colors.blueAccent[300]}
            bgcolor={colors.greenAccent[100]}
            width={["100vw", "80vw"]}
            height={["50vh", "80vh"]}
            zIndex={"99"}
        >
            <HStack width={"100%"} justifyContent={"flex-end"}>
                <Pressable onPress={() => setShowModal(false)} p={'1'}>
                    <CloseOutlinedIcon
                        color={colors.primary[400]}
                        sx={{cursor:"pointer", fontSize:"30"}}
                        className="cross-icon"
                    />
                </Pressable>
            </HStack>
            <VStack
                space={"2"}
                justifyContent={"center"}
                alignItems={"center"}
                zIndex={"4"}
            >
                <Text 
                    textTransform={"capitalize"} 
                    color={colors.primary[400]}
                    fontSize={"xl"}
                >
                    {type && type}
                </Text>
                {url && <img className="view-image" src={url} alt="view" />}
            </VStack>
        </Box>
    );
}