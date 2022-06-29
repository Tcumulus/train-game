export const generateTrack = (points: number[][], grid: any[][]): any[][] => {
  const map = [...grid]
  for (let i = 1; i < points.length-1; i++) {
    const [point, point0, point1] = [points[i], points[i-1], points[i+1]]
    const [x0, x1, x2] = [point0[0], point[0], point1[0]]
    const [y0, y1, y2] = [point0[1], point[1], point1[1]]

    const dir0 = determineDir(x0, x1, y0, y1)
    const dir2 = determineDir(x2, x1, y2, y1)

    const gridcell = map[point[0]][point[1]]

    if ((dir0 == 1 && dir2 == 5) || (dir0 == 5 && dir2 == 1)) {
      gridcell.track.type = 1
      gridcell.track.rotation = 0
    } else if ((dir0 == 3 && dir2 == 7) || (dir0 == 7 && dir2 == 3)) {
      gridcell.track.type = 1
      gridcell.track.rotation = 90
    } 
    
    else if ((dir0 == 0 && dir2 == 4) || (dir0 == 4 && dir2 == 0)) {
      gridcell.track.type = 2
      gridcell.track.rotation = 0
    } else if ((dir0 == 2 && dir2 == 6) || (dir0 == 6 && dir2 == 2)) {
      gridcell.track.type = 2
      gridcell.track.rotation = 90
    } 
    
    else if ((dir0 == 1 && dir2 == 3) || (dir0 == 3 && dir2 == 1)) {
      gridcell.track.type = 3
      gridcell.track.rotation = 0
    } else if ((dir0 == 3 && dir2 == 5) || (dir0 == 5 && dir2 == 3)) {
      gridcell.track.type = 3
      gridcell.track.rotation = 90
    } else if ((dir0 == 5 && dir2 == 7) || (dir0 == 7 && dir2 == 5)) {
      gridcell.track.type = 3
      gridcell.track.rotation = 180
    } else if ((dir0 == 1 && dir2 == 7) || (dir0 == 7 && dir2 == 1)) {
      gridcell.track.type = 3
      gridcell.track.rotation = -90
    }
    
    else if ((dir0 == 1 && dir2 == 4) || (dir0 == 4 && dir2 == 1)) {
      gridcell.track.type = 4
      gridcell.track.rotation = 0
    } else if ((dir0 == 3 && dir2 == 6) || (dir0 == 6 && dir2 == 3)) {
      gridcell.track.type = 4
      gridcell.track.rotation = 90
    } else if ((dir0 == 0 && dir2 == 5) || (dir0 == 5 && dir2 == 0)) {
      gridcell.track.type = 4
      gridcell.track.rotation = 180
    } else if ((dir0 == 2 && dir2 == 7) || (dir0 == 7 && dir2 == 2)) {
      gridcell.track.type = 4
      gridcell.track.rotation = -90
    } 
    
    else if ((dir0 == 1 && dir2 == 6) || (dir0 == 6 && dir2 == 1)) {
      gridcell.track.type = 5
      gridcell.track.rotation = 0
    } else if ((dir0 == 0 && dir2 == 3) || (dir0 == 3 && dir2 == 0)) {
      gridcell.track.type = 5
      gridcell.track.rotation = 90
    } else if ((dir0 == 2 && dir2 == 5) || (dir0 == 5 && dir2 == 2)) {
      gridcell.track.type = 5
      gridcell.track.rotation = 180
    } else if ((dir0 == 4 && dir2 == 7) || (dir0 == 7 && dir2 == 4)) {
      gridcell.track.type = 5
      gridcell.track.rotation = -90
    }

    else if ((dir0 == 4 && dir2 == 6) || (dir0 == 6 && dir2 == 4)) {
      gridcell.track.type = 6
      gridcell.track.rotation = 0
    } else if ((dir0 == 0 && dir2 == 6) || (dir0 == 6 && dir2 == 0)) {
      gridcell.track.type = 6
      gridcell.track.rotation = 90
    } else if ((dir0 == 0 && dir2 == 2) || (dir0 == 2 && dir2 == 0)) {
      gridcell.track.type = 6
      gridcell.track.rotation = 180
    } else if ((dir0 == 2 && dir2 == 4) || (dir0 == 4 && dir2 == 2)) {
      gridcell.track.type = 6
      gridcell.track.rotation = -90
    }
  }
  return map
}

const determineDir = (x0: number, x1: number, y0: number, y1: number): number => {
  let dir: number
  if (x1-x0 === 0) {
    if (y1-y0 === 1) { dir = 1}
    else { dir = 5 }
  } else if (x1-x0 === 1) {
    if (y1-y0 === 1) { dir = 0 }
    else if (y1-y0 === 0) { dir = 7 }
    else { dir = 6 }
  } else {
    if (y1-y0 === 1) { dir = 2 }
    else if (y1-y0 === 0) { dir = 3 }
    else { dir = 4 }
  }
  return dir
}