import { Button, Modal, Center } from 'native-base';
import {tokens} from '../../../Dashboard/Theme';
import {useTheme} from '@mui/material'



export function UploadDoc ({
    showModal = false,
    setShowModal = () => {},
}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    return (
        <Center>
            <Modal isopen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth={'400px'}>
                    <Modal.Header>Upload Document</Modal.Header>
                    <Modal.Body>
                        <input type='file' />
                        <p>Click To Select File</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant={'ghost'}
                                colorScheme={colors.blueAccent[600]}
                                onPress={() => {
                                    setShowModal(false)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onPress={() => {
                                    setShowModal(false);
                                }}
                            >
                                Upload
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>
    )
}