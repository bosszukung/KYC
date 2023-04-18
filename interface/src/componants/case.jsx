import { HStack, Text } from "native-base";
import { caseCount } from './caseCount'


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
                <caseCount count={246} heading={'Registered'} />
                <caseCount count={192} heading={"Rejected"} />
                <caseCount count={16} heading={"Approved"} />
            </HStack>
        </div>
    ) 
}