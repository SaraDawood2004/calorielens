from icrawler.builtin import BingImageCrawler

crawler = BingImageCrawler(storage={'root_dir': 'cake_images'})

crawler.crawl(keyword='cake', max_num=300)