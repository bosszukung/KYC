import { useTheme } from "@mui/material";
import { Button, Modal, Spinner, Text, TextArea, FormControl } from "native-base";
import { useEffect, useState } from "react";
import { useAPI } from "../../../Dcontexts/hooks/useAPI";
import { scroll } from "../../../../unities";
import { tokens } from "../../../Theme";

export function ConfirmAction({
    modalVisible,
    setModalVisible, 
    operation, 
    id,
    loading,
    setLoading,
} : {
    modalVisible: boolean,
    setModalVisible: Function,
    operation: 'accept' | 'reject' | 'reapply',
    id: string,
    loading: boolean,
    setLoading: Function
})  {
    const [notes, setNotes] = useState<string>('');
    const {updateKYCVerification, RequesttKYCAgain} = useAPI();
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    useEffect(() => {
        modalVisible && scroll();
    },[modalVisible]);

    async function handleKYCAction() {
        try {
            setLoading(true);
            if (operation === "reapply") {
                await RequesttKYCAgain(id, notes);
            } else {
                await updateKYCVerification({
                    id,
                    isVerified: operation === 'accept' ? true : false,
                    note: notes
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setModalVisible(false)
            setLoading(false);
        }
    }

    return (
        <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        size={'md'}
        h={'100vh'}
        >
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>
                    <Text
                    fontWeight={'bold'}
                    >
                        Complete Client KYC{''}
                        {
                        operation === 'reject'
                        ? 'Rejection'
                        : operation === 'reapply'
                        ? "Re apply"
                        : "Varification"
                        }
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <FormControl isInvalid={notes.length === 0}>
                        <FormControl.Label>Enter Notes</FormControl.Label>
                        <TextArea
                            placeholder="Enter your Reason"
                            value={notes}
                            onChangeText={setNotes} autoCompleteType={undefined}                        />
                        <FormControl.ErrorMessage>
                            {"This filed connot be empty"}
                        </FormControl.ErrorMessage>
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={'2'}>
                        <Button
                        variant={'ghost'}
                        colorScheme={colors.blueAccent[300]}
                        onPress={() => setModalVisible(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                        bg={colors.redAccent[300]}
                        onPress={() => notes.length !== 0 && handleKYCAction()}
                        isDisabled={loading}
                        >
                            {loading ? <Spinner color={'white'} size={'sm'} /> : 'OK'}
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}