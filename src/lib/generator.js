export default async function (key) {
  const colorHash = await crypto.subtle.digest(
    "sha-256",
    new TextEncoder().encode(key)
  );

  const pointClone = [...Array.from(new Uint8Array(colorHash))];
  const colorsRaw = pointClone.slice(0, 24);
  const curve = pointClone.slice(24, 32);

  const sequenceHash = await crypto.subtle.digest(
    "sha-512",
    new Uint8Array(colorsRaw).buffer
  );
  const sequence = Array.from(new Uint8Array(sequenceHash));

  const grid = [];
  const colors = [];
  let k = 0;
  for (let i = 0; i < 8; i++) {
    grid[i] = []
    colors.push(colorsRaw.splice(0, 3));
    for (let j = 0; j < 8; j++) {
      grid[i][j] = sequence[k];
      k++;
    }
  }

  return {
    grid,
    colors,
    curve,
    key,
  }
}