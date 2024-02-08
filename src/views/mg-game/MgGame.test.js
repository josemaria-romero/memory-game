import { expect, oneEvent, fixture, html } from "@open-wc/testing";
import { MgGame } from "./MgGame.js";

customElements.define('mg-game', MgGame);

describe("tests for MgGame", () => {
    it("should render component", async () => {
      const el = await fixture(html` <mg-game></mg-game> `);
      expect(el).dom.to.equal("<mg-game></mg-game>");
    });
    
    it("should change target correct to true if cardTapped is called from the card that coincide with randomNumber", async () => {
      const el = await fixture(html` <mg-game></mg-game> `);
      const cards = el.shadowRoot.querySelectorAll('mg-card');
      let card;
      cards.forEach((cardElement) => {
        if (parseInt(cardElement.textContent) === el.randomNumber) {
          card = cardElement;
        }
      });
      card.click();
      expect(card.correct).to.be.true;
    }); 
    
    it("should change pointsPerCorrect and milliseconds when use changeLevel", async () => {
      const el = await fixture(html` <mg-game></mg-game> `);
      expect(el.pointsPerCorrect).to.be.equal(10);
      expect(el.milliseconds).to.be.equal(10000);
      el.changeLevel(1);
      expect(el.pointsPerCorrect).to.be.equal(20);
      expect(el.milliseconds).to.be.equal(5000);
    });

    it("fillArray should return an array with 9 different numbers from 1 to 9", async () => {
      const el = await fixture(html` <mg-game></mg-game> `);
      expect(el.fillArray().length).to.be.equal(9);
    });  
    
    it("getRandomNumber should get a new number and if there si no more numbers, set modal win message", async () => {
      const el = await fixture(html` <mg-game></mg-game> `);
      const randomNumberOld = el.randomNumber;
      el.getRandomNumber();
      expect(el.randomNumber).not.to.be.equal(randomNumberOld);
      expect(el.modalHidden).to.be.true;
      el.numbers = [];
      el.getRandomNumber();
      expect(el.randomNumber).to.be.undefined;
      expect(el.modalHidden).to.be.false;
      expect(el.modalMessage).to.be.eq('You win!');
    }); 
    
    it("prepareCards should set all mg-card properties to false", async () => {
      const el = await fixture(html` <mg-game></mg-game> `);
      const cards = el.shadowRoot.querySelectorAll('mg-card');
      cards.forEach((card) => {
        card.tapped = true;
        card.correct = true;
        card.wrong = true;
      });
      cards.forEach((card) => {
        expect(card.tapped).to.be.true;
        expect(card.correct).to.be.true;
        expect(card.wrong).to.be.true;
      });
      el.prepareCards();
      cards.forEach((card) => {
        expect(card.tapped).to.be.false;
        expect(card.correct).to.be.false;
        expect(card.wrong).to.be.false;
      });
    }); 
    
});