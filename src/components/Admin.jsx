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
    const { control, handleSubmit, reset } = useForm({
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
        const newHome = {
            title: data.title,
            description: data.description,
            category: data.category,
            location: data.location,
            address: data.address,

            pricePerNight: Number(data.pricePerNight),
            guests: Number(data.guests),
            bedrooms: Number(data.bedrooms),
            beds: Number(data.beds),
            bathrooms: Number(data.bathrooms),

            images: data.images
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),

            amenities: data.amenities
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),

            isFeatured: data.isFeatured,
        };

        console.log("NEW HOME:", newHome);

        reset();
    };

    return (
        <Paper
            sx={{
                p: 3,
                maxWidth: 700,
                margin: "40px auto",
            }}
        >
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
                            <TextField
                                {...field}
                                label="Title"
                                fullWidth
                            />
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
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Category"
                                select
                                fullWidth
                            >
                                <MenuItem value="APARTMENT">
                                    Apartment
                                </MenuItem>

                                <MenuItem value="HOUSE">
                                    House
                                </MenuItem>

                                <MenuItem value="VILLA">
                                    Villa
                                </MenuItem>

                                <MenuItem value="CABIN">
                                    Cabin
                                </MenuItem>

                                <MenuItem value="HOTEL">
                                    Hotel
                                </MenuItem>
                            </TextField>
                        )}
                    />

                    <Controller
                        name="location"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Location"
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Address"
                                fullWidth
                            />
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
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="guests"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Guests"
                                type="number"
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="bedrooms"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Bedrooms"
                                type="number"
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="beds"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Beds"
                                type="number"
                                fullWidth
                            />
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
                                fullWidth
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
                                placeholder="https://image1.jpg, https://image2.jpg"
                                fullWidth
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
                                fullWidth
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

                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Home add
                    </Button>

                </Stack>
            </form>
        </Paper>
    );
}

export default Admin;