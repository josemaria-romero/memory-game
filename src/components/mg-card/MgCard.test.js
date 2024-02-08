import { expect, oneEvent, fixture, html } from "@open-wc/testing";
import "./mg-card.js";

describe("tests for MgCard", async () => {

  const card = await fixture(html` <mg-card>test</mg-card> `);
  card.tapped = false;
  card.wrong = false;
  card.correct = false;

  it("render component", () => {
    expect(card).dom.to.equal("<mg-card>test</mg-card>");
  });

  it("change properties with function toggleTapped", () => {
    expect(card.tapped).to.be.false;
    card.toggleTapped();
    expect(card.tapped).to.be.true;
  });  

  it("toggleTaped dispatch discover event", async () => {
    setTimeout(() => card.toggleTapped());
    const { detail } = await oneEvent(card, 'discover');
    expect(detail).to.eq('card');
  });

});
