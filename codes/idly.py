from icrawler.builtin import BingImageCrawler

crawler = BingImageCrawler(storage={'root_dir': 'idly'})

crawler.crawl(keyword='idly', max_num=500)