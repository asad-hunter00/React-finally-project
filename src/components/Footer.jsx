import { Grid } from "@mui/material";
import styled from "styled-components";

const FooterWrapper = styled.div`
  background-color: aliceblue;
  width: 95%;
  padding: 70px 50px;
`;

const FooterColumn = styled.div`
  font-family: sans-serif;

  h2 {
    margin-bottom: 20px;
  }

  p {
    margin: 10px 0;
    color: #555;
    cursor: pointer;
  }

  p:hover {
    color: #000;
  }
`;

const BottomFooter = styled.div`
  border-top: 1px solid #ddd;
  margin-top: 30px;
  padding-top: 25px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: sans-serif;
  font-size: 13px;
  color: #222;

  .bottom-right {
    display: flex;
    gap: 12px;
  }

  a {
    color: #222;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;

    .bottom-right {
      flex-wrap: wrap;
    }
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FooterColumn>
            <h2>Support</h2>

            <p>Help Center</p>
            <p>Get help with a safety issue</p>
            <p>AirCover</p>
            <p>Travel insurance</p>
            <p>Anti-discrimination</p>
            <p>Disability support</p>
            <p>Cancellation options</p>
            <p>Report neighborhood concern</p>
          </FooterColumn>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FooterColumn>
            <h2>Hosting</h2>

            <p>Airbnb your home</p>
            <p>Airbnb your experience</p>
            <p>Airbnb your service</p>
            <p>AirCover for Hosts</p>
            <p>Hosting resources</p>
            <p>Community forum</p>
            <p>Hosting responsibly</p>
            <p>Airbnb-friendly apartments</p>
            <p>Join a free hosting class</p>
            <p>Find a co-host</p>
            <p>Refer a host</p>
          </FooterColumn>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FooterColumn>
            <h2>Airbnb</h2>

            <p>2026 Summer Release</p>
            <p>Newsroom</p>
            <p>Careers</p>
            <p>Investors</p>
            <p>Gift cards</p>
            <p>Airbnb.org emergency stays</p>
          </FooterColumn>
        </Grid>
      </Grid>

      <BottomFooter>
        <div>
          © 2026 Airbnb, Inc. All rights reserved.
        </div>

        <div className="bottom-right">
          <a href="#">Sitemap</a>
          <span>·</span>
          <a href="#">Do not sell or share my personal information</a>
          <span>·</span>
          <a href="#">Company details</a>
        </div>
      </BottomFooter>
    </FooterWrapper>
  );
}

export default Footer;