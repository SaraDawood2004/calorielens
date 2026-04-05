from icrawler.builtin import BingImageCrawler

crawler = BingImageCrawler(storage={'root_dir': 'dosa'})

crawler.crawl(keyword='dosa', max_num=500)