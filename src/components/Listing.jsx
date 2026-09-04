import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { Button, Typography, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";

import Grid from "@mui/material/Grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";
import { Link, useParams } from "react-router";
import Footer from "./Footer.jsx";
import PushPinIcon from "@mui/icons-material/PushPin";
import PeopleIcon from "@mui/icons-material/People";
import BedIcon from "@mui/icons-material/Bed";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ShowerIcon from "@mui/icons-material/Shower";
import StarIcon from "@mui/icons-material/Star";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Header from "./Header.jsx";
import House from "@mui/icons-material/Home";

const listingQuery = gql`
  query Listings(
    $limit: Int
    $page: Int
    $search: String
    $category: ListingCategory
  ) {
    listings(limit: $limit, page: $page, search: $search, category: $category) {
      items {
        id
        address
        amenities
        bathrooms
        bedrooms
        beds
        category
        createdAt
        description
        guests
        id
        images
        isFavorite
        isFeatured
        location
        pricePerNight
        rating
        reviewsCount
        title
      }

      pagination {
        totalPages
      }
    }
  }
`;

const addFavoriteMutation = gql`
  mutation AddFavorite($listingId: ID!) {
    addFavorite(listingId: $listingId) {
      id
    }
  }
`;
const FilterCategory = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
  margin-bottom: 20px;
`;

const ListingWrapper = styled.div`
  width: 100%;
  padding: 0 48px 40px;
  box-sizing: border-box;
`;

const StyledBoxWrapper = styled.div`
  position: relative;
  padding-bottom: 15px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 230px;
  object-fit: cover;
  border-radius: 15px;
  display: block;
`;

const Guest = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;

  background: white;
  padding: 6px 10px;
  border-radius: 20px;

  font-size: 12px;
  color: #333;
`;

const LikeButton = styled(Button)`
  position: absolute !important;
  top: 8px;
  right: 8px;

  min-width: 38px !important;
  width: 38px;
  height: 38px;

  padding: 0 !important;
  border-radius: 50% !important;

  color: white !important;

  &:hover {
    background: transparent !important;
  }

  svg {
    font-size: 28px;
    filter: drop-shadow(0 1px 2px #555);
  }
`;

const StyledTitle = styled.h3`
  margin: 10px 0 5px;
  font-size: 14px;
  font-weight: 400;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Rating = styled.p`
  margin: 0 0 4px;
  font-size: 13px;
`;

const Price = styled.p`
  margin: 0;
  font-size: 13px;

  span {
    font-weight: 600;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 30px;
`;

const PageButton = styled.button`
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  background: ${(props) => (props.$active ? "#000" : "#eee")};
  color: ${(props) => (props.$active ? "#fff" : "#000")};
`;

function Listing() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(null);

  const { id } = useParams();

  const { data, loading, error } = useQuery(listingQuery, {
    variables: {
      limit: 5,
      page,
      search,
      category: category,
    },
  });

  const [addFavorite] = useMutation(addFavoriteMutation);

  const totalPage = data?.listings?.pagination?.totalPages;

  const selectedListing = data?.listings?.items?.find((item) => item.id === id);

  if (id) {
    if (loading) {
      return (
        <>
          <Header />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "60px",
            }}
          >
            <CircularProgress />
          </div>
        </>
      );
    }

    if (error) {
      return (
        <>
          <Header />

          <Typography color="error">{error.message}</Typography>
        </>
      );
    }

    if (!selectedListing) {
      return (
        <>
          <Header />

          <Typography>Listing topilmadi</Typography>
        </>
      );
    }

    return (
      <>
        <Header />

        <ListingWrapper>
          <div style={{ paddingTop: "30px" }}>
            <img
              src={selectedListing.images}
              style={{
                width: "500px",
                maxWidth: "100%",
                height: "350px",
                objectFit: "cover",
                borderRadius: "15px",
              }}
            />

            <h1>{selectedListing.title}</h1>

            <p>
              <StarIcon /> {selectedListing.rating}
            </p>

            <p>
              <PushPinIcon /> {selectedListing.location}
            </p>

            <p>
              <House /> {selectedListing.category}
            </p>

            <p>
              <PeopleIcon /> Guests: {selectedListing.guests}
            </p>

            <p>
              <BedIcon /> Bedrooms: {selectedListing.bedrooms}
            </p>

            <p>
              <BedIcon /> Beds: {selectedListing.beds}
            </p>

            <p>
              <ShowerIcon /> Bathrooms: {selectedListing.bathrooms}
            </p>

            <h3>${selectedListing.pricePerNight} / night</h3>
          </div>
        </ListingWrapper>
      </>
    );
  }

  return (
    <>
      <Header />

      <ListingWrapper>
        <FilterCategory>
          <TextField
            type="text"
            label="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            style={{
              margin: "30px 0",
              width: "300px",
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              label="Age"
              style={{
                width: "300px",
              }}
            >
              <MenuItem value="APARTMENT">APPARTMENT</MenuItem>
              <MenuItem value="HOTEL">HOTEL</MenuItem>
              <MenuItem value="HOUSE">HOUSE</MenuItem>
              <MenuItem value="VILLA">VILLA</MenuItem>
              <MenuItem value="CABIN">CABIN</MenuItem>
            </Select>
          </FormControl>
        </FilterCategory>

        {error && <Typography color="error">{error.message}</Typography>}

        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "40px",
            }}
          >
            <CircularProgress />
          </div>
        )}

        <Grid container spacing={3}>
          {data?.listings?.items?.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <StyledBoxWrapper>
                <Link
                  to={`/listings/${item.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <StyledImage src={item.images} alt={item.title} />
                </Link>
                <Guest>Guest favorite</Guest>

                <LikeButton
                  onClick={() => {
                    addFavorite({
                      variables: {
                        listingId: item.id,
                      },
                    });
                  }}
                >
                  <FavoriteBorderIcon />
                </LikeButton>

                <StyledTitle>{item.title}</StyledTitle>

                <Rating>⭐ {item.rating}</Rating>

                <Price>
                  <span>${item.pricePerNight}</span>
                  for 2 night
                </Price>
              </StyledBoxWrapper>
            </Grid>
          ))}
        </Grid>

        <Pagination>
          {new Array(totalPage).fill("").map((_, index) => (
            <PageButton
              key={index}
              $active={page === index + 1}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
        </Pagination>
      </ListingWrapper>

      <Footer />
    </>
  );
}

export default Listing;
