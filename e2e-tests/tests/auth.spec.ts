import { test, expect } from '@playwright/test';
const UI_URL="http://localhost:5173/"

test('should not allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);
  // get the sign in button
   await page.getByRole("link",{name:"Sign-In"}).click();

   await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible();

   await page.locator("[name=email]").fill("one@gmail.com");
   await page.locator("[name=password]").fill("1234567")

   await page.getByRole("button",{name:'Login'}).click();

   await  expect(page.getByText("Sign in Successfull")).toBeVisible();
    await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible()
    await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible()
    await expect(page.getByRole("button",{name:"SignOut"})).toBeVisible()


});

test("should allow user to regsiter",async ({page})=>{
  const testEmail= `test_register_${Math.floor(Math.random()*9000)+1000}test@gmail.com`
  await page.goto(UI_URL);

  await page.getByRole("link",{name:"Sign-In"}).click();
   await page.getByRole("link",{name:"Create Account"}).click();
   await expect( page.getByRole("heading",{name:"Create an Account"})).toBeVisible();
    await page.locator("[name=firstName]").fill("test_firstName")
    await page.locator("[name=lastName]").fill("test_lastName")
    await page.locator("[name=email]").fill(testEmail)
    await page.locator("[name=password]").fill("password123")
    await page.locator("[name=confirmPassword]").fill("password123")

await page.getByRole("button",{name:"Register"}).click();

await  expect(page.getByText("Registration Success")).toBeVisible();

await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible()
await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible()
await expect(page.getByRole("button",{name:"SignOut"})).toBeVisible()

})
