import {test,expect} from "@playwright/test"

const UI_URL="http://localhost:5173/"

test.beforeEach(async ({page})=>{
    await page.goto(UI_URL);
    // get the sign in button
     await page.getByRole("link",{name:"Sign-In"}).click();
  
     await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible();
  
     await page.locator("[name=email]").fill("one@gmail.com");
     await page.locator("[name=password]").fill("1234567")
  
     await page.getByRole("button",{name:'Login'}).click();
  
     await  expect(page.getByText("Sign in Successfull")).toBeVisible();

});

test("should shwo hotel test result", async({page})=>{
    await page.goto(UI_URL);
    await page.getByPlaceholder("Where are you going?").fill("CA") 
    await page.getByRole("button",{name:"Search"}).click();
    await expect(page.getByText("Hotel foundin CA ")).toBeVisible();
    await expect(page.getByText("bcydh")).toBeVisible();

})