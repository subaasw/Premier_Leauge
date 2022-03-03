import React from "react";
import Avatar from "../Avatar";

function TableData(currentApiData, POPUP_Name, sortTerm, isMobile) {
  let total = currentApiData.length;
  return currentApiData.map((club, index) => {
    return (
      <tr key={index}>
        <td
          className={
            sortTerm === "desc" && total === 20
              ? index + 1 < 5
                ? "top4"
                : index + 1 > 17
                ? "last3"
                : ""
              : ""
          }
          style={{
            borderRight:
              sortTerm === "asc" && total === 20
                ? index + 1 < 4
                  ? "3px solid red"
                  : index + 1 > 16
                  ? "3px solid green"
                  : ""
                : "",
          }}
        >
          {index + 1}
        </td>
        <td>
          <div
            onClick={() =>
              POPUP_Name(club.clubname, club.code, club.country, club.form)
            }
            className="team-name"
            style={{
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <img
              height={25}
              width={25}
              src={`./assets/clubs-logo/${club.code}.png`}
              alt="Club"
            />
            <p style={{ marginLeft: "20px" }} className="team-name">
              {isMobile ? club.code : club.clubname}
            </p>
          </div>
        </td>
        <td>{club.played}</td>
        <td>{club.won}</td>
        <td>{club.drawn}</td>
        <td>{club.lost}</td>
        <td>{club.goals_for}</td>
        <td>{club.goals_against}</td>
        <td>{club.goals_diff}</td>
        <td>{club.points}</td>
        <td>
          {club.form.map((value, index) => {
            return <Avatar key={index} text={value} />;
          })}
        </td>
      </tr>
    );
  });
}

export default TableData;
