import { tokens } from "../../Theme";
import { Box, FormControl, useTheme, TextField} from "@mui/material";
import {Center, Heading, HStack, Spinner, Text, VStack, Button} from 'native-base';
import {PopHeader} from '../../../componants/popHeader'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuthContext} from '../../../Context/authContext';
import {useAPI} from '../../Dcontexts/hooks/useAPI';
import { KYCServices } from "../../../Repo";
import { Error } from "../../../unities";

export function AddPage() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [userDetails, setUser] = useState({
        name: '',
        ID: '',
        email: '',
        SwiftCode: '',
        
    });
    const [loading, setLoading] = useState(false);
    const {state: {pageNo} } = useAuthContext();
    const {AddFIAccount, getFIList} = useAPI();
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
                await AddFIAccount({
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
            KYCServices.evenContract.on(
                "Financial Initution Added", 
                async (ID, name, email, SwiftCode) => {
                    await getFIList(pageNo);
                }
            );
        };
        listenToEvent();
    }, [getFIList, pageNo]);

    return (
        <div>
            <Center mt={["3","16"]}>
                <Box mt={["5","0"]} w={["90vw", "40vw"]}>
                    <Heading color={colors.grey[100]} mb="4" alignSelf={"flex-start"}>
                        Add Financial Insitution
                    </Heading>
                    <VStack bg={colors.grey[300]} minH="50vh" borderRadius={10} p="10" space={5}>
                        <PopHeader text={"Back"} route="/admin" />
                        <FormControl w={["100%", "100%"]}>
                            <TextField
                                OnchangeText={(text) =>
                                    setUser((curr) => ({...curr, name: text}))}
                                required
                                helperText="Please enter name"
                                id="demo-helper-text-misaligned"
                                label="Name"
                                value={userDetails.name}
                            />
                        </FormControl>
                        <FormControl w={["100%", "100%"]}>
                            <TextField
                                OnchangeText={(text) =>
                                    setUser((curr) => ({...curr, email: text}))}
                                required
                                helperText="Please enter email"
                                id="demo-helper-text-misaligned"
                                label="Email"
                                value={userDetails.email}
                            />
                        </FormControl>
                        <FormControl w={["100%", "100%"]}>
                            <TextField
                                OnchangeText={(text) =>
                                    setUser((curr) => ({...curr, ID: text}))}
                                required
                                helperText="Please enter Metamaask address"
                                id="demo-helper-text-misaligned"
                                label="MetaMask Address"
                                value={userDetails.ID}
                            />
                        </FormControl>
                        <FormControl w={["100%", "100%"]}>
                            <TextField
                                OnchangeText={(text) =>
                                    setUser((curr) => ({...curr, SwiftCode: text}))}
                                required
                                helperText="Please enter Swift code"
                                id="demo-helper-text-misaligned"
                                label="Swift Code"
                                value={userDetails.SwiftCode}
                            />
                        </FormControl>
                        {loading ? (
                            <Button
                            buttonsize='btn--large'
                            buttonstyle='btn--outline' 
                            mt='5'
                            borderWidth={2}
                            isDisabled={true}
                            alignSelf={'center'}
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
                            cursor={"pointer"}
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