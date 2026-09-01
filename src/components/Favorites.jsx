import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { CircularProgress, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { useParams, Link } from "react-router";


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

const Wrapper = styled.div`
      padding: 30px 48px;
    `;

const Title = styled.h1`
      font-family: sans-serif;
      font-size: 24px;
      margin-bottom: 25px;
    `;

const Card = styled.div`
      position: relative;
      padding-bottom: 15px;
      cursor: pointer;

      &:hover {
        transform: translateY(-3px);
      }
      transition: 0.2s;
    `;

const Image = styled.img`
      width: 100%;
      height: 230px;
      object-fit: cover;
      border-radius: 15px;
      display: block;
    `;

const FavoriteButton = styled(Button)`
      position: absolute !important;
      top: 8px;
      right: 8px;

      min-width: 40px !important;
      width: 40px;
      height: 40px;

      padding: 0 !important;
      border-radius: 50% !important;

      background: white !important;
      color: #ff385c !important;

      &:hover {
        background: #f5f5f5 !important;
      }
    `;

const CardTitle = styled.h3`
      margin: 10px 0 5px;
      font-family: sans-serif;
      font-size: 15px;
      font-weight: 400;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;

const Rating = styled.p`
      margin: 0 0 5px;
      font-size: 13px;
      font-family: sans-serif;
    `;

const Price = styled.p`
      margin: 0;
      font-size: 13px;
      font-family: sans-serif;

      span {
        font-weight: 600;
      }
    `;

function Favorites() {

  const { id } = useParams();

  console.log("ID:", id);

  const { data, loading, error } = useQuery(favoritesQuery);

  const [removeFavorite] = useMutation(removeFavoriteMutation, {
    refetchQueries: [favoritesQuery],
  });

  const navigate = useNavigate()

  console.log(data);
  console.log(error);

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

      <Grid container spacing={3} >
        {data?.favorites?.map((item) => (
          <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <Link to={`/favorites/${item.id}`}>
                <Image
                  src={item.images}
                  alt={item.title}
                />

                <FavoriteButton
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    removeFavorite({
                      variables: {
                        listingId: item.id,
                      },
                    });
                  }}
                >
                  <FavoriteIcon />
                </FavoriteButton>

                <CardTitle>{item.title}</CardTitle>

                <Rating>⭐ {item.rating}</Rating>

                <Price>
                  <span>${item.pricePerNight}</span> night
                </Price>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default Favorites;