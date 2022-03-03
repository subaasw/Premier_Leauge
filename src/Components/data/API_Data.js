import React from "react";

const Calculatuion = (name, club_Code,country, Premier_Leauge) => {
  let played = 0;
  let won = 0;
  let lost = 0;
  let drawn = 0;
  let goals_against = 0;
  let goals_for = 0;
  let form = [];

  try {
    Premier_Leauge.rounds.map((round, index) => {
      played++;
      if (index >= 33) {
        round.matches.map((curElem, index) => {
          const score = curElem.score.ft;

          if (curElem.team1 === name) {
            if (score[0] > score[1]) {
              form.push("w");
            } else if (score[1] > score[0]) {
              form.push("l");
            } else {
              form.push("d");
            }
          } else if (curElem.team2 === name) {
            if (score[0] < score[1]) {
              form.push("w");
            } else if (score[1] < score[0]) {
              form.push("l");
            } else {
              form.push("d");
            }
          }
        });
      }

      round.matches.map((curElem, index) => {
        const score = curElem.score.ft;

        if (curElem.team1 === name) {
          goals_for = goals_for + score[0];
          goals_against = goals_against + score[1];

          if (score[0] > score[1]) {
            won++;
          } else if (score[1] > score[0]) {
            lost++;
          } else {
            drawn++;
          }
        } else if (curElem.team2 === name) {
          if (score[1] > score[0]) {
            won++;
          } else if (score[0] > score[1]) {
            lost++;
          } else {
            drawn++;
          }
          goals_for = goals_for + score[1];
          goals_against = goals_against + score[0];
        }
      });
    });

    return {
      clubname: name.replace("FC", ""),
      code: club_Code,
      country:country,
      played: played,
      won: won,
      drawn: drawn,
      lost: lost,
      goals_for: goals_for,
      goals_against: goals_against,
      goals_diff: goals_for - goals_against,
      points: won * 3 + drawn * 1,
      form: form,
    };
  } catch (error) {}
};

export default Calculatuion;
