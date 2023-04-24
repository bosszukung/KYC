import {Box, Avatar, FormControl, InputLabel, Select, useTheme } from '@mui/material';
import {Button, Center, Heading, HStack, IconButton, Input, Pressable, Spinner, Text, VStack} from 'native-base';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import React, {useEffect, useState} from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {Card} from './Componants/card';
import {Success, shorterString} from '../../unities';
import {useAuthContext} from '../../Context/authContext';
import CopyToClipboard from "react-copy-to-clipboard";
import {useIPFS} from '../../Dashboard/Dcontexts/hooks/useIPFS';
import {EncodeImage} from '../../unities/imageEncode';
import {EditProfileModal} from './Componants/EditModal';
import { useAPI } from '../../Dashboard/Dcontexts/hooks/useAPI';
import { Client, KYCServices } from '../../Repo';
import {ActionConfirm} from './Componants/ActionConfirm';
import {DocumentStructure} from './Componants/DocStructure';
import { tokens } from '../../Dashboard/Theme';


const docsType = {
    id: '',
    type: '',
    documentUrl: '',
}; 
let docRequird = ["idcard", "passport", "drivinglicense"];

export function ProfilePage() {
    const theme = useTheme();
    const colors =tokens(theme.palette.mode);
    const [showEditMode, setShowEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [document, setDocument] = useState(docRequird[0]);
    const [docList, setDocList] = useState(docRequird);
    const [fileUrl, setFileUrl] = useState('');
    const [allDocs, setAllDocs] = useState(docsType[[]]);
    const [showFirstImage, setShowFristImage] = useState(false);
    const [myData, setMyData] = useState(new Client({}));
    const {
        state: {
            userDetails: {id}
        }
    } = useAuthContext();
    const [userAddress, setUserAddress] = useState(shorterString(id));
    const {upload, getDatsFromIPFS} = useIPFS();
    const {getClientDetails, updateDatahash} = useAPI();
    const [showSaveButton, setSaveButton] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [loader, setLoader] = useState(true);
    const [noDocMessage, setNoDocMessage] = useState(false);
    const [saveLoader, setSaveLoader] = useState(false);

    async function handleFileChange (event) {
        if (event.target.files) {
            const file = event.target.files[0];
            const base64 = await EncodeImage(file);
            setFileUrl(base64);
            setDocument("");
            setShowModal(false);
        }
    }

    const compareFunction = (
        allDocsItem = docsType,
        uploadAllItem = docsType
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
        const updatedAllDocs = allDocs.filter((doc = docsType) => doc.id !== id);
        if (updatedAllDocs.lenght === allDocs.lenght) {
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

    function handlefirstDocImage(id = '') {
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
            updateDatahash(result.path);
            listenToDataHashEvent();
        }
        setSaveLoader(false)
    }

    useEffect(() => {
        if (myData.dataHash) {
            (async () => {
                try {
                    const result = await  getDatsFromIPFS(myData);
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
    }, [getDatsFromIPFS, myData])
  
    useEffect(() => {
        (async () => {
            setLoader(true);
            const data = await getClientDetails(id);
            if (data) {
                setMyData(data);
            }
        })();
    },[getClientDetails, id]);

    const listenToDataHashEvent = async () => {
        KYCServices.evenContract.on(
            "DataHashUpdated", 
            async (id,clientName, dataHash) => {
                console.log('event', clientName, dataHash);
                const data = await getClientDetails(id);
                if (data) {
                    setMyData(data);
                }
            }
        );
    };

    useEffect(() => {
        listenToClientDataEvent();
    }, []);

    const listenToClientDataEvent = () => {
        KYCServices.evenContract.on(
            "ClientDataUpdated",
            async (id, name, email) => {
                console.log("event", name)
            }
        )
    }
}