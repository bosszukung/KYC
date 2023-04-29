import { useEffect, useState } from "react";
import { FI } from "../../../Repo";
import { scroll } from "../../../unities";
import { FormControl,InputLabel,useTheme } from "@mui/material";
import { Modal, Button, Input } from "native-base";
import { tokens } from "../../Theme";

export function ModalEdit({
    modalVisible,
    setModelVisible,
    SetApprooval,
    data, 
}: {
    modalVisible: boolean,
    setModelVisible: Function,
    SetApprooval: Function,
    data: FI, 
}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [FIDetails, SetFIDetails] = useState({
        name: data.name,
        email: data.email,
        ID: data.ID
    });

    useEffect(() => {
        modalVisible && scroll();
    }, [modalVisible]);

    return(
        <Modal
        h="100vh"
        isOpen={modalVisible}
        onClose={setModelVisible}
        size={"md"}>
            <Modal.Content>
                <Modal.CloseButton/>
                <Modal.Header>Update Financial Insitution Information</Modal.Header>
                <Modal.Body>
                    <FormControl>
                        <InputLabel>Name</InputLabel>
                        <Input
                            onChangeText={(text) =>
                                SetFIDetails((curr) => ({...curr, name: text}))}
                            placeholder="Please enter name"
                            id="demo-helper-text-misaligned"
                            value={FIDetails.name}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel>Email</InputLabel>
                        <Input
                            onChangeText={(text) =>
                                SetFIDetails((curr) => ({...curr, email: text}))}
                            placeholder="Please enter Email"
                            id="demo-helper-text-misaligned"
                            value={FIDetails.email}
                        />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button
                            variant='ghost'
                            colorScheme={colors.blueAccent[300]}
                            onPress={() => {
                                setModelVisible(false);
                            }}
                        >
                            cancel
                        </Button>
                        <Button
                            bg={colors.primary[600]}
                            onPress={() => {
                                SetApprooval(FIDetails);
                            }}
                        >
                            OK
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
}