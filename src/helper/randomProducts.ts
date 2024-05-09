
export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {

    // random number j
    const j = Math.floor(Math.random() * (i + 1));

    // swap the position in the array
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
}