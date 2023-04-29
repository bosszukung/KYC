import { useTheme, FormControl, InputLabel } from "@mui/material";
import {Button, Modal, TextArea} from 'native-base';
import { useState } from "react";
import { Error } from "../../../../unities";
import { tokens } from "../../../Theme";


export function ConfirmAction ({
modalVisible,
  setModalVisible,
  heading,
  kycAction,
  setApproval,
  message,
}: {
    modalVisible: boolean;
    setModalVisible: Function;
    heading: string;
    kycAction: Function;
    setApproval?: Function;
    message: Function;
}) {
    const [notes, setNotes] = useState<string>('');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const reset = () => {
        setModalVisible(false);
        if (setApproval) {
            setApproval(undefined)
        }
        setNotes("")
    }

    const handleOnClick = () => {
        if (notes.length === 0) {
            Error("Notes cannot be empty");
        } else {
            kycAction(notes);
        }
    };

    return (
        <Modal isOpen={modalVisible} onClose={reset} size={'md'}>
            <Modal.Content maxH={'350'}>
                <Modal.CloseButton />
                <Modal.Header>{heading}</Modal.Header>
                <Modal.Body>
                    <FormControl>
                        <InputLabel>{message()}</InputLabel>
                    </FormControl>
                    <TextArea
                        placeholder="Enter Your Reason"
                        value={notes}
                        onChangeText={setNotes} autoCompleteType={undefined}                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button
                        variant={'ghost'}
                        colorScheme={colors.blueAccent[400]}
                        onPress={() => {
                            reset();
                        }}>
                            Cancel
                        </Button>
                        <Button
                        bgColor={colors.blueAccent[800]}
                        _hover={{background: colors.blueAccent[600]}}
                        onPress={() => {
                            handleOnClick();
                            reset();
                        }}
                        >
                            OK
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}