<script>
  export let grid;
  export let colors;
  export let curve;

  function getColor(point) {
    const i = Math.floor((point * colors.length) / 256)
    return colors[i].join()
  }
  function getCurve(point) {
    const i = Math.floor((point * colors.length) / 256)
    return Math.floor((curve[i] / 255) * 17);
  }
</script>

<svg
  viewBox="0 0 256 256"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
{#each grid as rows, i}
  {#each rows as column, j (i + j)}
  <rect
    x="{i * 32}"
    y="{j * 32}"
    width="30"
    height="30"
    rx="{getCurve(column)}"
    style="fill: rgb({getColor(column)});  transition: all 0.4s;" 
  />
  {/each}
{/each}
</svg>