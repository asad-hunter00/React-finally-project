import { Container, Grid } from "@mui/material";
import styled from "styled-components";

const FooterWrapper = styled.div`
  background-color: aliceblue;
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
`;

function Footer() {
  return (
    <>
      <Grid
        container
        spacing={2}
        style={{ padding: "30px 50px", display: "flex", flexDirection: "row" }}
      >
        <FooterWrapper>
          <Grid item xs={12} sm={6} md={3}>
            <Grid item xs={12} sm={6} md={3}>
              <h2 style={{ fontFamily: "sans-serif" }}>Support</h2>
              <div>
                <p>Help Center</p>
                <p>Get help with a safety issue</p>
                <p>AirCover</p>
                <p>Travel insurance</p>
                <p>Anti-discrimination</p>
                <p>Disability support</p>
                <p>Cancellation options</p>
                <p>Report neighborhood concern</p>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <h2 style={{ fontFamily: "sans-serif" }}>Hosting</h2>
              <div>
                <p>Airbnb your home</p>
                <p>Airbnb your experience</p>
                <p>Airbnb your service</p>
                <p>AirCover for Hosts</p>
                <p>Hosting resources</p>
                <p>Community forum</p>
                <p>Hosting responsibly</p>
                <p>Airbnb-friendly apartments</p>
                <p>Join a free hosting class</p>
                <p>Find a co‑host</p>
                <p>Refer a host</p>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <h2 style={{ fontFamily: "sans-serif" }}>Airbnb</h2>
              <div>
                <p>2026 Summer Release</p>
                <p>Newsroom</p>
                <p>Careers</p>
                <p>Investors</p>
                <p>Gift cards</p>
                <p>Airbnb.org emergency stays</p>
              </div>
            </Grid>
          </Grid>
        </FooterWrapper>
      </Grid>
    </>
  );
}

export default Footer;
