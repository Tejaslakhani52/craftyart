import React from "react";

export default function LinkComponent({ text, link }: any) {
  return (
    <span
      style={{
        borderBottom: "1px solid blue",
        color: "blue",
        cursor: "pointer",
      }}
      onClick={() => window.open(`${link}`)}
    >
      {text}
    </span>
  );
}
