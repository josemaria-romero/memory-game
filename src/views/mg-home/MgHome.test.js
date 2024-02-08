import { expect, fixture, html } from "@open-wc/testing";
import { MgHome } from "./MgHome.js";

customElements.define('mg-home', MgHome);

describe("tests for MgHome", () => {
    it("should render component", async () => {
        const el = await fixture(html` <mg-home></mg-home> `);
        expect(el).dom.to.equal("<mg-home></mg-home>");
    });
})