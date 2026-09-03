import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { CircularProgress } from "@mui/material";
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

function Favorites() {
  const { data, loading, error } = useQuery(favoritesQuery);

  const [removeFavorite] = useMutation(removeFavoriteMutation, {
    refetchQueries: [favoritesQuery],
  });

  return (
    <Wrapper>
      <Title>❤️ Favorites</Title>

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

      {error && <p>{error.message}</p>}

      <Grid container spacing={3}>
        {data?.favorites?.map((item) => (
          <Grid
            key={item.id}
            size={{ xs: 12, sm: 6, md: 3 }}
          >
            <Link
              to={`/favorites/${item.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Card>
                <Image
                  src={item.images}
                  alt={item.title}
                />

                <FavoriteButton
                  onClick={(e) => {
                    e.preventDefault();

                    removeFavorite({
                      variables: {
                        listingId: item.id,
                      },
                    });
                  }}
                >
                  <FavoriteIcon />
                </FavoriteButton>

                <CardTitle>
                  {item.title}
                </CardTitle>

                <Rating>
                  ⭐ {item.rating}
                </Rating>

                <Price>
                  <span>${item.pricePerNight}</span> night
                </Price>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default Favorites;