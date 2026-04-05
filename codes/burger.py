from icrawler.builtin import BingImageCrawler

crawler = BingImageCrawler(storage={'root_dir': 'burger_images'})

crawler.crawl(keyword='burger', max_num=300)