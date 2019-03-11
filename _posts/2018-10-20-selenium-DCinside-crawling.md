---
layout: post
title: ! "[Python] Selenium을 이용한 디씨인사이드 야옹이 갤러리 크롤링"
categories: [Python]
excerpt: " "
comments: true
share: true
tags:
  - Python
---

#### Selenium 설치
`sudo pip3 install selenium`
[Selenium docs](https://selenium-python.readthedocs.io/)

#### 웹 드라이버 설치
- 웹 애플리케이션 자동화 테스트를 위한 오픈 소스 툴
- 운영체제에 맞게 다운로드
[설치 파일 링크](https://chromedriver.storage.googleapis.com/index.html?path=2.43/)

#### 브라우저 실행 및 URL 접속
- 야옹이 갤러리 URL : https://gall.dcinside.com/board/lists/?id=cat
- webdriver.Chrome(웹 드라이버 설치 경로)
```py
from selenium import webdriver

driver = webdriver.Chrome("./chromedriver")
url = "http://gall.dcinside.com/board/lists/?id=cat"
```

#### 오늘 올라온 게시글 제목 수집
```py
from selenium import webdriver
from selenium.webdriver import ActionChains

def get_title_of_post(driver,url):
	title_list = []
	driver.get(url)
	posts = driver.find_elements_by_class_name("ub-content")
	
	for i in range(0,len(posts)):
		if posts[i].find_element_by_class_name("gall_date").text == "10/19":
			post_title = posts[i].find_element_by_tag_name("a").text
			title_list.append(post_title)
	return title_list

def isTodayPostOnPage(driver,url,date):
	driver.get(url)
	posts = driver.find_elements_by_class_name("gall_date")
	
	for i in range(0,len(posts)):
		if posts[i].text == date:
			return True
	return False

def main():
	driver = webdriver.Chrome("./chromedriver")
	url = "http://gall.dcinside.com/board/lists?id=cat&page="
	page_Number = 1
	while True:
		if isTodayPostOnPage(driver,url+str(page_Number),"오늘 날짜 ex)10/19"):
			print(get_title_of_post(driver,url+str(page_Number)))
			page_Number+=1
		else:
			break

if __name__ == "__main__":
	main()
```

#### 결과
![]({{ site.baseurl }}/assets/posts/python/dc_cat.png)
