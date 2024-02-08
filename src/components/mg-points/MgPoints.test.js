import { expect, oneEvent, fixture, html } from "@open-wc/testing";
import "./mg-points.js";

describe("tests for MgPoints", () => {
  it("should render component", async () => {
    const el = await fixture(html` <mg-points>10</mg-points> `);
    expect(el).dom.to.equal("<mg-points>10</mg-points>");
    expect(el).lightDom.to.equal("10");
    expect(el).shadowDom.to.equal("<h3>Points: <slot></slot></h3>");
  });
});
