const arrayDeepEqual = (arr1: Array<any>, arr2: Array<any>) => {
  return arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);
};

export const areCombinationsEqual = (arr1: Array<Array<any>>, arr2: Array<Array<any>>) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((comb1) => {
    return arr2.find((comb2) => {
      return arrayDeepEqual(comb1, comb2);
    });
  });
};
