import { Box, HStack, Spinner, Text, Tooltip } from "native-base";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import {Success, Error} from '../../../../unities';
import { KYCRequest, KYCStatus, DataHashStatus } from "../../../../Repo";
import {ConfirmAction} from "./ConfirmAction";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { green, orange, red, yellow } from "@mui/material/colors";
import { useTheme } from "@mui/material";
import { tokens } from "../../../Theme";


export const DetailCard = ({item}: { item: KYCRequest}) =>  {
    const reduceString = (address: string) => {
        const prefix = address.substring(0, 4).concat("...");
        const postfix = address.substring(address.length - 4);
        return prefix + postfix;
    }
    const [loading, setLoading] = useState(false);
    const [operation, setOperation] = useState<"accept" | "reject" | "reapply">();
    const [modalVisible, setModalVisible] = useState(false);
    let navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)


    const statusColor = (status: KYCStatus) => {
    if (status === KYCStatus.Pending) {
      return orange[700];
    } else if (status === KYCStatus.KYCVerified) {
      return green[700];
    } else if (status === KYCStatus.KYCFailed) {
      return red[700];
    }
  };

  function checkDataHash(callbacks: Function[]) {
    if (item.dataHash === "") {
      Error("KYC operation cannot be performed with 0 documents!");
    } else if (
      item.dataRequest === DataHashStatus.Pending ||
      item.dataRequest === DataHashStatus.Rejected
    ) {
      Error(
        "KYC operation cannot be performed, without document pending or rejected viewing permission!"
      );
    } else {
      callbacks.map((func) => func());
    }
  }

  return (
    item && (
      <HStack
        width={["300vw", "100%"]}
        bgColor={"white"}
        padding={8}
        mb={[8, 3]}
      >
        <Text w="1/6" textAlign={"center"} fontWeight={"light"} fontSize={"lg"}>
          {item.ClientName}
        </Text>
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          paddingLeft={2}
          width={"1/6"}
        >
          <CopyToClipboard
            text={item.dataHash}
            onCopy={() => Success("Data hash copied successfully")}
          >
            <Text fontWeight={"light"} fontSize={"xl"}>
              {reduceString(item.dataHash)}
            </Text>
          </CopyToClipboard>
        </Box>
        <Box
          display={"flex"}
          justifyContent="center"
          paddingLeft={4}
          width={"1/6"}
        >
          <Box
            bgColor={statusColor(item.status)}
            maxW={"80%"}
            borderRadius="8px"
          >
            <Text
              textAlign={"center"}
              padding={1}
              textTransform="uppercase"
              color="white"
              fontWeight={"semibold"}
            >
              {item.status === KYCStatus.KYCFailed
                ? "failed"
                : item.status === KYCStatus.KYCVerified
                ? "verified"
                : "pending"}
            </Text>
          </Box>
        </Box>
        <HStack alignItems="center" justifyContent="center" width={"1/6"}>
          <Tooltip
            width="auto"
            label={item.additionalNotes}
            placement={"bottom left"}
          >
            <Text pl={2} fontWeight={"semibold"} color="coolGray.400">
              {item.additionalNotes?.slice(0, 20).concat("...")}
            </Text>
          </Tooltip>
        </HStack>
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          paddingLeft={5}
          width={"1/6"}
        >
          <CopyToClipboard
            text={item.user_ID}
            onCopy={() => Success("Address copied successfully")}
          >
            <Text fontWeight={"light"} fontSize={"xl"}>
              <Tooltip
                maxWidth={"100%"}
                label={"Click to copy"}
                placement={"bottom"}
              >
                {reduceString(item.user_ID)}
              </Tooltip>
            </Text>
          </CopyToClipboard>
        </Box>
        <HStack justifyContent={"flex-end"} width="1/6">
          {loading ? (
            <Spinner size={"lg"} />
          ) : (
          <>
            {item.status === KYCStatus.Pending && (
              <HStack space={4}>
                <Tooltip placement="bottom" label="Accept KYC">
                  <button
                    onClick={() =>
                      checkDataHash([
                        () => setOperation("accept"),
                        () => setModalVisible(true),
                      ])
                    }
                  >
                    <CheckCircleIcon
                      sx={{
                        fontSize:"20",
                      cursor:"pointer",
                      color: colors.greenAccent[500]
                      }}
                    />
                  </button>
                </Tooltip>
                <Tooltip placement="bottom" label="Reject KYC">
                    <button
                      onClick={() =>
                        checkDataHash([
                          () => setOperation("reject"),
                          () => setModalVisible(true),
                        ])
                      }
                    >
                      <CancelRoundedIcon sx={{
                        fontsize:'20', 
                        cursor:'pointer',
                        color: colors.redAccent[500]
                      }} />
                    </button>
                  </Tooltip>
                </HStack>
              )}
              {item.status === KYCStatus.KYCVerified && (
                <Tooltip placement="bottom" label="re-apply kyc">
                  <button
                    style={{ marginLeft: "4rem" }}
                    onClick={() => {
                      setOperation("reapply");
                      setModalVisible(true);
                    }}
                  >
                    <RedoOutlinedIcon sx={{
                        fontSize:"20",
                        cursor:'pointer',
                        color: yellow[500]
                      }}
                    />
                  </button>
                </Tooltip>
              )}
              <Tooltip placement="bottom" label="view details">
                <button
                  style={{ marginLeft: "1rem" }}
                  onClick={() =>
                    navigate(`/${item.user_ID}`, {
                      state: { permission: item.dataRequest },
                    })
                  }
                >
                  <VisibilityIcon sx={{
                    fontSize:'20',
                    color: colors.greenAccent[700]
                  }} />
                </button>
              </Tooltip>
            </>
          )}
        </HStack>
        {modalVisible && operation && (
          <ConfirmAction
            id={item.user_ID}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            operation={operation}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </HStack>     
    )
  );
};
