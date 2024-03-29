import axios from "axios";
import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";

const Category = () => {
  const state = useContext(GlobalState);
  const [categories, setCategories] = state.categoryAPI.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token
  const [callback, setCallback] = state.categoryAPI.callback
  const [onEdit, setOnEdit] = useState(false)
  const [id, setID] = useState("")

  const createCategory = async (e) => {
    e.preventDefault()
    try {
        if(onEdit){
            const res = await axios.put(`/api/category/${id}`, {name: category}, {
                headers: {Authorization: token}
            })
    
            alert(res.data.msg)
        } else {
            const res = await axios.post('/api/category', {name: category}, {
                headers: {Authorization: token}
            })
    
            alert(res.data)
        }
        setOnEdit(false)
        setCategory('')
        setCallback(!callback)
    } catch (err) {
        alert(err.response.data.msg)
    }
  }

  const editCategory = async (id, name) => {
    setID(id)
    setCategory(name)
    setOnEdit(true)
  }

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: {Authorization: token}
    })

      alert(res.data.msg)
      setCallback(!callback)
    } catch (err) {
        alert(err.response.data.msg)
    }
  }

  return (
    <div className="categories">
      <form action="" onSubmit={createCategory}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">{onEdit ? "Update" : "Save" }</button>
      </form>

      <div className="col">
        {categories.map((category) => {
          return (
            <div className="row" key={category._id}>
              <p>{category.name}</p>
              <div>
                <button className="btnEdit" onClick={() => editCategory(category._id, category.name)}>Chỉnh sửa</button>
                <button className="btnDelete" onClick={() => deleteCategory(category._id)}>Xóa</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
