import {test ,expect} from "@playwright/test"
import path from "path";
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

test("should allow user to add a hotel", async ({page})=>{
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator('[name="name"]').fill("Test Hotel")
    await page.locator('[name="city"]').fill("Test city")
    await page.locator('[name="country"]').fill("Test country")
    await page.locator('[name="description"]').fill("Test description")
    await page.locator('[name="pricePerNight"]').fill("100")
    await page.selectOption('select[name="starRating"]',"3")
    await page.getByText("Budget").click();
    await page.getByLabel("spa").check();
    await page.getByLabel("parking").check();
    
    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("2");

    await page.setInputFiles('[name="imageFiles"]',[
        path.join(__dirname,"files","png1.jpg"),
        path.join(__dirname,"files","png2.jpg"),
    ]);

    await page.getByRole('button', {name:"Save"}).click();


    await expect(page.getByText('Hotel Saved!')).toBeVisible({ timeout: 10000 });
})

test("should display hotels", async ({ page})=>{
    await page.goto(`${UI_URL}my-hotels`);

    await page.waitForLoadState('networkidle'); 

    await expect(page.getByText('test hotel ')).toBeVisible();
    await expect(page.getByText("Ensure that the page")).toBeVisible();

    await expect(page.getByText("test city,test country")).toBeVisible();
 
    await expect(page.getByText("Luxury")).toBeVisible();
    await expect(page.getByText("Rs. 1111 Per night")).toBeVisible();
    await expect(page.getByText("2 adults, 2 children")).toBeVisible();
    await expect(page.getByText("3 Star Rating")).toBeVisible();

    await  expect(page.getByRole("link",{name:"view Details"})).toBeVisible();
    await  expect(page.getByRole("link",{name:"Add Hotel"})).toBeVisible();

})

 test("should  edit hotel",async({page})=>{
    await page.goto(`${UI_URL}my-hotels`);
    await page.getByRole('link',{name:'view Details'}).click();

    await page.waitForSelector(`[name="name"]`,{state:"attached"})

    await expect(page.locator('[name="name"]')).toHaveValue('test hotel')
    await page.locator('[name="name"]').fill("test hotel UPDATED")
    await page.getByRole("button",{name:"Save"}).click();
    await expect(page.getByText("Hotel Saved")).toBeVisible()
 })
