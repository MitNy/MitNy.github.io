---
layout: post
title: ! "[MySQL] MySQL 데이터를 구글 스프레드 시트로 불러오기"
categories: [MySQL]
excerpt: " "
comments: true
share: true
tags:
  - MySQL
  - Google
---

MySQL 테이블 데이터를 구글 스프레드 시트로 만들어야 하는데 일일이 하긴 번거로워서<br>
구글 스프레드의 스크립트 기능을 이용해 커넥션을 생성, 데이터를 불러오는 코드를 짰다.<br>
이렇게 귀찮음을 코드로 푸는 나를 보면서 정말 컴공스럽다라는 생각이 든다....<br>

보안상의 이유로 실제 테이블 대신 블로그용 테스트 테이블을 사용했다. 테이블 구조는 다음과 같다.
![]({{ site.baseurl }}/assets/posts/mysql/eduboard.png)

우선 외부에서 데이터베이스에 접속할 수 있도록 설정을 해주어야 한다.
그 부분은 [이곳에서](https://idchowto.com/?p=11068)

설정이 끝나면 구글 스프레드 시트를 하나 만들고 `도구 > 스크립트 편집기`에 들어간다.
![]({{ site.baseurl }}/assets/posts/mysql/sheet_tools.png)

```javascript
<script src="https://gist.github.com/e6129c9fd9bc74e814d0?file-pull-and-sync-data-between-google-doc-spreadsheet-and-mysql-gs" type="text/javascript"/>
var connectionName = 'IP:MySQL Port'; // 접속할 MySQL 서버의 IP와 Port(Default:3306)
var user = ''; // MySQL 유저 ID
var userPwd = ''; // MySQL 유저 PW
var db = ''; // 접속할 MySQL DB명
var instanceUrl = 'jdbc:mysql://' + connectionName;
var dbUrl = instanceUrl + '/' + db;
var sheet = SpreadsheetApp.getActiveSheet(); // SpreadSheet 객체 생성

function exportDatabase() {
  var conn = Jdbc.getConnection(dbUrl, user, userPwd); // DB 연결
  var stmt = conn.createStatement();
  stmt.setMaxRows(1000);
  var results = stmt.executeQuery("SELECT title,content,author,date from eduboard"); // 쿼리
  var i=2; // 2번째 row부터 채움
  while(results.next()) {
	  // getRange(Integer row, Integer Column)
      title = sheet.getRange(i, 1); // A2
      content = sheet.getRange(i, 2); // B2
      author = sheet.getRange(i, 3); // C2
      date = sheet.getRange(i, 4); // D2
      title.setValue(results.getString("title")); // 현재 row의 title 컬럼 값
      content.setValue(results.getString("content")); // 현재 row의 content 컬럼 값
      author.setValue(results.getString("author")); // 현재 row의 author 컬럼 값
      date.setValue(results.getString("date")); // 현재 row의 date 컬럼 값
      i++;
  }
  
  /* 연결 해제 */
  results.close();
  stmt.close();
  conn.close();
}
```

### 시트별 삽입
![]({{ site.baseurl }}/assets/posts/mysql/yearlySheet.png)
시트가 이런식으로 나누어져있을 경우, 각 시트별로 데이터를 넣고싶다면 위 코드와 조금 다르게 해야한다.
```javascript
var sheet = SpreadsheetApp.getActiveSpreadsheet();
var activeSheet = '';

function database_2019() {
  activeSheet = "2019"; // 시트명 변경
  SpreadsheetApp.setActiveSheet(sheet.getSheetByName(activeSheet));
  var conn = Jdbc.getConnection(dbUrl, user, userPwd); // DB 연결
  var stmt = conn.createStatement();
  stmt.setMaxRows(1000);
  var results = stmt.executeQuery("SELECT stuID,name,seminarTheme,seminarDate FROM seminar_list WHERE seminarDate BETWEEN '2019-01-01' AND '2019-12-31' ORDER BY seminarDate DESC"); // 특정 기간 내 데이터만 불러오는 쿼리
  var i=2;
  while(results.next()) {
    sID = sheet.getRange(activeSheet+"!A"+i); // "시트명!A2" 특정 시트의 A2 위치에 삽입
    sName = sheet.getRange(activeSheet+"!B"+i); // EX) test!A2:B2 일 경우 A2부터 B2까지 사각형 모양으로 채움
    sTheme = sheet.getRange(activeSheet+"!C"+i);
    sDate = sheet.getRange(activeSheet+"!D"+i);
    sID.setValue(results.getString("stuID"));
    sName.setValue(results.getString("name"));
    sTheme.setValue(results.getString("seminarTheme"));
    sDate.setValue(results.getString("seminarDate"));
    i++;
  }
  results.close();
  stmt.close();
  conn.close();
}

```



1. 참고사이트1: [Google Apps srcipt jdbc guide](https://developers.google.com/apps-script/guides/jdbc)<br>
2. 참고사이트2: [Blog](https://medium.com/@pradeepbheron/pull-and-sync-data-between-google-doc-spreadsheet-and-mysql-1d5a09d787a4)<br>

위 코드는 ▶ 버튼을 눌러 실행시킬 수 있다.
![]({{ site.baseurl }}/assets/posts/mysql/gs_script.png)

처음 실행시키면 권한 인증창이 뜨고 계정 선택 및 허용 등의 과정을 거치면 된다.
![]({{ site.baseurl }}/assets/posts/mysql/run_popup.png)

실행 결과는 스프레드 시트에 바로 업데이트 된다.
![]({{ site.baseurl }}/assets/posts/mysql/select_result.png)

실행 로그는 `보기>실행` 에서 확인해볼 수 있고, 실패 원인 분석 등에 쓰인다.
![]({{ site.baseurl }}/assets/posts/mysql/run_log.png)
