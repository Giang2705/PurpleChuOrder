import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GlobalState } from "../../GlobalState";

function FilterOrder() {
  const state = useContext(GlobalState);
  const [methods, setMethods] = useState([]);
  const [payments] = state.paymentAPI.payments;
  const [method, setMethod] = state.paymentAPI.method;
  const [statuses, setStatuses] = useState([])
  const [status, setStatus] = state.paymentAPI.status;
  const [sort, setSort] = state.paymentAPI.sort;
  const [search, setSearch] = state.paymentAPI.search;

  const getMethods = () => {
    payments.map((item, index) => {
        methods.push(item.method);
    });
    setMethods(methods)
  }

  const getStatus = () => {
    payments.map((item, index) => {
        statuses.push(item.status);
    });
    setStatuses(statuses)
  }

  const handleMethod = (e) => {
    setMethod(e.target.value);
    setSearch("");
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    setSearch("");
  };

  useEffect(() => {
    getMethods()
    getStatus()
  }, [])

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters: </span>
        <select name="method" value={method} onChange={handleMethod}>
          <option value="">All Methods</option>
          {methods.map((method) => (
            <option value={"method=" + method} key={method}>
              {method}
            </option>
          ))}
        </select>

        <select name="status" value={status} onChange={handleStatus}>
          <option value="">All Status</option>
          {statuses.map((status) => (
            <option value={"status=" + status} key={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        value={search}
        placeholder="Enter your search!"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      <div className="row sort">
        <span>Sort By: </span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          {/* <option value="sort=-sold">Best sales</option> */}
          <option value="sort=-amount">Price: Hight-Low</option>
          <option value="sort=amount">Price: Low-Hight</option>
        </select>
      </div>
    </div>
  );
}

export default FilterOrder;
