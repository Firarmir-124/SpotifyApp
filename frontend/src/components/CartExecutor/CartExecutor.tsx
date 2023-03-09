import React from 'react';
import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Artists} from "../../types";
import noImage from '../../assets/images/no-image.png';
import {linksStyle} from "../Layout/Layout";
import {apiURl} from "../../constans";

interface Props {
  executor: Artists
}

const CartExecutor:React.FC<Props> = ({executor}) => {
  let image = noImage;

  if (executor.photo) {
    image = apiURl + '/' + executor.photo
  }

  return (
    <>
      <Grid item xs={2} sm={4} md={4}>
        <Card sx={{ maxWidth: 400 }}>
          <Link style={linksStyle} to={'executor/' + executor._id}>
            <CardMedia
              sx={{ height: 200 }}
              image={image}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="h3" align="center">
                {executor.title}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      </Grid>
    </>
  );
};

export default CartExecutor;