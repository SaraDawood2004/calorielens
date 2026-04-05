from icrawler.builtin import BingImageCrawler

crawler = BingImageCrawler(storage={'root_dir': 'chapathi'})

crawler.crawl(keyword='chapathi', max_num=500)