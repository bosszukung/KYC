import SearchIcon from "@mui/icons-material/Search";
import { Input } from "native-base";
import { tokens } from "../Dashboard/Theme";
import { useTheme } from "@mui/material";

export const SearchBox = ({
  setSearchText,
  searchText,
  searchOperation,
}: {
  setSearchText: (arg0: string) => void;
  searchText: string;
  searchOperation: Function;
}) => {
    const theme = useTheme()
    const colors =tokens(theme.palette.mode)
  return (
    <Input
      variant="underlined"
      placeholder="Search cases"
      width={["300", "400px"]}
      value={searchText}
      onChangeText={setSearchText}
      fontSize={"md"}
      backgroundColor={colors.primary[400]}
      InputRightElement={
        <SearchIcon
          onClick={() => searchOperation()}
          sx={{color:"white", cursor:'pointer', fontSize:20}}
        />
      }
      borderColor="yellow.400"
    />
  );
};