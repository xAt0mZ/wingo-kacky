export default class Map {
  constructor(id, finished, date, time, clip) {
    Object.assign(this, { id, finished, date, time, clip });
  }
}

export function extractMaps(data) {
  return data.valueRanges.map((r) =>
    r.values.map((v) => {
      const [id, finished, date, time, clipCell] = v;
      if (!finished) {
        return new Map(id, finished);
      }
      let clip = clipCell.match(/(https:\/\/clips\.twitch\.tv\/)(.+)";/);
      if (clip) {
        clip = `${clip[1]}embed?clip=${clip[2]}&parent=${process.env.REACT_APP_IFRAME_PARENT}`;
      } else {
        clip = clipCell.match(/(https:\/\/streamable\.com\/)(.+)";/);
        clip = `${clip[1]}o/${clip[2]}`;
      }
      return new Map(id, finished, date, time, clip)
    })
  ).flat();
}