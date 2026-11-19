import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

const createStreakCommits = async () => {
  const commitDates = [];

  // 1. Continuous 40-Day Unbroken Streak (10 Aug 2026 se 18 Sep 2026 tak lagatar)
  const streakStart = moment("2026-08-10");
  for (let i = 0; i < 40; i++) {
    const curDate = moment(streakStart).add(i, "days");
    const hour = random.int(10, 20);
    const minute = random.int(0, 59);
    const second = random.int(0, 59);
    curDate.set({ hour, minute, second });
    commitDates.push(curDate.format());
  }

  // 2. October ke empty spots fill karne ke liye extra dates
  const extraOctDays = [1, 3, 5, 12, 14, 21, 24, 28];
  for (const d of extraOctDays) {
    const curDate = moment(`2026-10-${String(d).padStart(2, "0")}`);
    const hour = random.int(10, 20);
    const minute = random.int(0, 59);
    const second = random.int(0, 59);
    curDate.set({ hour, minute, second });
    commitDates.push(curDate.format());
  }

  console.log(`Starting ${commitDates.length} streak commits (Aug, Sep, Oct)...`);

  for (let i = 0; i < commitDates.length; i++) {
    const date = commitDates[i];
    const data = { date };

    await jsonfile.writeFile(path, data);
    await git.add([path]);
    await git.commit(date, { "--date": date });

    console.log(`[${i + 1}/${commitDates.length}] Commit created: ${date}`);
  }

  console.log("Pushing all streak commits to GitHub...");
  await git.push();
  console.log("Done! Sabhi streak commits GitHub par push ho chuke hain.");
};

createStreakCommits();
