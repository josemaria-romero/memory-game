import { expect, oneEvent, fixture, html } from "@open-wc/testing";
import { MgIndicator } from "./MgIndicator.js";

window.customElements.define("mg-indicator", MgIndicator);

describe("tests for MgIndicator", () => {  
  it("should render component", async () => {
    const el = await fixture(html` <mg-indicator></mg-indicator> `);
    expect(el).dom.to.equal("<mg-indicator></mg-indicator>");
  });
});
