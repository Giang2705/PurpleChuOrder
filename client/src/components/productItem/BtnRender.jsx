import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

const BtnRender = ({product}) => {
  const state = useContext(GlobalState)

  const [isAdmin] = state.userAPI.isAdmin
  const addCart = state.userAPI.addCart

  return (
    <div className="row_btn">
      <Link id="btn_view" to={`/detail/${product._id}`}>
        Xem chi tiết
      </Link>
    </div>
  );
};

export default BtnRender;
