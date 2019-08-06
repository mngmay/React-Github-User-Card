import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { teal } from "@material-ui/core/colors";
import PersonIcon from "@material-ui/icons/Person";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function UserCard(props) {
  const { follower } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const name = follower.name ? String(follower.name) : String(follower.login);
  const initial = name[0].toUpperCase();

  function handleExpandClick() {
    setExpanded(!expanded);
  }
  return (
    <div className="user-card">
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {initial}
            </Avatar>
          }
          title={follower.name ? follower.name : follower.login}
          subheader={follower.login}
        />
        <CardMedia
          className={classes.media}
          image={follower.avatar_url}
          title="User Avatar"
        />
        <CardContent>
          <Typography variant="body2" color="textPrimary" component="p">
            {follower.bio}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="card-details"
          >
            <span>
              Location:{" "}
              {follower.location ? follower.location : "Not Available"}
            </span>
            <span>Followers: {follower.followers}</span>
            <span>Following: {follower.following}</span>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Go to Github">
            <a
              href={follower.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PersonIcon />
            </a>
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              <img
                src={`http://ghchart.rshah.org/${follower.login}`}
                width="470"
                alt="User GitHub Activity Graph"
              />
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  card: {
    width: 500
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: teal[200]
  }
}));
