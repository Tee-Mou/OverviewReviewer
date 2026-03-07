import argparse

from selenium import webdriver
import lxml.html as html 
from lxml_html_clean import Cleaner
from contextlib import closing
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.webdriver import WebDriver

def start_driver() -> WebDriver:
    options = Options()
    options.add_argument("--headless")
    driver = WebDriver(options=options)
    return driver

def query_site_text(driver, q):
    driver.get("https://www.google.com/")
    search = driver.find_element_by_name("q")
    search.clear()
    search.send_keys(q)
    search.send_keys(Keys.RETURN)
    page_source = driver.page_source
    root = html.document_fromstring(page_source)
    Cleaner(kill_tags=["no_script"], style=True)(root)
    return root.text_content()

def run():
    parser = argparse.ArgumentParser("scraper")
    parser.add_argument("url",
                        "-u",
                        help="URL to scrape text from.")
    args = parser.parse_args()
    with closing(start_driver()) as driver:
        query_site_text(driver, args.url)

if __name__ == "__main__":
    run()