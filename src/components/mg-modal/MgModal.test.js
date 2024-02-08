import { expect, oneEvent, fixture, html } from "@open-wc/testing";
import { MgModal } from "./MgModal.js";

window.customElements.define("mg-modal", MgModal);

describe("tests for MgModal", () => {
  it("should render component", async () => {
    const el = await fixture(html` <mg-modal></mg-modal> `);
    expect(el).dom.to.equal("<mg-modal></mg-modal>");
  });
});
