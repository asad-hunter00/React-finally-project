import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useAuth from "../assets/Favorite";

const listingQuery = gql`
  query Listing($limit: Int, $page: Int, $search: String) {
    listings(limit: $limit, page: $page, search: $search) {
      items {
        id
        title
        pricePerNight
        rating
        images
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

function Listing() {
  const { accessToken } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, loading, error } = useQuery(listingQuery, {
    variables: { limit: 8, page: page, search: search },
  });

  const [
    addFavorite,
    { data: mutData, loading: mutLoading, error: mutError },
  ] = useMutation(addFavoriteMutation)



  console.log(accessToken);

  console.log(data);
  console.log(error);

  const totalPage = data?.listings?.pagination?.totalPages;

  console.log(totalPage);

  return (
    <div>
      <>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        {error && <Typography color="error">{error.message}</Typography>}
        {loading && <h4>Loading....</h4>}
        <Grid container spacing={2}>
          {data?.listings?.items?.map((item) => (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <div>
                  <h3>{item.title}</h3>

                  <img
                    src={item.images}
                    alt={item.title}
                    width={200}
                  />

                  <h4>Rating: {item.rating} ⭐️</h4>

                  <h3>For One Night: {item.pricePerNight} $</h3>

                  <Button
                    onClick={() =>
                      addFavorite({
                        variables: { listingId: item.id },
                      })
                    }
                  >
                    <FavoriteBorderIcon />
                  </Button>
                </div>
              </Grid>
            </Grid>
          ))}
        </Grid>

        <div>
          {new Array(totalPage).fill("").map((_, index) => (
            <button onClick={() => setPage(index + 1)}>{index + 1}</button>
          ))}
        </div>
      </>
    </div>
  );
}

export default Listing;
