import React from "react";
import { FixedSizeList as List } from "react-window";
import { getFormattedStringDate } from "../../../utils/helpers";
import classes from "./PromotionsTable.scss";
import PromotionsDropdownActions from "./PromotionsDropdownActions/PromotionsDropdownActions";

const PromotionsTable = (props) => {
  const { promotionsList = [], itemHeight = 40, onScrollEvent } = props;

  const Row = ({ index, promotion, style }) => (
    <div className={classes.tr} key={index + promotion.id} style={style}>
      <div className={classes.td}>{promotion.name}</div>
      <div className={classes.td}>{promotion.type}</div>
      <div className={classes.td}>
        {getFormattedStringDate(promotion.start_date)}
      </div>
      <div className={classes.td}>
        {getFormattedStringDate(promotion.end_date)}
      </div>
      <div className={classes.td}>{promotion.user_group_name}</div>
      <PromotionsDropdownActions promotion={promotion} />
    </div>
  );

  return (
    <div className={classes.table}>
      <div className={classes.thead}>
        <div className={classes.tr}>
          <div className={classes.th}>Name</div>
          <div className={classes.th}>Type</div>
          <div className={classes.th}>Start Date</div>
          <div className={classes.th}>End Date</div>
          <div className={classes.th}>User Group Name</div>
          <div className={classes.th}>Actions</div>
        </div>
      </div>
      <List
        className={classes.tbody}
        itemData={promotionsList}
        height={500}
        itemCount={promotionsList.length}
        onScroll={onScrollEvent}
        itemSize={itemHeight}
      >
        {(props) => {
          const promotion = props.data[props.index];
          return <Row {...props} promotion={promotion} />;
        }}
      </List>
    </div>
  );
};

export default PromotionsTable;
