import { Box, useTheme} from "@mui/material";
import { HStack, Text, IconButton } from "native-base";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { tokens } from "../../../Dashboard/Theme";


type docsType = {
    id: string,
    type: string,
    documentUrl: string,
    showButton: boolean,
    handleDelete: Function,
    setImage: null | Function, 
};

export function Card (
    {
        id,
        type,
        documentUrl,
        showButton,
        handleDelete,
        setImage
    }: docsType ) 
    {   const theme = useTheme();
        const colors = tokens(theme.palette.mode)
        return (
            <HStack
            alignItems={"flex-start"}
            justifyContent="space-between"
            mt={"10"}
            borderColor={colors.primary[400]}
            borderWidth={"2"}
            w={["100%", "48%"]}
            minH={"30vh"}
            py={"6"}
            p={["3", "2"]}
            mr={"5"}
            borderRadius={'9'}
          >
                <HStack flexDir={['column','row']}>
                    <Box
                    mb={'3'}
                    alignSelf={'flex-start'}
                    sx={{borderWidth:'2'}}
                    borderColor={colors.greenAccent[300]}
                    px={'4'}
                    py={'2'}
                    mr={'3'}
                    borderRadius={'8'}
                    >
                        <Text 
                        textTransform={'capitalize'}
                        color={colors.primary[400]}
                        fontSize={['sm', 'lg']}
                        >
                            {type}
                        </Text>
                    </Box>
                    {documentUrl !== "" && showButton ? (
                        <img
                            className="doc-img"
                            key={documentUrl}
                            src={documentUrl}
                            alt={type}
                        />
                    ) : (
                        <Box>
                            {setImage && (
                                <IconButton
                                position={'absolute'}
                                top={'2'}
                                right={'2'}
                                p={'0'}
                                mt={'1.5'}
                                ml={'3'}
                                onPress={() => setImage(id)}
                                icon={<CloseSharpIcon
                                    style={{color: "#0000"}}
                                    sx={{fontSize: '30'}}
                                />} />
                            )}
                            <img
                                className="doc-img"
                                key={documentUrl}
                                src={documentUrl}
                                alt={type}
                            />
                        </Box>
                    )}
                </HStack>
                {showButton && (
                    <IconButton
                    position={"absolute"}
                    top="2"
                    right="2"
                    p="0"
                    mt="1.5"
                    ml="3"
                    onPress={() => handleDelete(id)}
                    icon={<CloseSharpIcon style={{ color: "#fff" }} sx={{fontSize: "30"}}/>}
                    />
                )}
        </HStack>
    );
}