from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to test page...")
            page.goto("http://localhost:4321/test-organisms")

            # Wait for content
            page.wait_for_selector("h1")

            # Open Cart Drawer
            print("Opening cart drawer...")
            page.click(".cart-toggle-btn")
            page.wait_for_selector(".cart-drawer-overlay.is-active")
            page.wait_for_timeout(500) # Wait for transition

            # Take screenshot of open cart
            print("Taking screenshot with cart open...")
            page.screenshot(path="verification_cart.png", full_page=True)

            # Close cart
            print("Closing cart...")
            page.click(".cart-drawer-overlay .close-btn")
            page.wait_for_timeout(500)

            # Take screenshot of full page
            print("Taking screenshot of full page...")
            page.screenshot(path="verification_page.png", full_page=True)

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
