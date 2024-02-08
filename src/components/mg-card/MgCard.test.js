import { expect, oneEvent, fixture, html } from "@open-wc/testing";
import { MgCard } from "./MgCard.js";

window.customElements.define("mg-card", MgCard);

describe("tests for MgCard", () => {
  it("render component", async () => {
    const el = await fixture(html` <mg-card>test</mg-card> `);
    expect(el).dom.to.equal("<mg-card>test</mg-card>");
  });

  it("change properties with function toggleTapped", async () => {
    const el = await fixture(html` <mg-card>test</mg-card> `);
    el.tapped = false;
    expect(el.tapped).to.be.false;
    el.toggleTapped();
    expect(el.tapped).to.be.true;
  });  

  it("toggleTaped dispatch discover event", async () => {
    const el = await fixture(html` <mg-card>test</mg-card> `);
    setTimeout(() => el.toggleTapped());
    const { detail } = await oneEvent(el, 'discover');
    expect(detail).to.eq('card');
  });
});
