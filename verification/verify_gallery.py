from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:4321/test-organisms")
        # Wait for gallery
        gallery = page.wait_for_selector(".product-gallery")
        gallery.screenshot(path="verification/gallery_element.png")
        browser.close()

if __name__ == "__main__":
    run()
