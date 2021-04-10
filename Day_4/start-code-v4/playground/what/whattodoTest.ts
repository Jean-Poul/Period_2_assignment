const expect = require("chai").expect;
import app from "./whattodo";
const request = require("supertest")(app);
import nock from "nock";

describe("What to do endpoint", function () {
  before(() => {
        nock('https://www.boredapi.com')
        .get("/api/activity")
        .reply(200, {
          "activity":"Fill out a basketball bracket",
          "type":"recreational","participants":1,
          "price":0,
          "link":"",
          "key":"7806284",
          "accessibility":0.1
        })
    })

  it("Should eventually provide 'Fill out a basketball bracket'", async function () {
    const response = await request.get("/whattodo")
    expect(response.body.activity).to.be.equal("Fill out a basketball bracket");
  })
})