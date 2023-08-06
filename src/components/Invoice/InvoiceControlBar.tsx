import { Button, styled } from '@mui/material';
import { Link } from 'react-router-dom';



function InvoiceControlBar() {

    const ButtonWrapper = styled('div')(({ theme }) => ({
        display: 'flex',
        marginBottom: theme.spacing(2),
    }));


    return (
        <>

            <ButtonWrapper>
                <Link to="invoice/detail">
                    <Button variant="contained" color="primary">
                        Create Invoice
                    </Button>
                </Link>
            </ButtonWrapper>


        </>
    )
}

export default InvoiceControlBar