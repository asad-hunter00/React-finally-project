import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  CircularProgress,
  Button,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { Link } from "react-router";

import {
  Wrapper,
  Title,
  Card,
  Image,
  FavoriteButton,
  CardTitle,
  Rating,
  Price,
} from "../assets/FavoriteStyled.js";

import Header from "./Header.jsx";

const favoritesQuery = gql`
  query Favorites {
    favorites {
      id
      title
      pricePerNight
      rating
      images
      location
      category
      guests
      bedrooms
      beds
      bathrooms
    }
  }
`;

const removeFavoriteMutation = gql`
  mutation RemoveFavorite($listingId: ID!) {
    removeFavorite(listingId: $listingId) {
      id
    }
  }
`;

const EmptyWrapper = styled.div`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  text-align: center;
`;

function Favorites() {
  const { data, loading, error } = useQuery(favoritesQuery);

  const [removeFavorite] = useMutation(removeFavoriteMutation, {
    refetchQueries: [favoritesQuery],
  });

  if (loading) {
    return (
      <>
        <Header />

        <EmptyWrapper>
          <CircularProgress />
        </EmptyWrapper>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />

        <EmptyWrapper>
          <Typography color="error">
            {error.message}
          </Typography>
        </EmptyWrapper>
      </>
    );
  }

  const favorites = data?.favorites || [];

  return (
    <>
      <Header />

      <Wrapper style={{ paddingTop: "120px" }}>
        <Title>❤️ Favorites</Title>

        {favorites.length === 0 ? (
          <EmptyWrapper>
            <Typography variant="h5">
              Hali hech narsa yo‘q
            </Typography>

            <Typography color="text.secondary">
              Sevimli uylaringiz shu yerda ko‘rinadi.
            </Typography>

            <Link to="/listings">
              <Button
                variant="contained"
                sx={{
                  background: "#ff385c",
                  "&:hover": {
                    background: "#e31c5f",
                  },
                }}
              >
                Uylarni ko‘rish
              </Button>
            </Link>
          </EmptyWrapper>
        ) : (
          <Grid container spacing={3}>
            {favorites.map((item) => (
              <Grid
                key={item.id}
                size={{ xs: 12, sm: 6, md: 3 }}
              >
                <Card>

                  <Link
                    to={`/listings/${item.id}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <Image
                      src={
                        Array.isArray(item.images)
                          ? item.images[0]
                          : item.images
                      }
                      alt={item.title}
                    />

                    <CardTitle>
                      {item.title}
                    </CardTitle>

                    <Rating>
                      ⭐ {item.rating}
                    </Rating>

                    <Price>
                      <span>${item.pricePerNight}</span> night
                    </Price>
                  </Link>

                  <FavoriteButton
                    onClick={() => {
                      removeFavorite({
                        variables: {
                          listingId: item.id,
                        },
                      });
                    }}
                  >
                    <FavoriteIcon />
                  </FavoriteButton>

                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Wrapper>
    </>
  );
}

export default Favorites;