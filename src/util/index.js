import _ from "lodash";
import moment from "moment-timezone";

export const sortArrayByProperty = (array, property, asc = false) => {
  return array.sort((a, b) => {
    a = _.get(a, property);
    b = _.get(b, property);

    if (a > b) {
      return asc ? 1 : -1;
    } else if (b > a) {
      return asc ? -1 : 1;
    } else {
      return 0;
    }
  });
};

export const getNameAbbr = name => {
  return `${name.split(" ")[0]} ${name.split(" ")[1][0]}.`;
};

export const defaultFilterMethod = (filter, row) =>
  String(row[filter.id])
    .toLowerCase()
    .includes(filter.value.toLowerCase());

export const generateReleaseText = (
  releaseDateUnix,
  moviePredictionCutoffDate
) => {
  const releaseDate = moment.unix(releaseDateUnix);
  const cutoffDate = moment.unix(moviePredictionCutoffDate).utc();

  const timeUnitsUntilCutoff = unit => {
    return cutoffDate.diff(moment.utc().add(14, "days"), unit);
  };

  const daysUntilCutoff = releaseDate.diff(cutoffDate, "days");
  const hoursUntilCutoff = timeUnitsUntilCutoff("hours");
  const minutesUntilCutoff = timeUnitsUntilCutoff("minutes");

  if (releaseDate.isBefore(cutoffDate)) {
    return `1 min`;
  }

  if (daysUntilCutoff > 0) {
    return `${daysUntilCutoff} day${daysUntilCutoff === 1 ? "" : "s"}`;
  }

  if (hoursUntilCutoff > 0) {
    return `${hoursUntilCutoff} hour${hoursUntilCutoff === 1 ? "" : "s"}`;
  }

  if (minutesUntilCutoff > 0) {
    return `${Math.round(minutesUntilCutoff)} min`;
  }

  return `1 min`;
};

export const prepSortGroupPredictions = (members, movie) => {
  return members
    .map(member => {
      let didPredict = member.votes
        ? member.votes[movie._id]
          ? member.votes[movie._id] > -1 && member.votes[movie._id] < 101
          : false
        : false;

      if (!didPredict) {
        return {
          ...member,
          ...{ prediction: null, didPredict, absDiff: null }
        };
      } else {
        let absDiff = Math.abs(member.votes[movie._id] - movie.rtScore);
        return {
          ...member,
          ...{ prediction: member.votes[movie._id], didPredict, absDiff }
        };
      }
    })
    .sort((a, b) => {
      a = !a.didPredict ? 1001 : a.prediction;
      b = !b.didPredict ? 1001 : b.prediction;

      if (a < b) return -1;
      if (b < a) return 1;
      return 0;
    });
};

export const makeGroupLabel = group => {
  if (group && group.members) {
    let text = ``;
    for (let member of group.members) {
      if (member.name !== "Movie Medium") {
        text = text + " " + member.name;
      }
    }

    return text;
  } else {
    return "";
  }
};

export const makeSeasonLabel = season => {
  let text = ``;
  for (let i = 0; i < season.movies.length; i++) {
    let title = season.movies[i].title;
    text = text + title;
    if (i < season.movies.length - 1) {
      text = text + ", ";
    }
  }
  return text;
};

export const emojiMap = [`🥇`, `🥈`, `🥉`];
