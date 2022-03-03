import React from "react";

const Avatar = ({ text }) => {
  return (
    <div
      style={{
        cursor: "help",
        display: "inline-block",
        textAlign: "center",
        height: "20px",
        width: "20px",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: "13px",
        backgroundColor: text == "w" ? "#13cf00" : text == "l" ? "red" : "gray",
        color: "white",
        borderRadius: "50px",
        padding: "6px 6px",
        marginRight: "7px",
      }}
    >
      {text}
    </div>
  );
};

export default Avatar;
