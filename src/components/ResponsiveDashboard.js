import { Container, Grid, Card, CardContent, Typography } from "@mui/material";

export default function ResponsiveDashboard() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="body2">Total Courses</Typography>
              <Typography variant="h6" fontWeight="bold">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="body2">Completed Courses</Typography>
              <Typography variant="h6" fontWeight="bold">8</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more grid items as needed */}
      </Grid>
    </Container>
  );
}
