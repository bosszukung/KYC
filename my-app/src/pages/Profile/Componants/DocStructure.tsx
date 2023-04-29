import { Box, Skeleton, useTheme } from "@mui/material";
import { HStack } from 'native-base';
import { tokens } from "../../../Dashboard/Theme";


export const DocumentStructure = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box width={['100%', '50%']}>
            <HStack
                w={['100%', '90%']}
                minH={'30vh'}
                borderWidth={'1'}
                space={'8'}
                rounded={'md'}
                borderColor={colors.primary[400]}
                p={'4'}
            >
                <Skeleton 
                    sx={{color: colors.grey[500], height:'100%', width:'100%', }}
                    variant="rounded"
                    animation="wave" 
                />
            </HStack>
        </Box>
    );
}