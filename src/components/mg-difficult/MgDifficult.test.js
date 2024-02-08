import { expect, oneEvent, fixture, html } from "@open-wc/testing";
import { MgDifficult } from "./MgDifficult.js";

window.customElements.define("mg-difficult", MgDifficult);

describe("tests for MgDifficult", () => {
  it("should render component", async () => {
    const el = await fixture(html` <mg-difficult></mg-difficult> `);
    expect(el).dom.to.equal("<mg-difficult></mg-difficult>");
  });

  it("should dispatch selectLevel event in changeSelection", async () => {
    const el = await fixture(html` <mg-difficult></mg-difficult> `);
    const selector = el.shadowRoot.querySelector("select");
    selector.value = 2;
    setTimeout(() => el.changeSelection());
    const { detail } = await oneEvent(el, "selectLevel");
    expect(parseInt(detail)).to.equal(2);
  });
});
