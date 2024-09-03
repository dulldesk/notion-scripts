// gen.py to generate
// theoretically this should be a JSON
const DATA = {
  cs349: [
    ['A0', '2024-09-13'],
    ['A1', '2024-10-04'],
    ['Midterm', '2024-10-23T19:00:00-04:00','2024-10-23T20:50:00-04:00'],
    ['A2', '2024-10-25'],
    ['A3', '2024-11-08'],
    ['A4', '2024-11-29'],
  ],
  cs350: [
    ['Midterm', '2024-10-30T19:00:00-04:00','2024-10-30T20:50:00-04:00'],
  ],
};

const TAG_COLORS = {
  cs349: "purple",
  cs350: "red",
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
