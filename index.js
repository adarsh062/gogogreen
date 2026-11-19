import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

// Target months: Nov, Dec, Jan, Feb, Mar
const targetMonths = [
  { year: 2025, month: 11, days: 30 }, // Nov 2025
  { year: 2025, month: 12, days: 31 }, // Dec 2025
  { year: 2026, month: 1,  days: 31 }, // Jan 2026
  { year: 2026, month: 2,  days: 28 }, // Feb 2026
  { year: 2026, month: 3,  days: 31 }, // Mar 2026
  { year: 2026, month: 11, days: 19 }, // Nov 2026 (current date tak)
];

const makeTargetedCommits = async (n) => {
  console.log(`Starting ${n} targeted commits for Nov, Dec, Jan, Feb, Mar...`);

  for (let i = 1; i <= n; i++) {
    const target = targetMonths[random.int(0, targetMonths.length - 1)];
    const day = random.int(1, target.days);
    const hour = random.int(9, 21);
    const minute = random.int(0, 59);
    const second = random.int(0, 59);

    const dateStr = `${target.year}-${String(target.month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
    const date = moment(dateStr).format();

    const data = {
      date: date,
    };

    await jsonfile.writeFile(path, data);
    await git.add([path]);
    await git.commit(date, { "--date": date });

    console.log(`[${i}/${n}] Commit created: ${date}`);
  }

  console.log("Pushing all commits to GitHub...");
  await git.push();
  console.log("Done! Sabhi commits GitHub par push ho chuke hain.");
};

// 40 commits generate karein
makeTargetedCommits(40);
