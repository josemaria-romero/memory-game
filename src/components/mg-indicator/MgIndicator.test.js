import { expect, oneEvent, fixture, html } from "@open-wc/testing";
import "./mg-indicator.js";

describe("tests for MgIndicator", async () => {
  const indicator = await fixture(html` <mg-indicator></mg-indicator> `);

  it("render component", () => {
    expect(indicator).dom.to.equal("<mg-indicator></mg-indicator>");
  });
});
