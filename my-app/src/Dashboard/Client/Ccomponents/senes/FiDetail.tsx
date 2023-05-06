import { Box, FormControl, Input, useTheme, InputLabel } from "@mui/material";
import {Button, Center, Heading, HStack, VStack, Text} from 'native-base';
import { useEffect, useState } from "react";
import {Success, Error} from '../../../../unities';
import CopyToClipboard from "react-copy-to-clipboard";
import { FI } from "../../../../Repo";
import {useAPI} from '../../../Dcontexts/hooks/useAPI';
import {useNavigate, useParams} from "react-router-dom";
import { tokens } from "../../../Theme";
import {PopHeader} from '../../../../componants/popHeader';

export function FiDetials() {
    const [data, setData] = useState({} as FI);
    const {getFIDetail} = useAPI();
    const [inactiveFI, setInactiveFI] = useState(false);
    const {ID} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        (async () => {
            try {
                if (ID) {
                    const result = await getFIDetail(ID);
                    if(result) {
                        setData(result);
                    }
                }
            } catch (error:any) {
                setLoading(false);
                if (error.message.includes("Financial Institution is  not active")) {
                    setInactiveFI(true);
                } else {
                    Error("Failed to fetch Financial Institution details");
                }
            } finally {
                setLoading(false);
            }
        })();
    },[getFIDetail, ID])

    return (
        <>
            <Center>
                <Box
                bgcolor={colors.grey[100]}
                width={['90vw', '60vw']}
                minHeight={'40vh'}
                p={'8'}
                mt={'16'}
                borderRadius={'10'}
                position={'relative'}
                >
                    {loading && (
                        <VStack 
                        space={'50'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        >
                            <Heading>Please wait</Heading>
                        </VStack>
                    )}
                    {inactiveFI && (
                        <VStack
                        space={'50'}
                        justifyContent={"center"}
                        alignItems={'center'}
                        >
                            <Heading>Financial Institution is not active</Heading>
                            <Button
                            bgColor={colors.blueAccent[800]}
                            _hover={{ bgColor: colors.blueAccent[600]}}
                            maxWidth={'50%'}
                            onPress={() => navigate('/dashboard')}
                            >
                                Go Back
                            </Button>
                        </VStack>
                    )}
                    {!inactiveFI && data.ID && (
                        <VStack>
                            <PopHeader text={'Back'} route={"/CDahboard"} />
                            <HStack
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            >
                                <HStack
                                flexDir={['column', 'row']}
                                alignItems={['flex-start', 'center']}
                                >
                                    <VStack ml={['1', '']}>
                                        <Text
                                        color={'black'}
                                        fontSize={'2xl'}
                                        >
                                            Financial Institution Details
                                        </Text>
                                    </VStack>
                                </HStack>
                            </HStack>
                            <VStack mb={'4'} space={'4'}>
                                <HStack
                                justifyContent={'space-between'}
                                flexDirection={['column', 'row']}
                                >
                                    <FormControl
                                    sx={{width:['100%', '45%']}}
                                    >
                                        <InputLabel>Email</InputLabel>
                                        <Input value={data.email} />
                                    </FormControl>
                                    <FormControl
                                    sx={{width:['100%', '45%']}}
                                    >
                                        <InputLabel>Name</InputLabel>
                                        <Input value={data.name} />
                                    </FormControl>
                                </HStack>
                                <HStack
                                justifyContent={'space-between'}
                                flexDirection={['column', 'row']}
                                >
                                    <FormControl
                                    sx={{width:['100%', '45%']}}
                                    >
                                        <InputLabel>Swift Code</InputLabel>
                                        <Input value={data.SwiftCode} />
                                    </FormControl>
                                    <CopyToClipboard
                                    text={data.ID}
                                    onCopy={() => Success("Address copied successfully")}>
                                        <FormControl
                                        sx={{width:['100%', '45%']}}
                                        >
                                            <InputLabel>Address</InputLabel>
                                            <Input value={data.ID} />
                                        </FormControl>
                                    </CopyToClipboard>
                                </HStack>
                            </VStack>
                        </VStack>
                    )}
                </Box>
            </Center>
        </>
    );
}
