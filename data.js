// gen.py to generate
// theoretically this should be a JSON
const DATA = {
  cs341: [
    ['A1', '2024-09-24'],
    ['A2', '2024-10-11'],
    ['Midterm', '2024-10-28T16:30:00-04:00','2024-10-28T17:50:00-04:00'],
    ['A3', '2024-11-12'],
    ['A4', '2024-12-03'],
  ],
  cs350: [
    ['Midterm', '2024-10-30T19:00:00-04:00','2024-10-30T20:50:00-04:00'],
  ],
};

const TAG_COLORS = {
  cs350: "red",
  cs341: "orange",
}
// blue
// brown
// default
// gray
// green
// orange
// pink
// purple
// red
// yellow

module.exports = {
  DATA,
  TAG_COLORS,
}
