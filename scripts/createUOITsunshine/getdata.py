import os

url = "http://www.fin.gov.on.ca/en/publications/salarydisclosure/pssd/orgs-tbs.php?pageNum_tbs=1&organization=universities&year=2014"
bashCommand = ('wget -O - "%s" >> output.txt' % url)
os.system(bashCommand)
