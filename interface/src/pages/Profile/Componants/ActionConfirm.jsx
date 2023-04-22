import { Button, Modal} from 'native-base';
import { useTheme, FormControl, InputLabel } from '@mui/material';
import { tokens } from '../../../Dashboard/Theme';

export function ActionConfirm ({
    modalVisible = false,
    setModalVisible = Function,
    uploadDetail
}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    return(
        <Modal isOpen={modalVisible} onClose={setModalVisible} size={'md'}>
            <Modal.Content maxH={'350'}>
                <Modal.CloseButton />
                <Modal.Header>Please Confirm</Modal.Header>
                <Modal.Body>
                    <FormControl>
                        <InputLabel>
                            {"You are uplaoding you documents Please comfirm!"}
                        </InputLabel>
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={'2'}>
                        <Button 
                            variant={'ghost'}
                            colorScheme={colors.blueAccent[600]}
                            onPress={() => {setModalVisible(false)}}
                        >
                            Cancle
                        </Button>
                        <Button
                            bgColor={colors.blueAccent[800]}
                            _hover={{ bgColor: colors.greenAccent[600]}}
                            onPress={() => {
                                uploadDetail();
                                setModalVisible(false);
                            }}
                        >
                            Yes
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    ); 
}