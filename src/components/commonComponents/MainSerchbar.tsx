import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchLoading } from "../../redux/reducer/dataReducer";

export default function MainSerchbar({ value, setValue }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      className="search_input d-flex align-items-center "
      onKeyPress={(e) => {
        const modifiedValue = value.replace(/ /g, "-");

        if (e.key === "Enter") {
          if (value) {
            navigate(`s/${modifiedValue}`);
          }

          dispatch(searchLoading(true));
        }
      }}
    >
      <input
        type="search"
        value={value}
        placeholder="Search thousands of templates"
        className="border-0 bg-transparent w-100 "
        onChange={(e) => setValue(e.target.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 24 24"
        onClick={() => {
          const modifiedValue = value.replace(/ /g, "-");
          value && navigate(`s/${modifiedValue}`);
          dispatch(searchLoading(true));
        }}
        style={{ cursor: "pointer" }}
      >
        <path
          fill="red"
          d="M15.2 16.34a7.5 7.5 0 1 1 1.38-1.45l4.2 4.2a1 1 0 1 1-1.42 1.41l-4.16-4.16zm-4.7.16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
        />
      </svg>
    </div>
  );
}
