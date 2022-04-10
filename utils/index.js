export const getRandomPixels = (w = 2, h = 2) => {
  const canvas = document.createElement("canvas");

  const pixelsCount = w * h;

  canvas.setAttribute("width", w);
  canvas.setAttribute("height", h);

  const ctx = canvas.getContext("2d");

  const max = 220;
  const min = 50;

  let j = 0,
    k = 0;

  for (let i = 0; i < pixelsCount; i++) {
    var r = Math.floor(Math.random() * (max - min + 1)) + min;
    var g = Math.floor(Math.random() * (max - min + 1)) + min;
    var b = Math.floor(Math.random() * (max - min + 1)) + min;

    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";

    if (i !== 0 && i % w === 0) {
      j = 0;
      k++;
    } else if (i !== 0) {
      j++;
    }

    ctx.fillRect(j, k, 1, 1);
  }

  return canvas.toDataURL();
};
