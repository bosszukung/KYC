import { Box, Switch, Tooltip, useTheme } from "@mui/material";
import { Center, HStack, Spinner, Text, VStack } from "native-base";
import { useState } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {useAPI} from '../../Dcontexts/hooks/useAPI';
import {FI, FIStatus} from '../../../Repo'
import { ModalEdit } from "./modalEdit";
import { tokens } from "../../Theme";
import { Success } from "../../../unities";
import { green } from "@mui/material/colors";

export const CardDetails = ({item = FI}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const reduceString = (address) => {
        const prefix = address.substring(0 , 4).concat("...");
        const postfix = address.substring(address.length - 4);
        return prefix + postfix;
    };
    const [loading, setLoading] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const {toggleFIStatus, updateFIDetails} = useAPI();

    const StatusColor = (status) => {
        if (status === 'active') {
            return colors.greenAccent[400];
        } else if (status === 'inactive') {
            return colors.redAccent[400];
        }
    };

    async function handleToggle (status = Boolean) {
        try {
            setLoading(true);
            await toggleFIStatus(item.ID, !status);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleEdit ( data = {
        name: "",
        email: "",
        ID: ""
    }) {
        try {
            setShowEditModal(false);
            setIsUpdate(true);
            await updateFIDetails(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdate(false);
        }
    }

    return (
        <HStack width={['300vw', "100%"]} bgColor={colors.greenAccent[100]} padding={8} mb={[8, 3]}>
            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                paddingLeft={2}
                width={'1/5'}
            >
                <Text fontWeight={"light"} fontSize={'lg'}>{item.name}</Text>
            </Box>
            <Box
                display={"flex"}
                justifyContent={'center'}
                paddingLeft={4}
                width={'1/5'}
            >
                <Box
                    bgcolor={
                        (item.status === FIStatus.Active ? true : false)
                        ? StatusColor("active")
                        :StatusColor("inactive")
                    }
                    maxWidth={"80%"}
                    borderRadius={"8px"}
                >
                    <Text
                        textAlign={"center"}
                        padding={1}
                        textTransform={"uppercase"}
                        color={colors.grey[100]}
                    >
                        {(item.status === FIStatus.Active ? true : false)
                        ? "active"
                        : "inactive"
                        }
                    </Text>
                </Box>
            </Box>
            <Box
                cursor={"pointer"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"1/5"}
            >
                <CopyToClipboard
                text={item.ID}
                onCopy={() => Success("Sucessfully copied Address")}
                >
                    <Text fontWeight={"light"} fontSize={"xl"}>
                        <Tooltip
                            title="Click to copy"
                            placement="bottom"
                        >
                            {reduceString(item.ID)}
                        </Tooltip>
                    </Text>
                </CopyToClipboard>
            </Box>
            <VStack 
                alignItems={"center"} 
                justifyContent={"center"}
                width={"1/5"}
            >
                {loading ? (
                    <Spinner size='sm' color={colors.primary[400]} />
                ) : (
                    <Switch
                        onChange={() => handleToggle(
                            item.status === FIStatus.Active ? true : false
                        )}
                        checked={item.status === FIStatus.Active ? true : false}
                        offTrackColor={colors.redAccent[200]}
                        onTrackColor={colors.redAccent[300]}
                        onThumbColor={colors.redAccent[500]}
                        offThmbColor={colors.redAccent[100]}  
                    />
                    )}
                </VStack>
                <Center width={"1/5"}>
                    {isUpdate ? (
                        <Spinner size={"sm"} color={colors.redAccent[400]} />
                    ) : (
                        <Tooltip placement="bottom" title="edit details">
                            <button
                                style={{ marginLeft: ".5rem"}}
                                onClick={() => setShowEditModal(true)}
                            >
                                <DriveFileRenameOutlineIcon sx={{fontSize: 18, color: green[500],cursor: "pointer"}} />
                            </button>
                        </Tooltip>
                    )}
                </Center>
                <ModalEdit
                data={item}
                SetApprooval={(data = {name: "", email: "", ID:""}) =>
                handleEdit(data)
                }
                modalVisible={showEditModal}
                setModelVisible={() => setShowEditModal(false)}
                />
        </HStack>
    );
}