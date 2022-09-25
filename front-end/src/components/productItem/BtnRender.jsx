import React from "react";
import { Link } from "react-router-dom";

const BtnRender = ({product}) => {
  return (
    <div className="row_btn">
      <Link id="btn_buy" to="#!">
        Thêm <br /> giỏ hàng
      </Link>
      <Link id="btn_view" to={`/detail/${product._id}`}>
        Xem <br /> chi tiết
      </Link>
    </div>
  );
};

export default BtnRender;
