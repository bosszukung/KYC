import { Center, Heading } from "native-base";

export default function Loader() {
  return (
    <Center h="100vh" w="100vw" bg="blueGray.800">
      <Heading color={"white"} fontWeight="semibold">
        Loading...
      </Heading>
    </Center>
  );
}