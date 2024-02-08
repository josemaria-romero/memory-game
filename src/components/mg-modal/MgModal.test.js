import { expect, oneEvent, fixture, html } from "@open-wc/testing";
import "./mg-modal.js";

describe("tests for MgModal", async () => {
  const modal = await fixture(html` <mg-modal></mg-modal> `);

  it("render component", () => {
    expect(modal).dom.to.equal("<mg-modal></mg-modal>");
  });
});
