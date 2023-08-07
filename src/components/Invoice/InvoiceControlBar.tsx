import { Button, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';



function InvoiceControlBar() {

    const ButtonWrapper = styled('div')(({ theme }) => ({
        display: 'flex',
        marginBottom: theme.spacing(2),
    }));


    return (
        <>
            <Typography variant="h6" gutterBottom component="div">
                Invoice Editing
            </Typography>
            <ButtonWrapper>
                <Link to="detail" >
                    <Button role="button" name="Create Invoice" variant="contained" color="primary">
                        Create Invoice
                    </Button>
                </Link>
            </ButtonWrapper>


        </>
    )
}

export default InvoiceControlBar