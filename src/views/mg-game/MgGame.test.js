import { expect, oneEvent, fixture, html } from "@open-wc/testing";
import { MgGame } from "./MgGame.js";

customElements.define('mg-game', MgGame);

describe("tests for MgGame", () => {
    it("should render component", async () => {
      const el = await fixture(html` <mg-game></mg-game> `);
      expect(el).dom.to.equal("<mg-game></mg-game>");
    });
    
    it("should change pointsPerCorrect and milliseconds when use changeLevel", async () => {
      const el = await fixture(html` <mg-game></mg-game> `);
      expect(el.pointsPerCorrect).to.be.equal(10);
      expect(el.milliseconds).to.be.equal(10000);
      el.changeLevel(1);
      expect(el.pointsPerCorrect).to.be.equal(20);
      expect(el.milliseconds).to.be.equal(5000);
    });

});