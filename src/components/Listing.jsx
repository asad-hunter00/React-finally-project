import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  Button,
  Typography,
  TextField,
  Skeleton,
} from "@mui/material";
import { useState } from "react";


import Grid from "@mui/material/Grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";
import { Link, useParams } from "react-router";

import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

import PushPinIcon from "@mui/icons-material/PushPin";
import PeopleIcon from "@mui/icons-material/People";
import BedIcon from "@mui/icons-material/Bed";
import ShowerIcon from "@mui/icons-material/Shower";
import StarIcon from "@mui/icons-material/Star";
import House from "@mui/icons-material/Home";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Booking from "./Booking.jsx";


const listingQuery = gql`
  query Listings(
    $limit: Int
    $page: Int
    $search: String
    $category: ListingCategory
  ) {
    listings(
      limit: $limit
      page: $page
      search: $search
      category: $category
    ) {
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

   @media (max-width: 700px) {
    flex-direction: column;
    gap: 10px;
  }
`;


const ListingWrapper = styled.div`
  width: 100%;
  padding: 110px 48px 40px;
  box-sizing: border-box;

  @media (max-width: 700px) {
    padding: 90px 15px 30px;
  }
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


const CardSkeleton = styled.div`
  width: 100%;
`;


const SkeletonContent = styled.div`
  padding-top: 8px;
`;

const DetailBox = styled.div`
  max-width: 1000px;
  margin: 30px auto;
`;

const DetailTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DetailTitle = styled.h1`
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 500;
`;

const DetailLocation = styled.p`
  margin: 0;
  color: #666;
`;

const FavoriteButton = styled(Button)`
  min-width: 42px !important;
  width: 42px;
  height: 42px;
  border-radius: 50% !important;
`;


const SearchInput = styled(TextField)`
  width: 300px;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const CategorySelect = styled(Select)`
  width: 300px;

  @media (max-width: 700px) {
    width: 100%;
  }
`;


const DetailImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 15px;
`;

const DetailInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px 0;
`;

const Info = styled.div`
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const Description = styled.p`
  color: #555;
  line-height: 1.6;
`;

const Amenities = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Amenity = styled.span`
  background: #f3f3f3;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
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
  const [category, setCategory] = useState("");

  const { id } = useParams();


  const { data, loading, error } = useQuery(listingQuery, {
    variables: {
      limit: 15,
      page,
      search,
      ...(category ? { category } : {}),
    },
  });


  const [addFavorite] = useMutation(addFavoriteMutation);


  const totalPage =
    data?.listings?.pagination?.totalPages || 0;


  const selectedListing =
    data?.listings?.items?.find(
      (item) => item.id === id
    );



  if (id) {
    if (loading) {
      return (
        <>
          <Header />

          <ListingWrapper>
            <div style={{ paddingTop: "30px" }}>
              <Skeleton
                variant="rounded"
                width="500px"
                height="350px"
                sx={{
                  maxWidth: "100%",
                  borderRadius: "15px",
                }}
              />

              <Skeleton
                variant="text"
                width="350px"
                height={50}
                sx={{
                  marginTop: "15px",
                }}
              />

              <Skeleton
                variant="text"
                width="120px"
                height={30}
              />

              <Skeleton
                variant="text"
                width="220px"
                height={30}
              />

              <Skeleton
                variant="text"
                width="180px"
                height={30}
              />

              <Skeleton
                variant="text"
                width="160px"
                height={30}
              />

              <Skeleton
                variant="text"
                width="170px"
                height={30}
              />

              <Skeleton
                variant="text"
                width="140px"
                height={30}
              />

              <Skeleton
                variant="text"
                width="200px"
                height={40}
              />
            </div>
          </ListingWrapper>
        </>
      );
    }


    if (error) {
      return (
        <>
          <Header />

          <ListingWrapper>
            <Typography color="error">
              {error.message}
            </Typography>
          </ListingWrapper>
        </>
      );
    }


    if (!selectedListing) {
      return (
        <>
          <Header />

          <ListingWrapper>
            <Typography>
              Listing topilmadi
            </Typography>
          </ListingWrapper>
        </>
      );
    }


    return (
      <>
        <Header />

        <ListingWrapper>
          <DetailBox>

            <DetailTop>
              <div>
                <DetailTitle>
                  {selectedListing.title}
                </DetailTitle>

                <DetailLocation>
                  <PushPinIcon fontSize="small" />{" "}
                  {selectedListing.location}
                </DetailLocation>
              </div>

              <FavoriteButton>
                <FavoriteBorderIcon />
              </FavoriteButton>
            </DetailTop>

            <DetailImage
              src={
                Array.isArray(selectedListing.images)
                  ? selectedListing.images
                  : selectedListing.images
              }
              alt={selectedListing.title}
            />

            <DetailInfo>

              <Info>
                <StarIcon fontSize="small" />
                {selectedListing.rating}
              </Info>

              <Info>
                {selectedListing.reviewsCount} reviews
              </Info>

              <Info>
                <House fontSize="small" />
                {selectedListing.category}
              </Info>

              <Info>
                <PeopleIcon fontSize="small" />
                {selectedListing.guests} guests
              </Info>

              <Info>
                <BedIcon fontSize="small" />
                {selectedListing.bedrooms} bedrooms
              </Info>

              <Info>
                <BedIcon fontSize="small" />
                {selectedListing.beds} beds
              </Info>

              <Info>
                <ShowerIcon fontSize="small" />
                {selectedListing.bathrooms} bathrooms
              </Info>

            </DetailInfo>

            <Typography variant="h5">
              About this place
            </Typography>

            <Description>
              {selectedListing.description}
            </Description>

            <Typography
              variant="h5"
              sx={{ marginBottom: "12px" }}
            >
              Amenities
            </Typography>

            <Amenities>
              {selectedListing.amenities?.map(
                (item, index) => (
                  <Amenity key={index}>
                    {item}
                  </Amenity>
                )
              )}
            </Amenities>

            <Typography
              variant="h5"
              sx={{ marginTop: "25px" }}
            >
              Address
            </Typography>

            <Description>
              {selectedListing.address}
            </Description>

            <Typography
              variant="h4"
              sx={{ marginTop: "25px" }}
            >
              ${selectedListing.pricePerNight}
              <Typography
                component="span"
                color="text.secondary"
              >
                / night
              </Typography>
            </Typography>

          </DetailBox>
        </ListingWrapper>

        <Footer />
      </>
    );
  }



  if (loading) {
    return (
      <>
        <Header />

        <ListingWrapper>
          <FilterCategory>
            <Skeleton
              variant="rounded"
              width={300}
              height={56}
            />

            <Skeleton
              variant="rounded"
              width={300}
              height={56}
            />
          </FilterCategory>


          <Grid container spacing={3}>
            {Array.from({ length: 8 }).map(
              (_, index) => (
                <Grid
                  key={index}
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 3,
                  }}
                >
                  <CardSkeleton>
                    <Skeleton
                      variant="rounded"
                      width="100%"
                      height={230}
                      sx={{
                        borderRadius: "15px",
                      }}
                    />

                    <SkeletonContent>
                      <Skeleton
                        variant="text"
                        width="70%"
                        height={25}
                      />

                      <Skeleton
                        variant="text"
                        width="35%"
                        height={22}
                      />

                      <Skeleton
                        variant="text"
                        width="50%"
                        height={22}
                      />
                    </SkeletonContent>
                  </CardSkeleton>
                </Grid>
              )
            )}
          </Grid>
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


          <FormControl>
            <InputLabel id="category-label">
              Category
            </InputLabel>

            <CategorySelect
            style={{
              width: "300px",
            }}
              labelId="category-label"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              label="Category"
            >
              <MenuItem value="">
                All categories
              </MenuItem>

              <MenuItem value="APARTMENT">APARTMENT</MenuItem>
              <MenuItem value="HOTEL">HOTEL</MenuItem>
              <MenuItem value="HOUSE">HOUSE</MenuItem>
              <MenuItem value="VILLA">VILLA</MenuItem>
              <MenuItem value="CABIN">CABIN</MenuItem>
            </CategorySelect>
          </FormControl>
        </FilterCategory>


        {error && (
          <Typography color="error">
            {error.message}
          </Typography>
        )}


        <Grid container spacing={3}>
          {data?.listings?.items?.map(
            (item) => (
              <Grid
                key={item.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3,
                }}
              >
                <StyledBoxWrapper>
                  <Link
                    to={`/listings/${item.id}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <StyledImage
                      src={item.images}
                      alt={item.title}
                    />
                  </Link>


                  <Guest>
                    Guest favorite
                  </Guest>


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


                  <StyledTitle>
                    {item.title}
                  </StyledTitle>


                  <Rating>
                    ⭐ {item.rating}
                  </Rating>


                  <Price>
                    <span>
                      ${item.pricePerNight}
                    </span>
                    {" "}
                    for 2 night
                  </Price>
                </StyledBoxWrapper>
              </Grid>
            )
          )}
        </Grid>



        <Pagination>
          {Array.from({
            length: totalPage,
          }).map((_, index) => (
            <PageButton
              key={index}
              $active={
                page === index + 1
              }
              onClick={() =>
                setPage(index + 1)
              }
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