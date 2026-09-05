import {
    Button,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

function Admin() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            title: "",
            description: "",
            category: "",
            location: "",
            address: "",
            pricePerNight: "",
            guests: "",
            bedrooms: "",
            beds: "",
            bathrooms: "",
            images: "",
            amenities: "",
            isFeatured: false,
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Paper sx={{ p: 3, maxWidth: 700, margin: "40px auto" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        Admin Panel
                    </Typography>

                    <Typography variant="h6">
                        Yangi uy qo‘shish
                    </Typography>

                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Title" />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Description"
                                multiline
                                rows={3}
                            />
                        )}
                    />

                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Category" select>
                                <MenuItem value="APARTMENT">Apartment</MenuItem>
                                <MenuItem value="HOUSE">House</MenuItem>
                                <MenuItem value="VILLA">Villa</MenuItem>
                                <MenuItem value="CABIN">Cabin</MenuItem>
                                <MenuItem value="HOTEL">Hotel</MenuItem>
                            </TextField>
                        )}
                    />

                    <Controller
                        name="location"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Location" />
                        )}
                    />

                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Address" />
                        )}
                    />

                    <Controller
                        name="pricePerNight"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Price per night"
                                type="number"
                            />
                        )}
                    />

                    <Controller
                        name="guests"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Guests" type="number" />
                        )}
                    />

                    <Controller
                        name="bedrooms"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Bedrooms" type="number" />
                        )}
                    />

                    <Controller
                        name="beds"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Beds" type="number" />
                        )}
                    />

                    <Controller
                        name="bathrooms"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Bathrooms"
                                type="number"
                            />
                        )}
                    />

                    <Controller
                        name="images"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Images URLs"
                                placeholder="URL//...."
                            />
                        )}
                    />

                    <Controller
                        name="amenities"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Amenities"
                                placeholder="WiFi, Kitchen, Parking"
                            />
                        )}
                    />

                    <Controller
                        name="isFeatured"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={field.value}
                                        onChange={field.onChange}
                                    />
                                }
                                label="Featured"
                            />
                        )}
                    />

                    <Button type="submit" variant="contained">
                        Hoem add
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}

export default Admin;