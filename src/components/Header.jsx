import { Button, Avatar, Stack, Modal, Menu, MenuItem } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../assets/Favorite";

const HeaderWrapper = styled.div`
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
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

const LogoutModal = styled.div`
  width: 400px;
  max-width: calc(100% - 40px);
  background: white;
  border-radius: 20px;
  padding: 35px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  box-sizing: border-box;
`;

const LogoutImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const LogoutTitle = styled.h2`
  margin: 5px 0 10px;
  font-family: sans-serif;
  font-size: 25px;
`;

const LogoutText = styled.p`
  color: #717171;
  font-size: 15px;
  margin-bottom: 25px;
  font-family: sans-serif;
`;

const LogoutButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const CancelButton = styled(Button)`
  flex: 1;
  height: 45px !important;
  border: 1px solid #222 !important;
  color: #222 !important;
  border-radius: 10px !important;
`;

const AgreeButton = styled(Button)`
  flex: 1;
  height: 45px !important;
  background: #ff385c !important;
  color: white !important;
  border-radius: 10px !important;

  &:hover {
    background: #e31c5f !important;
  }
`;

function Header() {
  const [isLogout, setIsLogout] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const {
    accessToken,
    user,
    setAccessToken,
    setUser,
  } = useAuth();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    setIsLogout(false);

    setAccessToken(null);
    setUser(null);

    localStorage.removeItem("auth");

    navigate("/");
  };

  return (
    <HeaderWrapper>
      <TopHeader>
        <Link to="/">
          <Logo
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/3840px-Airbnb_Logo_B%C3%A9lo.svg.png"
            alt="Airbnb"
          />
        </Link>

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

        {accessToken ? (
          <Profile>
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                cursor: "pointer",
              }}
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </Avatar>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/favorites");
                }}
              >
                ❤️ Favorites
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/bookings");
                }}
              >
                📅 Bookings
              </MenuItem>

              <MenuItem onClick={() => setIsLogout(true)}>
                Logout
              </MenuItem>
            </Menu>
          </Profile>
        ) : (
          <Profile>
            <Link to="/login">
              <Button>Login</Button>
            </Link>

            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </Profile>
        )}
      </TopHeader>

      <Modal
        open={isLogout}
        onClose={() => setIsLogout(false)}
      >
        <LogoutModal>
          <LogoutImage
            src="https://png.pngtree.com/png-clipart/20200701/original/pngtree-red-error-icon-png-image_5418881.jpg"
            alt="Logout"
          />

          <LogoutTitle>Are you sure?</LogoutTitle>

          <LogoutText>
            Are you sure you want to logout from your account?
          </LogoutText>

          <LogoutButtons>
            <CancelButton
              variant="outlined"
              onClick={() => setIsLogout(false)}
            >
              Cancel
            </CancelButton>

            <AgreeButton
              variant="contained"
              onClick={handleLogout}
            >
              Agree
            </AgreeButton>
          </LogoutButtons>
        </LogoutModal>
      </Modal>
    </HeaderWrapper>
  );
}

export default Header;