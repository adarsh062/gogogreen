import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

const makeCommits = async (n) => {
  console.log(`Starting ${n} backdated commits...`);

  for (let i = 1; i <= n; i++) {
    // Pichle 1 saal (52 weeks) me se random week aur random day
    const x = random.int(0, 51);
    const y = random.int(0, 6);
    const date = moment()
      .subtract(1, "y")
      .add(1, "d")
      .add(x, "w")
      .add(y, "d")
      .format();

    const data = {
      date: date,
    };

    // data.json update karo aur backdated commit karo
    await jsonfile.writeFile(path, data);
    await git.add([path]);
    await git.commit(date, { "--date": date });

    console.log(`[${i}/${n}] Commit created for: ${date}`);
  }

  console.log("Pushing all commits to GitHub...");
  await git.push();
  console.log("Done! Sabhi 20 commits GitHub par push ho chuke hain.");
};

// Yahan number set kar sakte hain (abhi 20 commits set hai)
makeCommits(20);
