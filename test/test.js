import { expect } from "chai";
import * as tape from "../data.js";

describe("tapes data module", () => {
 it("returns requested tape", function() {
   let result = tape.getItem("Death");
   expect(result).to.deep.equal({artist: 'Death', title: 'Leprosy', year: 1988, genre: 'death metal', price: 11.00});
 });

 it("fails with nonexistent tape", () => {
   let result = tape.getItem("fake");
   expect(result).to.be.undefined;
 });

 it("adds requested tape", function() {
    let result = tape.addItem("Primitive Man", "Caustic", 2017, "metal", 10.98);
    expect(result.added).to.be.true;
  });
 
  it("fails with duplicate tape", () => {
    let result = tape.addItem("Death", "Leprosy", 1988, "death metal", 11.00);
    expect(result.added).to.be.false;
  });
});