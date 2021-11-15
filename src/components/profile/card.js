import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 310,
    margin: 'auto',
    boxShadow: 'none',
    borderRadius: "20px",
  },
  content: {
    textAlign:"center"
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
}));

export const ItemCard = React.memo(function ItemCard(props) {
  const styles = useStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  const shadowStyles = useBouncyShadowStyles();
  return (
    <Link to={`/id/${props.num}`}  style={{ textDecoration: 'none' }} >
      <Card className={cx(styles.root, shadowStyles.root)}>
        <CardContent className={styles.content}>
          <TextInfoContent classes={textCardContentStyles}   heading={props.name} />
        </CardContent>
      </Card>
    </Link>
  );
});

export default ItemCard;