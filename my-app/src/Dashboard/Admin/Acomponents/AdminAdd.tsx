import { tokens } from "../../Theme";
import { Box, FormControl, useTheme, InputLabel} from "@mui/material";
import {Center, Heading, HStack, Spinner, Text, VStack, Button, Input} from 'native-base';
import {PopHeader} from '../../../componants/popHeader'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuthContext} from '../../../Context/auth-Context';
import {useAPI} from '../../Dcontexts/hooks/useAPI';
import { KycServices } from "../../../Repo";
import { Error } from "../../../unities";
import React from "react";

type userDetails = {
    name: string;
    ID: string;
    SwiftCode: string;
    email: string
}

export function AddPage() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [userDetails, setUser] = useState<userDetails>({
        name: '',
        ID: '',
        email: '',
        SwiftCode: '',
        
    });
    const [loading, setLoading] = useState(false);
    const {state: {pageNo} } = useAuthContext();
    const {AddFI, getFIList} = useAPI();
    let navigate = useNavigate();

    function validate() {
        if (!userDetails.name) {
            Error("Name is requested");
            return false;
        } else if (userDetails.ID.length < 30) {
            Error("Invalid address");
            return false;
        }else if (!userDetails.email.includes("@")) {
            Error("Invalid email address");
            return false;
        } else if (userDetails.SwiftCode.length < 11) {
            Error("Invalid Swift Code");
            return false;
        } 
        return true; 
    }
        

    async function handleSubmitDetails() {
        try {
            setLoading(true);
            if (validate()) {
                await AddFI({
                    ...userDetails,
                    KYCCount: "0",
                    status:0
                });
                setUser({
                    name: "",
                    ID: "",
                    email: "",
                    SwiftCode: "",
                });
                navigate('/admin');
            }
        }catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const listenToEvent = async () => {
            KycServices.eventContract.on(
                "Financial Initution Added", 
                async (ID:string, name:string, email:string, SwiftCode:string) => {
                    await getFIList(pageNo);
                }
            );
        };
        listenToEvent();
    }, [getFIList, pageNo]);

    return (
        <div>
            <Center mt={["3","16"]}>
                <Box mt={'5'} width={'90vw'}>
                    <Heading color={colors.grey[100]} mb="4" alignSelf={"flex-start"}>
                        Add Financial Insitution
                    </Heading>
                    <VStack bg={colors.grey[300]} minH="50vh" borderRadius={10} p="10" space={5}>
                        <PopHeader text={"Back"} route="/admin" />
                        <FormControl sx={{width: '100%'}}>
                            <InputLabel>
                                <Text>Name</Text>
                            </InputLabel>
                            <Input
                                onChangeText={(text) =>
                                    setUser((curr) => ({...curr, name: text}))
                                }    
                                value={userDetails.name}
                                color="blueGray.900"
                                placeholder="Sarah Dee"
                                borderColor={"blueGray.900"}
                            />
                        </FormControl>
                        <FormControl sx={{width: '100%'}}>
                            <InputLabel>
                                <Text>Email</Text>
                            </InputLabel>
                            <Input
                                onChangeText={(text) =>
                                    setUser((curr) => ({...curr, email: text}))
                                }    
                                value={userDetails.email}
                                color="blueGray.900"
                                placeholder="Sarah.D@gmai.com"
                                borderColor={"blueGray.900"}
                            />
                        </FormControl>
                        <FormControl sx={{width: '100%'}}>
                            <InputLabel>
                                <Text>Swift Code</Text>
                            </InputLabel>
                            <Input
                                onChangeText={(text) =>
                                    setUser((curr) => ({...curr, SwiftCode: text}))
                                }    
                                value={userDetails.SwiftCode}
                                color="blueGray.900"
                                placeholder="ANEXGB22"
                                borderColor={"blueGray.900"}
                            />
                        </FormControl>
                        <FormControl sx={{width: '100%'}}>
                            <InputLabel>
                                <Text>MetaMask Address</Text>
                            </InputLabel>
                            <Input
                                onChangeText={(text) =>
                                    setUser((curr) => ({...curr, ID: text}))
                                }    
                                value={userDetails.ID}
                                color="blueGray.900"
                                placeholder="0x6eEF2076E3b24CE938B153D9A513B9F80cB39bB8"
                                borderColor={"blueGray.900"}
                            />
                        </FormControl>
                        {loading ? (
                            <Button
                            size='lg'
                            w="60%"
                            mt='5'
                            borderWidth={2}
                            isDisabled={true}
                            alignSelf={'center'}
                            variant={"outline"}
                            >
                                <HStack>
                                    <Text mr="2">Adding</Text>
                                    <Spinner accessibilityLabel="Processing Posts" />
                                </HStack>
                            </Button>
                        ) : (
                            <Button
                            size="lg"
                            mt="5"
                            w="60%"
                            onPress={() => handleSubmitDetails()}
                            borderWidth={2}
                            variant={"outline"}
                            alignSelf={"center"}
                            >
                                Add
                            </Button>
                        )}
                    </VStack>
                </Box>
            </Center>
        </div>
    );
}