import {  Avatar, Box, FormControl, Input, InputLabel, useTheme } from "@mui/material";
import { Button, Center, Heading, HStack,IconButton, Spinner, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import {shorterString} from "../../unities/ReduceString";
import { ViewPhoto } from "./ViewImage";
import { Success, Error } from "../../unities";
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import {saveAs} from 'file-saver'
import { print } from "util";
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import {useAPI} from '../../Dashboard/Dcontexts/hooks/useAPI'
import { Client, DataHashStatus } from "../../Repo";
import {useIPFS} from '../../Dashboard/Dcontexts/hooks/useIPFS.js';
import {DocumentStructure} from '../Profile/Componants/DocStructure';
import CopyToClipboard from "react-copy-to-clipboard";
import { tokens } from "../../Dashboard/Theme";
import { timeStamp } from "console";

export function EntiyDetials() {
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState('');
    const [documents, setDocuments] = useState([{id: '', type: '', documentUrl: ''}]);
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    const [docloading, setDocLoading] = useState(true);
    const [data, setData] = useState(new Client()) 
    let navigate = useNavigate();
    const {state} = useLocation();
    const {getClientDetails} = useAPI();
    const {getDataFromIPFS} = useIPFS();
    const {id} = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    
   
    useEffect(() => {
        async function getUserData(data='') {
            try {
                setLoading(true);
                const result = await getClientDetails(data);
                result && setData(result);
            } catch (error) {
                console.log(error);
            }  finally {
                setLoading(false);
            }
        }
        id && getUserData(id);
        if (state.permission === DataHashStatus.Pending) {
            Error('Document viewing permission is preding');
        } else if (state.permission === DataHashStatus.Rejected) {
            Error('Document viewing permission denied by customer');
        }
    }, [id, state.permission, getClientDetails, getDataFromIPFS, setData]);

    useEffect(() => {
        async function getDocs(hash='') {
            try {
                setDocLoading(true);
                const result = await getDataFromIPFS(hash);
                setDocuments(result); 
            } catch (error) {
                console.log(error);
            } finally {
                setDocLoading(false)
            }
        }

        id && state.permission === DataHashStatus.Approved && data.dataHash !== ''
        ? getDocs(data.dataHash)
        : setDocLoading(false);  
    }, [data.dataHash, getDataFromIPFS, id, state.permission])

    return (
       <>
            {loading ? (
                <Center mt={'10'}>
                    <Spinner size={'lg'} />
                </Center>
            ) : !data ? (
                <Center mt={'20'}>
                    <Text 
                        color={colors.primary[400]}
                        fontSize={'4xl'}
                        textAlign={'center'}
                        mt={'5'}
                    >
                        No Data Found 
                    </Text>
                    <Button mt="5" onPress={() => navigate("/")}>
                        Go Home
                    </Button>
                </Center>
            ) : (
                <Center>
                    <Box
                        sx={{
                            bgcolor:colors.grey[400],
                            width:['90vw', '60vw'],
                            minHeight:'40vh',
                            p:8,
                            mt:16,
                            borderRadius:'10px',
                            position: 'relative'
                        }}
                    >
                        <VStack>
                            <HStack
                                alignItems={'center'}
                                justifyContent='space-between'
                                mb={'4'}
                            >
                                <HStack
                                    flexDir={['column', 'row']}
                                    alignItems={['flex-start', 'center']}
                                >
                                    <Avatar
                                        sx={{
                                            my:'4',
                                            bgcolor:colors.greenAccent[500],
                                            
                                        }}
                                        alt="Travis Howard" 
                                        src={url} >
                                            Client
                                    </Avatar>
                                    <VStack ml={['1', '5']}>
                                        <CopyToClipboard
                                            text={data?.ID || ''}
                                            onCopy={() => Success('Address copied Suce')}
                                        >
                                            <Text color={colors.primary[800]} fontSize={'2xl'}>
                                                {shorterString(data?.ID || "")}
                                            </Text>
                                        </CopyToClipboard>
                                        <Text color={colors.grey[600]}>
                                                Upadata at {timeStamp}
                                        </Text>
                                    </VStack>    
                                </HStack>
                            </HStack>
                            <VStack mb={'4'} space={'4'}>
                                <HStack
                                    justifyContent={'space-between'}
                                    flexDirection={['column', 'row']}
                                >
                                    <FormControl sx={{width:['100%', '45%']}}>
                                        <InputLabel>Email</InputLabel>
                                        <Input value={data?.email} />
                                    </FormControl>
                                    <FormControl sx={{width:['100%', '45%']}}>
                                        <InputLabel>Name</InputLabel>
                                        <Input value={data?.name} />
                                    </FormControl>
                                </HStack>
                                <HStack
                                    justifyContent={'space-between'}
                                    flexDirection={['column', 'row']}
                                >
                                    <FormControl sx={{width:['100%', '45%']}}>
                                        <InputLabel>Phone Number</InputLabel>
                                        <Input value={data?.MobileNumber.toString()} />
                                    </FormControl>
                                    <CopyToClipboard
                                        text={data?.ID || ""}
                                        onCopy={() => Success("Address copied successfully")}
                                    >
                                        <FormControl sx={{width:['100%', '45%']}}>
                                            <InputLabel>Address</InputLabel>
                                            <Input value={data?.ID} />
                                        </FormControl>
                                    </CopyToClipboard>
                                </HStack>
                            </VStack>
                        </VStack>
                    </Box>
                    <VStack w={['90vw', '60vw']} mt={'10'}>
                        <HStack alignItems={'flex-start'} mb='12'>
                            <Heading color={colors.primary[400]}>Documents</Heading>
                        </HStack>
                        <HStack
                            flexDirection={['column', 'row']}
                            flexWrap={'wrap'}
                            w={['900vw', '60vw']}
                        >
                            {docloading ? (
                                <DocumentStructure />
                            ) : documents.length === 0? (
                                <Text 
                                    color={colors.primary[400]}
                                    fontSize={'lg'}
                                    textAlign={'center'}> 
                                    No Documents Found                      
                                </Text>
                            ) : (
                                documents.map((doc) => {
                                    return (
                                        <VStack
                                            margin={['3', '10']}
                                            height={['40vh']}
                                            width={['35vh', '42vh']}
                                            space={'5'}
                                            alignSelf={['center', 'flex-start']}
                                            borderColor={colors.greenAccent[300]}
                                            px={'4'}
                                            py={'5'}
                                            borderRadius={'8'}
                                        >
                                            <HStack space={5} alignItems={'center'}>
                                                <Text
                                                    fontSize={'lg'}
                                                    textTransform={'capitalize'}
                                                    color={colors.primary[400]}
                                                >
                                                    {doc.type}
                                                </Text>
                                                <IconButton
                                                    onPress={() => {
                                                        setShowModal(true);
                                                        setUrl(doc.documentUrl);
                                                        setType(doc.type);
                                                    }}
                                                    borderWidth={'1'}
                                                    padding={'3'}
                                                    icon={<RemoveRedEyeRoundedIcon 
                                                        sx={{fontSize:'20', color: colors.primary[400]}}/>
                                                    }
                                                    borderColor={colors.greenAccent[3000]}
                                                    bgColor={'transperant'}
                                                />
                                                <IconButton 
                                                    onPress={() => print(doc.documentUrl, 'image')}
                                                    borderWidth={'1'}
                                                    padding={3}
                                                    borderColor={colors.greenAccent[300]}
                                                    bgColor={'transperant'}
                                                    icon={<PrintRoundedIcon 
                                                        sx={{fontsize:'20', color:colors.primary[400]}}/>
                                                    }
                                                />
                                                <IconButton
                                                    onPress={() => 
                                                        saveAs(doc.documentUrl, `${doc.type}.jpg`)
                                                    }
                                                    borderWidth={'1'}
                                                    padding={'3'}
                                                    borderColor={colors.greenAccent[300]}
                                                    bgColor={'transperant'}
                                                    icon={<DownloadRoundedIcon
                                                        sx={{fontSize:'20', color:colors.primary[400]}}/>
                                                    }
                                                />
                                            </HStack>
                                            <Center>
                                                {doc.documentUrl !== "" && (
                                                    <img
                                                        className="='doc-img"
                                                        key={doc.documentUrl}
                                                        src={doc.documentUrl}
                                                        alt={doc.type}
                                                    />
                                                )}
                                            </Center>
                                        </VStack>
                                    );
                                })
                            ) }
                        </HStack>
                    </VStack>
                </Center>
            )}
            {showModal && (
                <ViewPhoto url={url} type={type} setShowModal={setShowModal} />
            )}
       </>
    );
}
