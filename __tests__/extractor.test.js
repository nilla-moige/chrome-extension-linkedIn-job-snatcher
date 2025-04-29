import sinon from "sinon";
import chrome from "sinon-chrome";
import { extractJobDescription } from "../src/content-script";

describe("extractJobDescription()", () => {
    beforeAll(() => {
        global.chrome = chrome;
        document.body.innerHTML = `
      <div class="mt4">
        <h1>Senior Engineer</h1>
        <p>Description line 1</p>
        <p>Description line 2</p>
      </div>`;
    });

    it("should grab all text inside .mt4 container", () => {
        const text = extractJobDescription();
        expect(text).toContain("Senior Engineer");
        expect(text).toContain("Description line 1");
        expect(text).toContain("Description line 2");
    });
});