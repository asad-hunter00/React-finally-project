import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  padding: 30px 48px 40px;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  margin: 0 0 30px;
  font-size: 28px;
`;

export const Card = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Image = styled.img`
  width: 100%;
  height: 230px;
  object-fit: cover;
  border-radius: 15px;
  display: block;
`;

export const FavoriteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;

  width: 38px;
  height: 38px;

  border: none;
  border-radius: 50%;
  background: white;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  svg {
    font-size: 24px;
  }
`;

export const CardTitle = styled.h3`
  margin: 10px 0 5px;
  font-size: 14px;
  font-weight: 400;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Rating = styled.p`
  margin: 0 0 5px;
  font-size: 13px;
`;

export const Price = styled.p`
  margin: 0;
  font-size: 13px;

  span {
    font-weight: 600;
  }
`;