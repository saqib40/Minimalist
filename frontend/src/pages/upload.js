import Avatar from '@mui/material/Avatar';
import { Container } from '@mui/material';
import FileSelector from '../components/FileSelector';

export default function Upload() {
    return (
        <Container>
            <Avatar src="mario-av.png" sx={{width: "200px", height: "200px"}}/>
            <FileSelector>Profile Update</FileSelector>
        </Container>
    )
}