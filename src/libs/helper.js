export default function Helper() {
  const secondsToHm = function (d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);

    var hDisplay = h > 0 ? h + (h === 1 ? "h " : "h ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? "m" : "m") : "";
    return hDisplay + mDisplay;
  };
  return {
    secondsToHm,
  };
}
