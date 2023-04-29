import { Box, useTheme } from "@mui/material";
import {HStack, Text} from 'native-base'
import { tokens } from "../../Theme";

export const HeaderDetails = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode);
    return (
        <HStack width={["300vw", "100%"]} bgColor={"transperennt"} padding={5}>
            <Box textAlign={'center'} width={"1/5"}>
                <Text fontWeight={'light'} color={colors.primary[400]} fontSize={"lg"}>
                    Name
                </Text>
            </Box>
            <Box textAlign={"center"} width={"1/5"}>
                <Text fontWeight={"light"} color={colors.primary[400]} fontSize={"lg"}>
                    Status
                </Text>
            </Box>
            <Box textAlign={"center"} width={"1/5"}>
                <Text fontWeight={"light"} color={colors.primary[400]} fontSize={"lg"}>
                    Address
                </Text>
            </Box>
            <Box textAlign={"center"} width={"1/5"}>
                <Text fontWeight={"light"} color={colors.primary[400]} fontSize={"lg"}>
                    Toggle
                </Text>
            </Box>

            <Text
                textAlign={"center"}
                width={"1/5"}
                fontWeight={"light"}
                color={colors.primary[400]}
                fontSize={"lg"}
            >
                Action
            </Text>
        </HStack>
    );
} 