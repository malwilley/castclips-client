import React from 'react';
import { css } from 'emotion';
import { clickable } from 'src/styles';
import { Link } from 'react-router-dom';

type PodcastLinkProps = {
  id: string;
  thumbnail: string;
  title: string;
};

const styles = {
  main: css({
    '&:hover': {
      textDecoration: 'underline',
    },
    display: 'inline',
    marginLeft: 6,
    verticalAlign: 'middle',
  }),
  container: css({
    display: 'flex',
    alignItems: 'center',
  }),
  thumbnail: css({
    height: 20,
    width: 20,
    borderRadius: 4,
    marginRight: 4,
    display: 'inline',
    verticalAlign: 'middle',
  }),
};

const PodcastLink: React.FC<PodcastLinkProps> = ({ id, thumbnail, title }) => (
  <Link className={styles.main} to={`/podcast/${id}`}>
    <img className={styles.thumbnail} src={thumbnail} />
    {title}
  </Link>
);

export default PodcastLink;
