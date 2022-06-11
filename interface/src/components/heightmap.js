// code by loktar00 on Github: https://github.com/loktar00/Javascript-Canvas-Terrain-Generator
// license: MIT
// rewritten to functional component by Tcumulus

const heightmap = (mapDimension = 16, unitSize = 1, roughness = 8, tile = false) => {
  
  // generate empty map with given dimenensions
  let map = Array(mapDimension + 1).fill(0).map(el => new Array(mapDimension + 1).fill(0).map(el => 0));

  // Random function to offset the center
  const displace = (amount) => {
    const max = amount / ( mapDimension * 2 ) * roughness;
    return (Math.random() - 0.5) * max;
  }

  // Normalize the value to make sure its within bounds
  const normalize = (value) => {
    return Math.max(Math.min(value, 1), 0);
  }

  const midpointDisplacment = (plot) => {
    const subPlot = plot / 2;

    if (subPlot > unitSize){
      for (let i = subPlot; i <= mapDimension; i += subPlot) {
        for (let j = subPlot; j <= mapDimension; j += subPlot) {
          const x = i - (subPlot / 2);
          const y = j - (subPlot / 2);

          const topLeft = map[i - subPlot][j - subPlot];
          const topRight = map[i][j - subPlot];
          const bottomLeft = map[i - subPlot][j];
          const bottomRight = map[i][j];

          // Center
          map[x][y] = (topLeft + topRight + bottomLeft + bottomRight) / 4 + displace(plot);
          map[x][y] = normalize(map[x][y]);

          const center = map[x][y];

          // Top
          const top = topLeft + topRight + center;

          if (j > subPlot) {
            map[x][j - subPlot] = (top + map[x][j - plot + (subPlot / 2)]) / 4 + displace(plot);
          } else {
            map[x][j - subPlot] = top / 3 + displace(plot);
          }

          map[x][j - subPlot] = normalize(map[x][j - subPlot]);

          // Bottom
          const bottom = bottomLeft + bottomRight + center;

          if (j < mapDimension) {
            map[x][j] = (bottom + map[x][j + (subPlot / 2)]) / 4 + displace(plot);
          } else {
            map[x][j] = bottom / 3 + displace(plot);
          }

          map[x][j] = normalize(map[x][j]);

          //Right
          const right = topRight + bottomRight + center;

          if(i < mapDimension){
            map[i][y] = (right + map[i + (subPlot / 2)][y]) / 4 + displace(plot);
          } else {
            map[i][y] = right / 3 + displace(plot);
          }

          map[i][y] = normalize(map[i][y]);

          // Left
          const left = topLeft + bottomLeft + center;

          if(i > subPlot){
            map[i - subPlot][y] = (left + map[i - plot + (subPlot / 2)][y]) / 4 + displace(plot);
          } else {
            map[i - subPlot][y] = left / 3 + displace(plot);
          }

          map[i - subPlot][y] = normalize(map[i - subPlot][y]);
        }
      }

      midpointDisplacment(subPlot);
    }
  }

  // Starts off the map generation, seeds the first 4 corners
  const startDisplacement = () => {
    // top left
    map[0][0] = Math.random();

    // bottom left
    map[0][mapDimension] = Math.random();

    // top right
    map[mapDimension][0] = Math.random();

    // bottom right
    map[mapDimension][mapDimension] = Math.random();

    // Center
    map[mapDimension / 2][mapDimension / 2] = map[0][0] + map[0][mapDimension] + map[mapDimension][0] + map[mapDimension][mapDimension] / 4;
    map[mapDimension / 2][mapDimension / 2] = normalize(map[mapDimension / 2][mapDimension / 2]);

    midpointDisplacment(mapDimension);
  }

  startDisplacement();
  return map
}

export default heightmap