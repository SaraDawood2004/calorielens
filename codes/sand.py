from icrawler.builtin import BingImageCrawler

crawler = BingImageCrawler(storage={'root_dir': 'sandwich_images'})

crawler.crawl(keyword='sandwich', max_num=300)