import PropTypes from "prop-types";
import React, { useReducer } from "react";
import "./style.css";

export const Group = ({ property1, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`group ${state.property1} ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onClick={() => {
        dispatch("click");
      }}
    >
      {state.property1 === "default" && (
        <div className="default-content">
          <div className="overlap-group">
            <div className="div">
              <div className="rectangle" />
              <div className="rectangle-2" />
            </div>
            <div className="div-2">
              <div className="rectangle" />
              <div className="rectangle-2" />
            </div>
          </div>
          <div className="text-wrapper-2">Select Category</div>
        </div>
      )}

      {state.property1 === "variant-2" && (
        <div className="variant-2-content">
          {/* Content for variant-2 state */}
        </div>
      )}

      {state.property1 === "category" && (
        <div className="category-content">
          <div className="category-item" onClick={() => dispatch("select_category")}>Faculty</div>
          <div className="category-item" onClick={() => dispatch("select_category")}>Registrar</div>
          <div className="category-item" onClick={() => dispatch("select_category")}>Proware Specialist</div>
          <div className="category-item" onClick={() => dispatch("select_category")}>School Administrator</div>
          <div className="category-item" onClick={() => dispatch("select_category")}>Discipline Officer</div>
          <div className="select-category" onClick={() => dispatch("select_default")}>
            Select Category
          </div>
        </div>
      )}
    </div>
  );
};

function reducer(state, action) {
  switch (state.property1) {
    case "default":
      switch (action) {
        case "mouse_enter":
          return {
            ...state,
            property1: "variant-2",
          };
        default:
          return state;
      }

    case "variant-2":
      switch (action) {
        case "mouse_leave":
          return {
            ...state,
            property1: "default",
          };
        case "click":
          return {
            ...state,
            property1: "category",
          };
        default:
          return state;
      }

    case "category":
      switch (action) {
        case "select_default":
          return {
            ...state,
            property1: "default",
          };
        default:
          return state;
      }

    default:
      return state;
  }
}

Group.propTypes = {
  property1: PropTypes.oneOf(["category", "variant-2", "default"]),
};

export default Group;
