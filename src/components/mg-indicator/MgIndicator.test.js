import { expect, oneEvent, fixture, html } from "@open-wc/testing";
import "./mg-indicator.js";

describe("tests for MgIndicator", () => {  
  it("should render component", async () => {
    const el = await fixture(html` <mg-indicator></mg-indicator> `);
    expect(el).dom.to.equal("<mg-indicator></mg-indicator>");
  });
});
