import React from 'react';
import {Button, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Artists} from "../../types";
import noImage from '../../assets/images/no-image.png';
import {linksStyle} from "../Layout/Layout";
import {apiURl} from "../../constans";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../store/userSlice";

interface Props {
  executor: Artists
}

const CartExecutor:React.FC<Props> = ({executor}) => {
  const user = useAppSelector(selectUser);
  let image = noImage;
  let published = <UnpublishedIcon style={{color: 'red'}}/>

  if (executor.photo) {
    image = apiURl + '/' + executor.photo
  }

  if (executor.isPublished) {
    published = <PublishedWithChangesIcon color='primary'/>
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
              <Grid container justifyContent='space-between' alignItems='center'>
                <Grid item>
                  <Typography gutterBottom variant="h5" component="h3" align="center">
                    {executor.title}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography gutterBottom variant="h5" component="h3" align="center">
                    {published}
                  </Typography>
                </Grid>
              </Grid>
              {
                user && user.role === 'admin' ? (
                  executor.isPublished ? (
                    <Button color='warning' variant="contained">Удалить</Button>
                  ) : <Button variant="contained">Опублиовать</Button>
                ) : null
              }
            </CardContent>
          </Link>
        </Card>
      </Grid>
    </>
  );
};

export default CartExecutor;