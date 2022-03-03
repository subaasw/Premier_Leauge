import React from "react";
import ReactDom from "react-dom";
import Avatar from "../WIDGETS/Avatar";
import "./style.css";

function Club_INTRO({ open, infoData, click }) {
  if (!open) return null;
  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "10px",
  };
  const divStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb(0,0,0,.3",
    zIndex: 1000,
  };

  return ReactDom.createPortal(
    <div style={divStyle}>
      <div style={style}>
        <div className="close">
          <i onClick={click} className="fa fa-times" aria-hidden="true"></i>
        </div>

        <div
          className="intro"
          style={{
            display: "flex",
            marginRight: "20px",
            marginBottom: "8px",
          }}
        >
          <img
            height={50}
            width={50}
            src={`assets/clubs-logo/${infoData.code}.png`}
          />

          <div
            style={{
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4>{`${infoData.name} FC`}</h4>
            <p>{infoData.country}</p>
          </div>
        </div>
        <h5
          style={{
            display: "block",
            borderTop: "1px solid gray",
            fontSize: "13.5px",
            opacity: "0.6",
            fontWeight: "normal",
            padding: "10px 10px 0px 0px",
            textTransform: "uppercase",
          }}
        >
          Last 5 Matches:
        </h5>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
          }}
        >
          {infoData.form.map((curElem, index) => {
            return <Avatar key={index} text={curElem} />;
          })}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Club_INTRO;
