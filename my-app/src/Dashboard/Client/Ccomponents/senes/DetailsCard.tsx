import { Box, HStack, Spinner, Text, Tooltip } from "native-base";
import  {shorterString} from '../../../../unities/ReduceString';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Error, Success } from "../../../../unities";
import { useState } from "react";
import {ConfirmAction} from './ConfirmAction';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { KYCRequest} from "../../../../Repo";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../../../Dcontexts/hooks/useAPI";
import { useTheme } from "@mui/material";
import { tokens } from "../../../Theme";

export const DetailsCard = ({
    item
}: {
    item:KYCRequest
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [approvalFlag, setApprovalFlag] = useState<boolean | undefined>(undefined);
    const { actionOnKYCRequest, removeKycPremission} = useAPI();
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    console.log(loader);
    
    const kycAction = async (notes = '') => {
        setLoader(true);
        if (approvalFlag !== undefined) {
            await actionOnKYCRequest(item.FI_ID, approvalFlag, notes);
        } else {
            if((item.dataRequest === 1 
                && item.status === 0) ||
                item.status === 1
            )
            await removeKycPremission(item.FI_ID, notes);
        }
        setLoader(false);
    };

    const dataHashCheck = () => {
        if (item.dataHash.length === 0) {
            Error("No documents avaailable, at leat one document needed for action");
        } else {
            setModalVisible(true);
        }
    };

    const status = (status = 0) => {
        if (status === 0) {
            return colors.blueAccent[400]
        } else if (status === 1) {
            return colors.greenAccent[400]
        } else if (status === 2) {
            return colors.redAccent[400]
        }
    };

    const modalMessage = () => {
        if (item.dataRequest === 0 || item.dataRequest === 2) {
            if (approvalFlag === true) {
                return "You are about to share detail with the FI. Would you like to add any addition notes?"; 
            } else if (approvalFlag === false) {
                return "You are about to reject premision for details asked by FI. Would you like to add amy addition notes?";
            } 
        } else if (
            (item.status === 0 || item.status === 1) &&
            item.dataRequest === 1
        ) {
            return "You are about to revoke data access given to FI. Would you like to add aditiona; notes?"
        }
    };

    return (
        item && (
            <HStack
            width={['300vw', '100%']}
            bgColor={colors.grey[100]}
            padding={[8]}
            mb={['8', '4']}
            >
                <HStack
                space={'2'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                width={'1/6'}
                >
                    <Text
                    fontWeight={'light'}
                    fontSize={'lg'}
                    >
                        {item.FIName}
                    </Text>
                </HStack>'
                <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                width={'1/6'}
                >
                    <Box
                    bgColor={status(item.status)}
                    width={'60%'}
                    borderRadius={'8px'}
                    >
                        <Text
                        textAlign={'center'}
                        padding={'1'}
                        textTransform={'uppercase'}
                        color={'white'}
                        fontWeight={'semibold'}
                        >
                            {
                                item.status === 0
                                ? "pending"
                                : item.status === 1
                                ? "approved"
                                : "rejected"
                            }
                        </Text>
                    </Box>
                </Box>
                <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                width={'1/6'}
                >
                    <Box
                    bgColor={status(item.dataRequest)}
                    width='60%'
                    borderRadius={'8px'}
                    >
                        <Text
                        textAlign={"center"}
                        padding={1}
                        textTransform="uppercase"
                        color="white"
                        fontWeight={"semibold"}
                        >
                            {
                                item.dataRequest === 0
                                ? "pending"
                                : item.dataRequest === 1
                                ? "approved"
                                : "rejected"
                            }
                        </Text>
                    </Box>
                </Box>
                <HStack
                alignItems={'center'}
                justifyContent={'center'}
                width={'1/6'}
                >
                    <Tooltip
                    width={'auto'}
                    label={item.additionalNotes}
                    placement={'bottom left'}
                    >
                        <Text
                        pl={2} 
                        fontWeight={'semibold'}
                        color={colors.grey[400]}
                        >
                            {item.additionalNotes?.slice(0, 20).concat("...")}
                        </Text>
                    </Tooltip>
                </HStack>
                <Box
                width={'1/6'}
                justifyContent={'center'}
                alignItems={'center'}
                >
                    <CopyToClipboard
                    text={item.FI_ID}
                    onCopy={() => Success('Addres copied successfully')}
                    >
                        <Text
                        fontWeight={'light'}
                        fontSize={'xl'}
                        >
                            <Tooltip
                            maxWidth={'100%'}
                            label={'Click to copy'}
                            placement={'bottom'}
                            >
                                {shorterString(item.FI_ID)}
                            </Tooltip>
                        </Text>
                    </CopyToClipboard>
                </Box>

                {loader ? (
                    <HStack 
                    width={'1/6'}
                    justifyContent={'center'}
                    >
                        <Spinner size={'lg'} />
                    </HStack>
                ) : (
                    <HStack
                    width={'1/6'}
                    space={'8'}
                    justifyContent={'flex-end'}
                    >
                        {item.dataRequest === 0 && (
                            <HStack space={'8'}>
                                <Tooltip
                                maxWidth={"100%"}
                                label={"Accept data request"}
                                placement={"bottom"}
                                >
                                    <button
                                    onClick={() => {
                                    dataHashCheck();
                                    setApprovalFlag(true);
                                    }}
                                    >
                                        <CheckCircleOutlinedIcon
                                        sx={{
                                            cursor: 'pointer', fontSize:'20', 
                                            color:colors.greenAccent[500]}}
                                        
                                        />
                                    </button>
                                </Tooltip>
                                <Tooltip
                                maxWidth={"100%"}
                                label={"Reject data request"}
                                placement={"bottom"}
                                >
                                <button
                                onClick={() => {
                                dataHashCheck();
                                setApprovalFlag(false);
                                }}
                                >
                                    <CancelOutlinedIcon 
                                    sx={{fontSize:'20', 
                                    cursor:"pointer", 
                                    color:colors.greenAccent[500]}}  
                                    />
                                </button>
                                </Tooltip>
                            </HStack>
                        )}
                        {(item.status === 0 || item.status === 1) &&
                        item.dataRequest === 1 && (
                            <Tooltip
                            maxWidth={'100&'}
                            label={'Revoke Premission'}
                            placement={'bottom'}
                            >
                            <button
                            style={{marginLeft:'4rem'}}
                            onClick={() => setModalVisible(true)}
                            >
                                <UndoRoundedIcon 
                                sx={{
                                    fontSize:'20',
                                    cursor:'pointer',
                                    color:"#facc15"
                                }}
                               
                                />
                            </button>
                            </Tooltip>
                        )}
                        <Tooltip
                        maxWidth={'100%'}
                        label={'View Financial Institutions'}
                        placement={'bottom'}
                        >
                            <button
                            onClick={() => navigate(`/${item.FI_ID}`)}
                            >
                                <GridViewOutlinedIcon 
                                sx={{
                                    fontSize:'20', 
                                    cursor:'pointer', 
                                    color:"#facc15"
                                }}
                                />
                            </button>
                        </Tooltip>                  
                    </HStack>
                )}
                <ConfirmAction
                setApproval={setApprovalFlag}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                kycAction={kycAction}
                heading="Data Permission"
                message={modalMessage}
                />
            </HStack>
        )
    );    
}


