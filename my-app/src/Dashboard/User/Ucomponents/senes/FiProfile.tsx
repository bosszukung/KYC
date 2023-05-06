import { Avatar, Box, FormControl, InputLabel, useTheme } from "@mui/material";
import { Center, Heading, HStack, Input, Pressable, VStack } from "native-base";
import {useEffect, useState} from "react";
import { Success, shorterString } from "../../../../unities";
import { useAuthContext } from "../../../../Context";
import CopyToClipboard from "react-copy-to-clipboard";
import { useAPI } from "../../../Dcontexts/hooks/useAPI";
import { FI } from "../../../../Repo";
import {tokens} from '../../../Theme'

export function FIProfilePage() {
    const [myData, setMyData] = useState<FI>({} as FI)
    const {
        state: {
            userDetails: {ID},
        },
    } = useAuthContext();
    const [userAddress, setUserAddress] = useState(shorterString(ID))
    const {getFIDetail} = useAPI();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        (async () => {
            const data = await getFIDetail(ID);
            if (data) {
                setMyData(data)
            }
        })();
    }, [getFIDetail, ID]);

    return (
        <>
            <Center>
                <Box
                color={colors.grey[100]}
                width={['90vw', '70vw']}
                minHeight={'40vh'}
                p={'8'}
                mt={'16'}
                borderRadius={'10'}
                position={'relative'}
                >
                    <VStack>
                        <HStack
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        mb={'4'}
                        >
                            <HStack
                            flexDir={['column', 'row']}
                            alignItems={['flex-start', 'center']}
                            >
                                <Avatar
                                sx={{
                                    my:'4', 
                                    bgcolor:colors.greenAccent[400],
                                    width: 56, 
                                    height: 56
                                }}
                                alt="Cindy Baker" 
                                src="/static/images/avatar/3.jpg"
                                >
                                    Cindy Baker
                                </Avatar>
                                <Pressable
                                onHoverIn={() => setUserAddress(ID)}
                                onHoverOut={() => setUserAddress(shorterString(ID))}
                                >
                                    <CopyToClipboard
                                    text={ID}
                                    onCopy={() => Success('Address copied sucessfully')}
                                    >
                                        <Heading size={'md'} ml={['1', '5']}>
                                            {userAddress}
                                        </Heading>
                                    </CopyToClipboard>
                                </Pressable>
                            </HStack>
                        </HStack>
                        <HStack
                        flexDir={['column', 'row']}
                        mb={'4'} 
                        space={['12']}
                        >
                            <FormControl sx={{width:['100%', '45%']}}>
                                <InputLabel>name</InputLabel>
                                <Input value={myData.name}/>
                            </FormControl>
                            <FormControl sx={{width:['100%', '45%']}}>
                                <InputLabel>Email</InputLabel>
                                <Input value={myData.email}/>
                            </FormControl>
                        </HStack>
                        <HStack
                        flexDir={['column', 'row']}
                        space={['12']}
                        >
                            <FormControl sx={{width:['100%', '45%']}}>
                                <InputLabel>Swift Code</InputLabel>
                                <Input value={myData.SwiftCode}/>
                            </FormControl>
                            <FormControl sx={{width:['100%', '45%']}}>
                                <InputLabel>KYC Count</InputLabel>
                                <Input value={myData.KYCCount}/>
                            </FormControl>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </>
    );
}