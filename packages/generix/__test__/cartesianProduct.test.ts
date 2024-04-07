import cartesianProduct from "../src/cartesianProduct";

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


const SET_A = [
    ["A", "B", "C", "D"],
    ["1", "2"]
]

const CARTESIAN_PRODUCT_SET_A = [
    ["A", "1"],
    ["A", "2"],
    ["B", "1"],
    ["B", "2"],
    ["C", "1"],
    ["C", "2"],
    ["D", "1"],
    ["D", "2"],
]

const SET_B = [
  ["A", "B", "C", "D"],
  ["1", "2"],
  ["a", "b", "c"]
]

const CARTESIAN_PRODUCT_SET_B = [
  ["A","1","a"],
  ["A","1","b"],
  ["A","1","c"],
  ["A","2","a"],
  ["A","2","b"],
  ["A","2","c"],
  ["B","1","a"],
  ["B","1","b"],
  ["B","1","c"],
  ["B","2","a"],
  ["B","2","b"],
  ["B","2","c"],
  ["C","1","a"],
  ["C","1","b"],
  ["C","1","c"],
  ["C","2","a"],
  ["C","2","b"],
  ["C","2","c"],
  ["D","1","a"],
  ["D","1","b"],
  ["D","1","c"],
  ["D","2","a"],
  ["D","2","b"],
  ["D","2","c"],
]


const SET_C = [
    ["V", "W"],
    ["V", "W", "X"],
    ["V", "W", "X", "Y"],
    ["V", "W", "X", "Y", "Z"],
]

const CARTESIAN_PRODUCT_SET_C = [
  ["V","V","V","V"],
  ["V","V","V","W"],
  ["V","V","V","X"],
  ["V","V","V","Y"],
  ["V","V","V","Z"],
  ["V","V","W","V"],
  ["V","V","W","W"],
  ["V","V","W","X"],
  ["V","V","W","Y"],
  ["V","V","W","Z"],
  ["V","V","X","V"],
  ["V","V","X","W"],
  ["V","V","X","X"],
  ["V","V","X","Y"],
  ["V","V","X","Z"],
  ["V","V","Y","V"],
  ["V","V","Y","W"],
  ["V","V","Y","X"],
  ["V","V","Y","Y"],
  ["V","V","Y","Z"],
  ["V","W","V","V"],
  ["V","W","V","W"],
  ["V","W","V","X"],
  ["V","W","V","Y"],
  ["V","W","V","Z"],
  ["V","W","W","V"],
  ["V","W","W","W"],
  ["V","W","W","X"],
  ["V","W","W","Y"],
  ["V","W","W","Z"],
  ["V","W","X","V"],
  ["V","W","X","W"],
  ["V","W","X","X"],
  ["V","W","X","Y"],
  ["V","W","X","Z"],
  ["V","W","Y","V"],
  ["V","W","Y","W"],
  ["V","W","Y","X"],
  ["V","W","Y","Y"],
  ["V","W","Y","Z"],
  ["V","X","V","V"],
  ["V","X","V","W"],
  ["V","X","V","X"],
  ["V","X","V","Y"],
  ["V","X","V","Z"],
  ["V","X","W","V"],
  ["V","X","W","W"],
  ["V","X","W","X"],
  ["V","X","W","Y"],
  ["V","X","W","Z"],
  ["V","X","X","V"],
  ["V","X","X","W"],
  ["V","X","X","X"],
  ["V","X","X","Y"],
  ["V","X","X","Z"],
  ["V","X","Y","V"],
  ["V","X","Y","W"],
  ["V","X","Y","X"],
  ["V","X","Y","Y"],
  ["V","X","Y","Z"],
  ["W","V","V","V"],
  ["W","V","V","W"],
  ["W","V","V","X"],
  ["W","V","V","Y"],
  ["W","V","V","Z"],
  ["W","V","W","V"],
  ["W","V","W","W"],
  ["W","V","W","X"],
  ["W","V","W","Y"],
  ["W","V","W","Z"],
  ["W","V","X","V"],
  ["W","V","X","W"],
  ["W","V","X","X"],
  ["W","V","X","Y"],
  ["W","V","X","Z"],
  ["W","V","Y","V"],
  ["W","V","Y","W"],
  ["W","V","Y","X"],
  ["W","V","Y","Y"],
  ["W","V","Y","Z"],
  ["W","W","V","V"],
  ["W","W","V","W"],
  ["W","W","V","X"],
  ["W","W","V","Y"],
  ["W","W","V","Z"],
  ["W","W","W","V"],
  ["W","W","W","W"],
  ["W","W","W","X"],
  ["W","W","W","Y"],
  ["W","W","W","Z"],
  ["W","W","X","V"],
  ["W","W","X","W"],
  ["W","W","X","X"],
  ["W","W","X","Y"],
  ["W","W","X","Z"],
  ["W","W","Y","V"],
  ["W","W","Y","W"],
  ["W","W","Y","X"],
  ["W","W","Y","Y"],
  ["W","W","Y","Z"],
  ["W","X","V","V"],
  ["W","X","V","W"],
  ["W","X","V","X"],
  ["W","X","V","Y"],
  ["W","X","V","Z"],
  ["W","X","W","V"],
  ["W","X","W","W"],
  ["W","X","W","X"],
  ["W","X","W","Y"],
  ["W","X","W","Z"],
  ["W","X","X","V"],
  ["W","X","X","W"],
  ["W","X","X","X"],
  ["W","X","X","Y"],
  ["W","X","X","Z"],
  ["W","X","Y","V"],
  ["W","X","Y","W"],
  ["W","X","Y","X"],
  ["W","X","Y","Y"],
  ["W","X","Y","Z"],
]



describe("Cartesian product", () => {

  it("Cartesian product with 2 set", () => {
      const results = cartesianProduct(SET_A);
      const assertion = areCombinationsEqual(results, CARTESIAN_PRODUCT_SET_A);
      expect(assertion).toBe(true);
  });

  it("Cartesian product with 3 set", () => {
    const results = cartesianProduct(SET_B);
    const assertion = areCombinationsEqual(results, CARTESIAN_PRODUCT_SET_B);
    expect(assertion).toBe(true);
  });

  it("Cartesian product with 4 set", () => {
    const results = cartesianProduct(SET_C);
    const assertion = areCombinationsEqual(results, CARTESIAN_PRODUCT_SET_C);
    expect(assertion).toBe(true);
  });
});
