import classNames from "classnames";
import React from "react";

import { useConfig } from "../../context/ConfigContext/ConfigContext";
import { Item as mItem } from "../../model";
import Flag from "../Flag/Flag";
import Link from "../Link/Link";
import "./item.scss";

type Props = {
  item: mItem;
  noLeadingBorder?: boolean;
  active?: boolean;
  style?: React.CSSProperties;
  greyedOut?: boolean;
};

const Item: React.FC<Props> = ({
  item,
  noLeadingBorder = false,
  active = false,
  style = {},
  greyedOut = false,
}) => {
  const { deleteItemFromData, customMode } = useConfig();

  function handleDelete() {
    if (!window.location.href.includes(item.name)) {
      deleteItemFromData(item.name);
    } else {
      console.log("Cannot delete item from this URL.");
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Link
        className={classNames("item", {
          "item--no-leading-border": noLeadingBorder,
          "is-active": active,
        })}
        pageName={`${item.quadrant}/${item.name}`}
        style={style}
      >
        <div
          className={classNames("item__title", {
            "greyed-out": greyedOut,
          })}
        >
          {item.title}
          <Flag item={item} />
        </div>
        {item.info && <div className="item__info">{item.info}</div>}
      </Link>
      {customMode && (
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default Item;
