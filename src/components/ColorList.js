import React, { useState } from "react";
import EditMenu from "./EditMenu";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};


const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log("res in put request: ", res); 
 

      updateColors(
        colors.map((color) => {
          if (color.id === colorToEdit.id) {
          //   return res.data; //  single source of truth
            return res.data;
          } else {
            return color;
          }
        })
      );
      
      setColorToEdit(initialColor);// resets form state
      setEditing(false); // reset state to not editing
    })
    .catch(err => console.log(err));

  };

  const deleteColor = Deletecolor => {

    axiosWithAuth().delete(`http://localhost:5000/api/colors/${Deletecolor.id}`)
    .then(res => {
      console.log("response from deleteColor: ", res.data);

      const updatedColors = colors.filter(color => {
        return color.id !== Deletecolor.id
      });
      
      updateColors(updatedColors);    

    })
    .catch(err => console.log("error:", err))

  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.