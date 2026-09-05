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
import { Link } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";

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
    pricePerNight: data.pricePerNight,
    guests: data.guests,
    bedrooms: data.bedrooms,
    beds: data.beds,
    bathrooms: data.bathrooms,
    images: data.images,
    amenities: data.amenities,
    isFeatured: data.isFeatured
   }
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
          <a href="/">  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/3840px-Airbnb_Logo_B%C3%A9lo.svg.png?utm_source=ru.wikipedia.org&utm_campaign=index&utm_content=thumbnail" width={100}  /></a>
          <Typography variant="h5">Admin panel</Typography>


          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Title" fullWidth />
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
              <TextField {...field} label="Category" select fullWidth>
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
              <TextField {...field} label="Location" fullWidth />
            )}
          />

          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Address" fullWidth />
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
              <TextField {...field} label="Guests" type="number" fullWidth />
            )}
          />

          <Controller
            name="bedrooms"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Bedrooms" type="number" fullWidth />
            )}
          />

          <Controller
            name="beds"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Beds" type="number" fullWidth />
            )}
          />

          <Controller
            name="bathrooms"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Bathrooms" type="number" fullWidth />
            )}
          />

          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Images URLs"
                placeholder="URL://....."
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
                placeholder="Wi-fi"
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
                  <Checkbox checked={field.value} onChange={field.onChange} />
                }
                label="Featred"
              />
            )}
          />

          <Button type="submit" variant="contained">
            Home add
          </Button>

          <Link to="/" >
            <Button fullWidth variant="contained">Cancel</Button>
          </Link>
        </Stack>
      </form>
    </Paper>
  );
}

export default Admin;
