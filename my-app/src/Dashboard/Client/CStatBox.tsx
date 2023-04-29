import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../Theme";
import CProgressCircle from "./CProgessCircle";

const CStatBox = ({title, subtitle, icon, progress, increase}: {
    title:any;
    subtitle:any; 
    icon:any;
    progress:any;
    increase:any;
}) =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

   return (
    <Box width="100%" m="0px 30px" mt='20px'>
        <Box display="flex" justifyContent="space-between">
            <Box>
                {icon}
                <Typography 
                    variant="h4" 
                    fontWeight="bold" 
                    sx={{color: colors.grey[100]}}
                >
                    {title}
                </Typography>
            </Box>
            <Box>
                <CProgressCircle progress={progress}/>
            </Box>
        </Box>

        <Box display="flex" justifyContent="space-between">
            <Typography 
                variant="h5" 
                sx={{color: colors.greenAccent[500]}}
            >
                {subtitle}
            </Typography>
            <Typography 
               variant="h5" 
                fontStyle="italic"
                sx={{color: colors.greenAccent[600]}}
            >
                {increase}
            </Typography>
        </Box>
    </Box>
   )
}

export default CStatBox