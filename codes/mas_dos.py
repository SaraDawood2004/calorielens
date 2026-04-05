from icrawler.builtin import BingImageCrawler

crawler = BingImageCrawler(storage={'root_dir': 'masala_dosa'})

crawler.crawl(keyword='masala dosa', max_num=500)