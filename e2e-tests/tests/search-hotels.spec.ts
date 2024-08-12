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

test("should show hotel detaisl", async({page})=>{
    await page.goto(UI_URL);
    await page.getByPlaceholder("Where are you going?").fill("CA") 
    await page.getByRole("button",{name:"Search"}).click();
     await page.getByText("The Grand Horizon").click();
     await expect(page).toHaveURL(/detail/);
      await expect(page.getByRole("button",{name:"Book now"})).toBeVisible();
})

test("sholud book hotel",async({page})=>{
    await page.goto(UI_URL);
    await page.getByPlaceholder("Where are you going?").fill("CA") 
    const date=new Date();
    date.setDate(date.getDate()+3)
    const  formattedDate=date.toISOString().split("T")[0]

    await page.getByPlaceholder("check out date").fill(formattedDate);


    await page.getByRole("button",{name:"Search"}).click();
     await page.getByText("The Grand Horizon").click();
 
      await page.getByRole("button",{name:"Book now"}).click();

      await expect(page.getByText(" Total Cost: Rs.44444.00")).toBeVisible();

      const stripeFrame=page.frameLocator("iframe").first();
      await stripeFrame.locator('[placeholder="Card number"]').fill("4242424242424242");

      await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30")
      await stripeFrame.locator('[placeholder="CVC"]').fill("200")
      await stripeFrame.locator('[placeholder="ZIP"]').fill("51001");
      await page.getByRole("button",{name:"Confirm Booking"}).click()
      await expect(page.getByText("Booking Saved!")).toBeVisible({ timeout: 10000 });

      
})