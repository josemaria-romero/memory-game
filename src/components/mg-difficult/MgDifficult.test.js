import { expect, oneEvent, fixture, html } from "@open-wc/testing";
import "./mg-difficult.js";

describe("tests for MgDifficult", async () => {
  const difficult = await fixture(html` <mg-difficult></mg-difficult> `);

  it("render component", () => {
    expect(difficult).dom.to.equal("<mg-difficult></mg-difficult>");
  });

  it("changeSelection dispatch selectLevel event", async () => {
    const selector = difficult.shadowRoot.querySelector("select");
    selector.value = 2;
    setTimeout(() => difficult.changeSelection());
    const { detail } = await oneEvent(difficult, "selectLevel");
    expect(parseInt(detail)).to.equal(2);
  });
});
