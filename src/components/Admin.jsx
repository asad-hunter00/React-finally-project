import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

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
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const ADD_HOME = gql`
  mutation AddHome($input: CreateListingInput!) {
    createListing(input: $input) {
      id
      title
    }
  }
`;

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

  const [addHome] = useMutation(ADD_HOME);
  const navigate = useNavigate();

  const submit = (data) => {
    const home = {
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
      isFeatured: data.isFeatured,
    };

    

    const newToast = toast.success("Uy qoshildi");
    reset();
    navigate("/");
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 700, margin: "40px auto" }}>
      <form onSubmit={handleSubmit(submit)}>
        <Stack spacing={2}>

          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/3840px-Airbnb_Logo_B%C3%A9lo.svg.png"
              width={100}
              alt="Airbnb"
            />
          </Link>

          <Typography variant="h5">
            Admin panel
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
              <TextField {...field} select label="Category">
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
              <TextField {...field} label="Price" type="number" />
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
              <TextField {...field} label="Bathrooms" type="number" />
            )}
          />

          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Images"
                placeholder="url1, url2"
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
                placeholder="Wi-Fi, Pool"
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
            Add Home
          </Button>

          <Link to="/">
            <Button fullWidth variant="outlined">
              Cancel
            </Button>
          </Link>

        </Stack>
      </form>
    </Paper>
  );
}

export default Admin;