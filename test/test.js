import { expect } from "chai";
import * as tape from "../data.js";

describe("tapes data module", () => {
 it("returns requested tape", function() {
   var result = tape.getItem("Death");
   expect(result).to.deep.equal({artist: 'Death', title: 'Leprosy', year: 1988, genre: 'death metal', price: 11.00});
 });

 it("fails with invalid tape", () => {
   var result = tape.getItem("fake");
   expect(result).to.be.undefined;
 });
});