import fs from "fs";
import readline from "readline";
import path from "path";

const basicsPath = path.join(process.cwd(), "title.basics.tsv");
const ratingsPath = path.join(process.cwd(), "title.ratings.tsv");

const MIN_VOTES = 25000;

const generateImdbTop250 = async () => {
  const ratingsMap = new Map();

  const ratingsStream = fs.createReadStream(ratingsPath);
  const ratingsRL = readline.createInterface({
    input: ratingsStream,
    crlfDelay: Infinity
  });

  let skipHeader = true;

  for await (const line of ratingsRL) {
    if (skipHeader) {
      skipHeader = false;
      continue;
    }

    const [tconst, rating, votes] = line.split("\t");
    if (Number(votes) >= MIN_VOTES) {
      ratingsMap.set(tconst, Number(rating));
    }
  }

  const movies = [];

  const basicsStream = fs.createReadStream(basicsPath);
  const basicsRL = readline.createInterface({
    input: basicsStream,
    crlfDelay: Infinity
  });

  skipHeader = true;

  for await (const line of basicsRL) {
    if (skipHeader) {
      skipHeader = false;
      continue;
    }

    const [
      tconst,
      titleType,
      primaryTitle,
      originalTitle,
      isAdult,
      startYear,
      endYear,
      runtimeMinutes,
      genres
    ] = line.split("\t");

    if (
      titleType === "movie" &&
      isAdult === "0" &&
      ratingsMap.has(tconst)
    ) {
      movies.push({
        imdbId: tconst,
        title: primaryTitle,
        year: startYear,
        runtime: runtimeMinutes,
        genres: genres?.split(",") || [],
        rating: ratingsMap.get(tconst)
      });
    }
  }

  movies.sort((a, b) => b.rating - a.rating);

  const top250 = movies.slice(0, 250);

  fs.writeFileSync(
    "imdbTop250.json",
    JSON.stringify(top250, null, 2)
  );

  console.log("✅ IMDb Top 250 generated correctly");
};

generateImdbTop250();
