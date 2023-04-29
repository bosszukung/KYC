import { Button, Center, Modal, Spinner, Input } from "native-base";
import { FormControl, InputLabel, useTheme } from "@mui/material";
import { tokens } from "../../../Dashboard/Theme";
import { useEffect, useState } from "react";
import {useAPI} from '../../../Dashboard/Dcontexts/hooks/useAPI';
import { Client } from "../../../Repo";
import { Error } from "../../../unities";

export const EditProfileModal = ({
    data,
    showModal,
    setShowModal
}: {
    data: Client;
    showModal: boolean;
    setShowModal: Function
}) => {
    const [freshData, setFrechData] = useState<Client>({} as Client)
    const {updateClientProfile} = useAPI();
    const [loader, setLoader] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    
    useEffect(() => {
        if (data) {
            setFrechData(data)
        }
    },[data]);

    const reset = () => {
        setShowModal(false);
        setFrechData({} as Client)
        
    };

    const validate = () => {
        if(!freshData.name) {
            Error("Name is required");
            return false;
        } else if (!freshData.email.includes('@') || 
            !freshData.email) {
                Error("Email is invalid");
                return false;
        } else if (
            freshData.MobileNumber.length <10 ||
            freshData.MobileNumber.length >10
            ) {
                Error("Invalid Phone Number");
                return false;
        }
        return true;
    };

    const updateMYProfile = async () => {
        if (validate()) {
            setLoader(true);
            await updateClientProfile(
                freshData.name,
                freshData.email,
                freshData.MobileNumber
            );
            setShowModal(false);
            setLoader(false);
        }
    };

    return(
        <Center>
            <Modal isOpen={showModal} onClose={reset}>
                <Modal.Content maxWidth={'400px'}>
                    <Modal.Header>Update Your Profile Details</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <InputLabel>Name</InputLabel>
                            <Input
                                value={freshData.name}
                                onChangeText={(text) => 
                                setFrechData((currentData: Client) => {
                                    return{...currentData, name: text};
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl sx={{mt: '3'}}>
                            <InputLabel>Email</InputLabel>
                            <Input
                                value={freshData.email}
                                onChangeText={(text) =>
                                    setFrechData((currentData: Client) => {
                                        return {...currentData, email: text};
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl sx={{mt: '3'}}>
                            <InputLabel>Phone Number</InputLabel>
                            <Input
                                value={freshData.MobileNumber}
                                onChangeText={(text) =>
                                    setFrechData((currentData: Client) => {
                                        return {...currentData, MobileNumber: text};
                                    })
                                }
                            />
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={'2'}>
                            <Button
                                variant={'ghost'}
                                color={colors.blueAccent[300]}
                                onPress={() => {
                                    reset();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                isDisabled={loader ? true : false}
                                bgColor={colors.blueAccent[800]}
                                _hover={{bgColor: colors.blueAccent[600]}}
                                onPress={() => {
                                    updateMYProfile();
                                }}
                            >
                                {loader ? (
                                    <Spinner accessibilityLabel="Loading posts" />
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>  
            </Modal>      
        </Center>
    );
};