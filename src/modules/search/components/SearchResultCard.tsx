import * as React from 'react';
import Card from '~/components/Card';
import { css } from 'emotion';
import { colors } from '~/styles';

type SearchResultCardProps = {
  title: string;
  description: string;
  thumbnail: string;
};

const styles = {
  main: css({
    padding: 20,
    marginBottom: 20,
  }),
  thumbnail: css({
    height: 150,
    width: 150,
    borderRadius: 8,
    marginRight: 20,
    marginBottom: 15,
    float: 'left',
  }),
  description: css({
    color: colors.gray700,
    margin: '20px 0 0 0',
  }),
};

const SearchResultCard: React.FC<SearchResultCardProps> = ({ title, description, thumbnail }) => (
  <Card className={styles.main}>
    <div>
      <img className={styles.thumbnail} src={thumbnail} />

      <h3>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  </Card>
);

export default SearchResultCard;
