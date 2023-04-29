import { HStack, Text } from "native-base";
import {CaseCount} from './caseCount'


export const myCase = () => {
    return (
        <div>
            <Text
            textTransform={"capitalize"}
            fontWeight={"semibold"}
            fontSize={"lg"}>
                My Dashboard
            </Text>
            <HStack space={10} flexDirection={["column", "row"]}>
                <CaseCount count={246} heading={'Registered'} />
                <CaseCount count={192} heading={"Rejected"} />
                <CaseCount count={16} heading={"Approved"} />
            </HStack>
        </div>
    ) 
}