import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

import styled from "styled-components";
import Grid from "@mui/material/Grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useAuth from "../assets/Favorite";
import {
  Skeleton,
  Pagination as MuiPagination,
} from "@mui/material";

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



const ListingWrapper = styled.div`
  width: 100%;
  padding: 30px 48px;
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
  font-family: sans-serif;
  color: #333;

  z-index: 2;
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

  font-family: sans-serif;
  font-size: 14px;
  font-weight: 400;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Rating = styled.p`
  margin: 0 0 4px;

  font-family: sans-serif;
  font-size: 13px;
`;

const Price = styled.p`
  margin: 0;

  font-family: sans-serif;
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
  width: 36px;
  height: 36px;

  border: 1px solid #ddd;
  border-radius: 50%;

  background: ${({ active }) => active ? "#222" : "#fff"};
  color: ${({ active }) => active ? "#fff" : "#222"};

  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #222;
    color: white;
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
    <ListingWrapper>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && (
        <Typography color="error">
          {error.message}
        </Typography>
      )}

      {loading && <h4>Loading....</h4>}

      <Grid container spacing={3}>
        {data?.listings?.items?.map((item) => (
          <Grid
            key={item.id}
            size={{ xs: 12, sm: 6, md: 3 }}
          >
            <StyledBoxWrapper>

              <StyledImage
                src={item.images}
                alt={item.title}
              />

              <Guest>
                Guest favorite
              </Guest>

              <LikeButton
                onClick={() =>
                  addFavorite({
                    variables: {
                      listingId: item.id,
                    },
                  })
                }
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
                <span>${item.pricePerNight}</span> night
              </Price>

            </StyledBoxWrapper>
          </Grid>
        ))}
      </Grid>

      <Pagination>
        {new Array(totalPage).fill("").map((_, index) => (
          <PageButton
            key={index}
            active={page === index + 1}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>

    </ListingWrapper>
  );
}

export default Listing;
