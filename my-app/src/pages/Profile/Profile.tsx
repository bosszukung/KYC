import {Box, Avatar, FormControl, InputLabel, useTheme } from '@mui/material';
import {Button, Center, Heading, HStack, IconButton, Input, Pressable, Spinner, Text, VStack, Select} from 'native-base';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React, {useEffect, useState} from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {Card} from './Componants/card';
import {Success, shorterString} from '../../unities';
import {useAuthContext} from '../../Context/auth-Context';
import CopyToClipboard from "react-copy-to-clipboard";
import {useIPFS} from '../../Dashboard/Dcontexts/hooks/useIPFS';
import {EncodeImage} from '../../unities/imageEncode'
import {EditProfileModal} from './Componants/EditModal';
import { useAPI } from '../../Dashboard/Dcontexts/hooks/useAPI';
import { Client, KycServices } from '../../Repo';
import {ActionConfirm} from './Componants/ActionConfirm';
import {DocumentStructure} from './Componants/DocStructure';
import { tokens } from '../../Dashboard/Theme';


type docsType = {
        id: string;
        type: string;
        documentUrl: string
}; 
let docRequird = ["idcard", "passport", "drivinglicense"];

export function ProfilePage() {
    const theme = useTheme();
    const colors =tokens(theme.palette.mode);
    const [showEditMode, setShowEditMode] = useState<boolean>(false);
    const [showModal, setShowModal] = useState(false);
    const [document, setDocument] = useState(docRequird[0]);
    const [docList, setDocList] = useState(docRequird);
    const [fileUrl, setFileUrl] = useState<any>('');
    const [allDocs, setAllDocs] = useState<docsType[]>([] as docsType[]);
    const [showFirstImage, setShowFristImage] = useState(false);
    const [myData, setMyData] = useState<Client>({} as Client);
    const {
        state: {
            userDetails: {ID}
        }
    } = useAuthContext();
    const [userAddress, setUserAddress] = useState(shorterString(ID));
    const {upload, getDataFromIpfs} = useIPFS();
    const {gettheClientDetial, updateDataHash} = useAPI();
    const [showSaveButton, setSaveButton] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [loader, setLoader] = useState(true);
    const [noDocMessage, setNoDocMessage] = useState(false);
    const [saveLoader, setSaveLoader] = useState(false);
    

    async function handleFileChange (e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = e.target.files[0];
            const base64 = await EncodeImage(file);
            setFileUrl(base64);
            setDocument("");
            setShowModal(false);
        }
    }

    const compareFunction = (
        allDocsItem: docsType,
        uploadAllItem: docsType
    ) => allDocsItem.type === uploadAllItem.type;

    useEffect(() => {
        if (fileUrl !== "") {
            const updatedAllDocs = [
                ...allDocs, 
                {
                    id: Date.now().toString(),
                    documentUrl: fileUrl,
                    type: document,
                },
            ];

            setAllDocs(updatedAllDocs);
            setSaveButton(true);
            setFileUrl("");
        }
    },[allDocs, document, fileUrl])

    function handleDelete(id = '') {
        setShowFristImage(true);
        setDocument(allDocs.find((i) => i.id)?.type || "");
        const updatedAllDocs = allDocs.filter((doc:docsType) => doc.id !== id);
        if (updatedAllDocs.length === allDocs.length) {
            console.log("working");
            const result = allDocs.forEach(
                (leftValue) => 
                    !updatedAllDocs.some((rightValue) =>
                        compareFunction(leftValue, rightValue))
            );
            console.log(result, "equals")
        }
        setAllDocs(updatedAllDocs);
        setSaveButton(true);
        setShowModal(true);
    }

    function handlefirstDocImage(id: string) {
        setDocument(allDocs.find((i) => i.id === id)?.type || "");
        const temp = allDocs.filter((i) => i.id !== id);
        setAllDocs(temp);
        setShowModal(true);
    }

    useEffect(() => {
        setDocList(() => {
            return docRequird.filter(
                (i = '') => !allDocs.map((i) => i.type).includes(i)
            );
        });
    },[allDocs]);

    const uploadToIPFS = async () => {
        setSaveLoader(true);
        const jsonData = JSON.stringify(allDocs);
        const result = await upload(jsonData);
        if (result) {
            updateDataHash(result.path);
            listenToDataHashEvent();
        }
        setSaveLoader(false)
    }

    useEffect(() => {
        if (myData.dataHash) {
            (async () => {
                try {
                    const result = await  getDataFromIpfs(myData.dataHash);
                    setAllDocs(result);
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoader(false);
                    setNoDocMessage(false);
                }
            })();
        } else {
            setLoader(false);
        }
    }, [getDataFromIpfs, myData])
  
    useEffect(() => {
        (async () => {
            setLoader(true);
            const data = await gettheClientDetial(ID);
            if (data) {
                setMyData(data);
            }
        })();
    },[ID, gettheClientDetial]);

    const listenToDataHashEvent = async () => {
        KycServices.eventContract.on(
            "DataHashUpdated", 
            async (ID:string,clientName:string, dataHash:string) => {
                console.log('event', clientName, dataHash);
                const data = await gettheClientDetial(ID);
                if (data) {
                    setMyData(data);
                }
            }
        );
    };

    useEffect(() => {
        const listenToClientDataEvent = () => {
            KycServices.eventContract.on(
                "ClientDataUpdated",
                async (ID:string, name:string, email:string) => {
                    console.log("event", name, email);
                    const data = await gettheClientDetial(ID);
                    if (data) {
                        setMyData(data);
                    }
                }
            );
        };
        listenToClientDataEvent();
    }, [gettheClientDetial]);

    return (
        <div>
            <Center>
                <Box
                bgcolor={colors.primary[400]}
                width={['90vw', '70vw']}
                minHeight={'40vh'}
                p={'8'}
                mt={'16'}
                sx={{borderRadius:'10', position:'relative'}}
                >
                    {loader && (
                        <VStack space={'50'} justifyContent={'center'} alignItems={'center'}>
                            <Heading>Please wait...</Heading>
                        </VStack>
                    )}
                    {!loader && (
                        <VStack>
                            <HStack
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            mb='4'
                            >
                                <HStack
                                flexDir={['column', 'row']}
                                alignItems={['flex-start', 'center']}
                                >
                                    <Avatar
                                    sx={{my:'4', bgcolor:colors.greenAccent[500], width: 56, height: 56}}
                                    alt="Travis Howard" src="/static/images/avatar/2.jpg"
                                    >
                                        Travis Howard
                                    </Avatar>
                                    <Pressable
                                    onHoverIn={() => setUserAddress(ID)}
                                    onHoverOut={() => setUserAddress(shorterString(ID))}
                                    >
                                        <CopyToClipboard
                                        text={ID}
                                        onCopy={() =>
                                            Success('Address copied succesfuly')}
                                        >
                                            <Heading size={'md'} ml={['1', '5']}>
                                                {userAddress}
                                            </Heading>
                                        </CopyToClipboard>
                                    </Pressable>
                                </HStack>
                                <Button
                                bgColor={colors.grey[300]}
                                _hover={{bgColor: colors.grey[100]}}
                                onPress={() => setShowEditMode(true)}
                                >
                                    Edit Profile
                                </Button>
                            </HStack>
                            <HStack flexDir={['column', 'row']} mb={'4'} space={'12'}>
                                <FormControl sx={{width:['100%', '45%']}}>
                                    <InputLabel>email</InputLabel>
                                    <Input value={myData.email} />
                                </FormControl>
                                <FormControl sx={{width:['100%', '45%']}}>
                                    <InputLabel>name</InputLabel>
                                    <Input value={myData.name} />
                                </FormControl>
                            </HStack>
                            <HStack flexDir={["column", 'row']} space={'12'}>
                                <FormControl sx={{width:['100%', '45%']}}>
                                    <InputLabel>Phone Number</InputLabel>
                                    <Input value={myData.MobileNumber} />
                                </FormControl>
                            </HStack>
                        </VStack>
                    )}
                </Box>
                <VStack w={['90vw', '70vw']} mt={'16'}>
                    <HStack alignItems={'flex-start'} mb={'12'} space={'5'}>
                        <Heading color={colors.primary[400]}>Documents</Heading>
                        {allDocs.length !== docRequird.length && (
                            <IconButton
                            size={'lg'}
                            p={'0'}
                            mt={'1.5'}
                            ml={'3'}
                            onPress={() => setShowModal(true)}
                            icon={
                                <AddCircleOutlinedIcon 
                                
                                sx={{fontSize:'30', color:colors.primary[400]}}/> 
                            }
                            />
                        )}
                        {allDocs.length > 0 &&(
                            <IconButton
                            p={'0'}
                            mt={'1.5'}
                            isDisabled={!showSaveButton? true : false}
                            ml={'3'}
                            onPress={() => showSaveButton && setShowUploadModal(true)}
                            icon={
                                saveLoader ? (
                                    <Spinner size={'lg'} />
                                ): (
                                    <SaveOutlinedIcon 
                                    sx={{fontSize:'30', color:colors.primary[400]}}/>
                                )
                            }
                            />
                        )}
                    </HStack>
                    {showModal && (
                        <HStack flexDir={['column', 'row']}>
                            <Select
                            bg={colors.grey[400]}
                            color={colors.primary[800]}
                            selectedValue={document}
                            size={'lg'}
                            onValueChange={(nextVaule) => setDocument(nextVaule)}
                            _selectedItem={{
                                color: colors.grey[200],
                                endIcon: <CheckOutlinedIcon sx={{fontSize: 10}} />
                            }}
                            accessibilityLabel='Select a position for Menu'
                            mr={['0', '4']}
                            mb={["4", "0"]}>
                            {docList.map((doc) => (
                            <Select.Item key={doc} label={doc} value={doc} />
                            ))}
                            </Select>
                            <input
                                onChange={(e) =>
                                    handleFileChange(e)
                                }
                                className="file-input"
                                type="file"
                                accept="image/png, image/jpeg"
                                disabled={document === "" ? true : false}
                            />
                        </HStack>
                    )}
                    <HStack flexWrap={'wrap'}>
                        {loader && (
                            <>
                                <DocumentStructure/>
                            </>
                        )}
                        {allDocs.length !== 0 &&
                        loader === false &&
                        allDocs.map(({id, documentUrl, type}, idx) =>
                            <Card
                            key={id}
                            id={id}
                            handleDelete={handleDelete}
                            showButton={idx !== 0}
                            documentUrl={documentUrl}
                            type={type}
                            setImage={
                                showFirstImage || allDocs.length > 1
                                ? null
                                : (id = '') => handlefirstDocImage(id)
                            }
                            />
                        )}
                        {myData && !loader && noDocMessage && allDocs.length === 0 && (
                            <Text color={colors.grey[300]} fontSize={'2xl'} textAlign={'center'}>
                                {showModal ? "" : "No Document Found"}
                            </Text>
                        )}
                    </HStack>
                    <EditProfileModal
                    data={myData}
                    showModal={showEditMode}
                    setShowModal={setShowEditMode}
                    />
                    <ActionConfirm
                    setModalVisible={setShowUploadModal}
                    modalVisible={showUploadModal}
                    uploadDetail={uploadToIPFS}
                    />
                </VStack>
            </Center>
        </div>
    );    
}