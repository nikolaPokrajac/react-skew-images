import classes from './GridItem.module.scss';

const GridItem = ({ url, description }) => {
  return (
    <div className={classes['grid-item']}>
      <img className={classes['grid-item-media']} src={url} alt='' />
      <p>{description}</p>
    </div>
  );
};

export default GridItem;
