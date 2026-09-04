import { IconButton, Modal } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";

const HeaderWrapper = styled.div`
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
`;

const TopHeader = styled.div`
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
`;

const Logo = styled.img`
  width: 120px;
  display: block;
`;

const Categories = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Category = styled.div`
  display: flex;

  align-items: center;

  height: 70px;
  min-width: 80px;
  color: #717171;
  font-size: 16px;
  font-family: sans-serif;

  cursor: pointer;

  position: relative;
  justify-content: center;
  &:hover {
    color: #222;
  }

  &.active {
    color: #222;
  }

  &.active::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    height: 3px;
    background: #222;
  }
`;
const CategoryImage = styled.img`
  width: 75px;
  height: 75px;
  object-fit: contain;
  margin-bottom: 5px;

  transition: 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserLetter = styled.div`
  width: 38px;
  height: 38px;
  border: 1px solid #ddd;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #ff385c;
  font-size: 15px;
  font-weight: 600;
`;

const MenuButton = styled(IconButton)`
  width: 42px !important;
  height: 42px !important;
  border: 1px solid #ddd !important;

  &:hover {
    background: #f7f7f7 !important;
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <TopHeader>
        <a href="/">
          <Logo
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/3840px-Airbnb_Logo_B%C3%A9lo.svg.png"
            alt="Airbnb"
          />
        </a>

        <Categories>
          <Category className="active">
            <CategoryImage src="https://a0.muscache.com/im/pictures/AirbnbPlatformAssets/AirbnbPlatformAssets-search-bar-icons/original/a811de29-114f-43a0-b8c5-698d4564bd04.png?im_w=240" />
            All
          </Category>

          <Category>
            <CategoryImage src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/4aae4ed7-5939-4e76-b100-e69440ebeae4.png?im_w=240" />
            Homes
          </Category>

          <Category>
            <CategoryImage src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/1e24b1c9-b070-48d9-8a70-91aae3151830.png?im_w=240" />
            Experiences
          </Category>

          <Category>
            <CategoryImage src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/2bf5d36d-e731-4465-a8ef-91abbf2ae8ce.png?im_w=240" />
            Services
          </Category>
        </Categories>

        <Profile>
          <Stack direction="row" spacing={2}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
          </Stack>
        </Profile>
      </TopHeader>
    </HeaderWrapper>
  );
}

export default Header;
