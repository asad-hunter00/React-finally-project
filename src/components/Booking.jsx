import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import styled from "styled-components";

const BookingCard = styled(Paper)`
  padding: 16px;
`;

const BookingTitle = styled(Typography)`
  margin-bottom: 5px !important;
`;

function Booking() {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);


    return (
        <BookingCard>
            <Stack spacing={2}>
                <BookingTitle variant="h6">
                    Bron qilish
                </BookingTitle>
                <TextField
                    label="Check-in"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                />

                <TextField
                    label="Check-out"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                />

                <TextField
                    label="Guests"
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                />

                <Typography>
                    Check-in: {checkIn}
                </Typography>

                <Typography>
                    Check-out: {checkOut}
                </Typography>

                <Typography>
                    Guests: {guests}
                </Typography>

                <Typography>
                    Jami: ${guests * 100}
                </Typography>

                <Button variant="contained">
                    Bron qilish
                </Button>
            </Stack>
        </BookingCard>
    );
}

export default Booking;