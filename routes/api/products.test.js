/**
 * @jest-environment node
 */

// Testing products API routes

const axios = require("axios");
const port = 5000;

describe("Fetching Products", () => {
  it("should contain the status and the fetched products", async () => {
    const expectedProperties = ["status", "fetchedProducts"];
    const response = await axios({ url: `http://localhost:${port}/api/products` });
    const responseProperties = Object.keys(response.data);
    expect(responseProperties).toEqual(
      expect.arrayContaining(expectedProperties)
    );
  });


  const categories = ['phones', 'tablets', 'notebooks'];

  const testProductsWithCategory = (categoryParam) => {
    it("should contain the status and the fetched products", async () => {
      const expectedDataProperties = ["status", "fetchedProducts"];
      console.log(categoryParam);
      const response = await axios({
        url: `http://localhost:${port}/api/products/category`, params: {
          category: categoryParam
        }
      });

      const responseProperties = Object.keys(response.data);

      expect(responseProperties).toEqual(
        expect.arrayContaining(expectedDataProperties)
      );
    });
  }

  categories.forEach(category => testProductsWithCategory(category));

});