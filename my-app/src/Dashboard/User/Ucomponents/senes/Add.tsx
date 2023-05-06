import {Button, Center, FormControl, Heading, HStack, 
    Input, Spinner, Text,VStack} from 'native-base'
import {Box, useTheme, InputLabel} from '@mui/material';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {PopHeader} from '../../../../componants/popHeader';
import {useAuthContext} from '../../../../Context/auth-context/auth-context-provider';
import { KycServices, Client } from '../../../../Repo';
import { Error, Success } from '../../../../unities';
import {tokens} from '../../../Theme'
import {useAPI} from '../../../Dcontexts/hooks/useAPI'

type UserDetails = {
    name: string;
    email: string;
    MobileNumber: string;
    ID: string;
  };


export function AddPage() {
    const [userDetails, setUserDetails] = useState<UserDetails>({} as UserDetails);
    const [notes, setNotes] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const {addKycRequest, getAllFiList} = useAPI();
    const {
        state: {pageNo},
    } = useAuthContext();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    let naviagte = useNavigate();

    function validate() {
        const re = /^0x[a-fA-F0-9]{40}$/;
        if(!userDetails.name){
            Error("Name is required");
            return false;
        } else if(
            !userDetails.email.includes('@') ||
            !userDetails.email) {
            Error('Email is invalid');
            return false;
        } else if (
            userDetails.MobileNumber.length < 10 ||
            userDetails.MobileNumber.length > 10
        ) {
            Error('Invalid phone number');
            return false;
        } else if (!re.test(userDetails.ID)) {
            Error('Invalid metamasl address');
            return false;
        }
        return true;
    };

    async function addClient() {
        try {
            if (validate()) {
                setLoading(true);
                const time = Math.floor(new Date().getTime() / 1000.0);
                const client: Client = {
                    ...userDetails,
                    VerifiedBy: "0x0000000000000000000000000000000000000000",
                    dataHash: '',
                    dataUpdated: 0,
                }
                const data = {client, time, note: notes};
                await addKycRequest(data);
                setUserDetails({
                    email: '',
                    MobileNumber: '',
                    name: '',
                    ID: ''
                })
                naviagte('/UDashboard')
            }       
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }     
    };

    const listenToEvent = async () => {
        KycServices.eventContract.on("ClientAdded", 
        async (id:string, name:string, email:string) =>{
            console.log('even', name, email, id)
            await getAllFiList(1);
            Success("Financial Institution added Succesfully")
        });
    }

    return (
        <>
            <Center mt={['3', '16']}>
                <Box mt={['5', '0']} width={['90vw', '40vw']}>
                    <Heading color={'white'} mb='4' alignSelf={'flex-start'}>
                        Request For KYC
                    </Heading>
                    <VStack
                    bg={colors.grey[100]}
                    minH={'50vh'}
                    borderRadius={'10'}
                    p={'10'}
                    space={'5'}
                    >
                        <PopHeader text={'Back'} route={'/UDashboard'}/>
                        <FormControl w={['100%', '100%']}>
                            <InputLabel>
                                <Text>Client Name</Text>
                            </InputLabel>
                            <Input
                            onChangeText={(text) =>
                                setUserDetails((curr) => ({...curr, name:text}))
                            }
                            value={userDetails.name}
                            placeholder='Name Please'
                            color={colors.blueAccent[700]}
                            />
                        </FormControl>
                        <FormControl w={['100%', '100%']}>
                            <InputLabel>
                                <Text>Client Email</Text>
                            </InputLabel>
                            <Input
                            onChangeText={(text) =>
                                setUserDetails((curr) => ({...curr, email:text}))
                            }
                            value={userDetails.email}
                            placeholder='Email Please'
                            color={colors.blueAccent[700]}
                            />
                        </FormControl>
                        <FormControl w={['100%', '100%']}>
                            <InputLabel>
                                <Text>Client PhoneNumer</Text>
                            </InputLabel>
                            <Input
                            onChangeText={(text) =>
                                setUserDetails((curr) => ({...curr, mobileNumber:text}))
                            }
                            value={userDetails.MobileNumber}
                            placeholder='PhoneNumber Please'
                            color={colors.blueAccent[700]}
                            />
                        </FormControl>
                        <FormControl w={['100%', '100%']}>
                            <InputLabel>
                                <Text>MetaMask Address</Text>
                            </InputLabel>
                            <Input
                            onChangeText={(text) =>
                                setUserDetails((curr) => ({...curr, id:text}))
                            }
                            value={userDetails.ID}
                            placeholder="0x0000000000000000000000000000000000000000"
                            color={colors.blueAccent[700]}
                            />
                        </FormControl>
                        <FormControl w={['100%', '100%']}>
                            <InputLabel>
                                <Text>MetaMask Address</Text>
                            </InputLabel>
                            <Input
                            onChangeText={(text) =>
                                setUserDetails((curr) => ({...curr, id:text}))
                            }
                            value={userDetails.ID}
                            placeholder="0x0000000000000000000000000000000000000000"
                            color={colors.blueAccent[700]}
                            />
                        </FormControl>
                        <FormControl w={['100%', '100%']}>
                            <InputLabel>
                                <Text>Note</Text>
                            </InputLabel>
                            <Input
                            onChangeText={(text) => setNotes(text)}
                            value={notes}
                            placeholder="Please enter some notes"
                            color={colors.blueAccent[700]}
                            borderColor={colors.blueAccent[700]}
                            />
                        </FormControl>
                        {loading ? (
                            <Button
                            size={'lg'}
                            mt={'5'}
                            w={'60%'}
                            borderWidth={'2'}
                            isDisabled={true}
                            variant={'outline'}
                            alignSelf={'center'}
                            >
                                <HStack>
                                    <Text mt='2'>Requesting</Text>
                                    <Spinner accessibilityLabel='Loading posts' />
                                </HStack>
                            </Button>
                        ) : (
                            <Button
                            size={'lg'}
                            mt={'5'}
                            w={'60%'}
                            onPress={() => addClient()}
                            borderWidth={'2'}
                            variant={'outline'}
                            alignSelf={'center'}
                            >
                                Request For KYC
                            </Button>
                        )}                        
                    </VStack>
                </Box>
            </Center>
        </>
    )
}