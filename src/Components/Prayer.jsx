import Card from "@mui/material/Card";
import img from "./../Images/asr-prayer-mosque.png";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

function Prayer({ title, src, time }) {
  return (
    <Card sx={{ width: "14vw" }} style={{ textAlign: "center" }}>
      <CardMedia sx={{ height: 140 }} image={src} title="green iguana" />
      <CardContent>
        <h2>{title}</h2>
        <Typography variant="h3" color="text.secondary">
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default Prayer;
