from icrawler.builtin import BingImageCrawler

crawler = BingImageCrawler(storage={'root_dir': 'biryani_images'})

crawler.crawl(keyword='biryani', max_num=500)