export function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function randomNumberInRangeExcept(min, max, except) {
  for(let i = 0; i < 10; i++) {
    const randomNumber = randomNumberInRange(min, max);
    if (randomNumber !== except) {
      return randomNumber;
    }
  }
  return min === except ? max : min;
};