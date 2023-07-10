const baseURL = "http://localhost:4000";
const request = require("supertest");

describe("GET /spots", () => {
    /*
    const newSpot = {
        id: 1,
        name: "2",
        available: false
    };
    beforeAll(async () => await request(baseURL).post("/spot").send(newSpot));
    afterAll(async () => await request(baseURL).delete("/spot/" + newSpot.id));
    */
    it("should return 200", async () => {
        const res = await request(baseURL).get("/spots");
        /*
        expect(res.statusCode).toBe(200);
        expect(res.body.error).toBeNull();
        */
    });

    //it("should return spots", );
})

describe('hola mundo', () => {
    it('should connect', async () => {
        const res = await request.agent(baseURL + '/');
    })
})