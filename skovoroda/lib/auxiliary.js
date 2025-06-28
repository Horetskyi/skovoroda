
export function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function randomNumberInRangeExcept(min, max, except, availableNumbers) {
  
  if (availableNumbers && availableNumbers.length) {
    availableNumbers = availableNumbers.filter(number => number >= min && number <= max);
    const exceptIndex = availableNumbers.indexOf(except);
    if (exceptIndex !== -1) {
      availableNumbers.splice(exceptIndex, 1);
    }
    if (!availableNumbers.length) {
      return min;
    }
    const randomIndex = randomNumberInRange(0, availableNumbers.length - 1);
    return availableNumbers[randomIndex];
  }
  
  for(let i = 0; i < 10; i++) {
    const randomNumber = randomNumberInRange(min, max);
    if (randomNumber !== except) {
      return randomNumber;
    }
  }
  return min === except ? max : min;
};

export function nextAvailableNumber(current, availableNumbers) {
  const currentIndex = availableNumbers.indexOf(current);
  if (currentIndex === -1 || currentIndex === availableNumbers.length - 1) {
    return {
      number: current + 1,
      disabled: true
    };
  }
  return {
    number: availableNumbers[currentIndex + 1],
    disabled: false,
  }
}

export function prevAvailableNumber(current, availableNumbers) {
  const currentIndex = availableNumbers.indexOf(current);
  if (currentIndex === -1 || currentIndex === 0) {
    return {
      number: current - 1,
      disabled: true
    };
  }
  return {
    number: availableNumbers[currentIndex - 1],
    disabled: false,
  };
}