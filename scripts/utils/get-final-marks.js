function getFinalMark(totalMarks, obtainedMarks, submittedAt) {
  const maxScale = submittedAt;
  const ratio = maxScale / totalMarks;
  return Math.ceil(obtainedMarks * ratio);
}