import React, { useState, useEffect } from "react";
import "./CSS/Home.css";
import SearchInput from "./WIDGETS/SearchInput";
import Calculatuion from "./data/API_Data";
import Club_INTRO from "./CLUB_INTRO/Club_INTRO";
import TableData from "./WIDGETS/Table_Body-DATA/TableData";

function Home() {
  // Media Query
  const [isMobile, setIsMobile] = useState("");

  // To fetch api data
  const [clubsData, fetchClubsData] = useState([]);
  const [totalData, fetchTotalData] = useState([]);

  // After calculate result
  const [apiData, setApiData] = useState([]);

  // For PopUp modal or portal
  const [isOpen, setIsOpen] = useState(false);
  const [popUp_data, setPopUpData] = useState({});

  // Sorting list
  const [sortTerm, setSortTerm] = useState("desc");

  // Searching and filtering result
  const [searchTerm, setSearchTerm] = useState("");
  const [filterApiResults, setFilterApiResults] = useState([]);

  // left and right padding
  const marginStyle = {
    marginLeft: "10px",
    marginRight: "30px",
  };

  // Divider
  const HorizDivider = () => {
    return (
      <div
        style={{
          width: "100vw",
          height: "1px",
          backgroundColor: "gray",
        }}
      />
    );
  };

  // fetch api   i.e en.1.clubs.json and en.1.json
  const ClubDataFetch = (year) => {
    const getClubData = (callBackTotalData) => {
      fetch(
        `https://raw.githubusercontent.com/openfootball/football.json/master/${year}/en.1.clubs.json`
      )
        .then((res) => res.json())
        .then((res) => {
          fetchClubsData(res.clubs);
        });
      callBackTotalData();
    };

    const getTotalData = () => {
      fetch(
        `https://raw.githubusercontent.com/openfootball/football.json/master/${year}/en.1.json`
      )
        .then((res) => res.json())
        .then((res) => {
          fetchTotalData(res);
        });
    };
    getClubData(getTotalData);
  };

  // Calculating Data based on teams name
  const Calc = () => {
    const sData = [];
    if (
      clubsData === undefined ||
      (clubsData.length == 0 && totalData === undefined) ||
      totalData.length == 0
    ) {
    } else {
      clubsData.map((club, index) => {
        try {
          sData.push(
            Calculatuion(club.name, club.code, club.country, totalData)
          );
        } catch (error) {}
      });
      setApiData(sData);
    }
  };

  if (sortTerm === "desc") {
    apiData.sort((first, second) => {
      return second.points - first.points;
    });
  }

  // sorting Function
  const OrderBy = (text) => {
    setSortTerm(text);
    if (sortTerm === "desc") {
      apiData.sort((first, second) => {
        return first.points - second.points;
      });
    } else {
      apiData.sort((first, second) => {
        return second.points - first.points;
      });
    }
  };

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width:656px)").matches);
  });

  useEffect(() => {
    ClubDataFetch("2017-18");
  }, []);

  useEffect(() => {
    Calc();
  }, [totalData]);

  // Fetching  Seasons
  const seasonFilter = (text) => {
    ClubDataFetch(text);
    Calc();
  };

  // passing some data and calling popup dialog or portal
  const POPUP_Name = (name, code, country, form) => {
    setIsOpen(true);
    setPopUpData({
      name,
      code,
      country,
      form,
    });
  };

  // Filtering api data based on input
  const filterInput = (input) => {
    setSearchTerm(input);
    if (searchTerm !== "") {
      const newApiList = apiData.filter((CurElem) => {
        return Object.values([CurElem.clubname, CurElem.code])
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setFilterApiResults(newApiList);
    } else {
      setFilterApiResults(apiData);
    }
  };

  useEffect(() => {
    filterInput(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    OrderBy(sortTerm);
  }, [sortTerm]);

  return (
    <>
      <header style={marginStyle}>
        <img
          height={60}
          width={200}
          src="./assets/logo.png"
          alt="Premier league logo"
        />
        <ul>
          <li>
            <SearchInput
              value={searchTerm}
              onChange={(e) => filterInput(e.target.value)}
            />
          </li>
          <li>
            <select
              onChange={(e) => seasonFilter(e.target.value)}
              className="options"
              defaultValue="2017/18"
            >
              <option className="txt_option" disabled>
                Select Season
              </option>
              <option value="2017-18">2017/2018</option>
              <option value="2016-17">2016/2017</option>
              <option value="2015-16">2015/2016</option>
              <option value="2014-15">2014/2015</option>
              <option value="2013-14">2013/2014</option>
            </select>
          </li>
          <li>
            <select
              onChange={(e) => OrderBy(e.target.value)}
              className="options"
              defaultValue="desc"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </li>
        </ul>
      </header>

      <HorizDivider />
      <table>
        <thead>
          <tr className="head_row">
            <th>{isMobile ? "PN" : "Position"}</th>
            <th>{isMobile ? "name" : "Club Name"}</th>
            <th>{isMobile ? "mp" : "Played"}</th>
            <th>{isMobile ? "w" : "Won"}</th>
            <th>{isMobile ? "d" : "Drawn"}</th>
            <th>{isMobile ? "l" : "lost"}</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Points</th>
            <th>last 5</th>
          </tr>
        </thead>
        <tbody>
          {filterApiResults.length < 1
            ? TableData(apiData, POPUP_Name, sortTerm, isMobile)
            : TableData(filterApiResults, POPUP_Name, sortTerm, isMobile)}
        </tbody>
      </table>
      <Club_INTRO
        infoData={popUp_data}
        open={isOpen}
        click={() => setIsOpen(false)}
      />
    </>
  );
}

export default Home;
