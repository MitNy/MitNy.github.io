---
layout: post
title: ! "[Ubuntu] JSP mysql 연동"
categories: [Ubuntu]
excerpt: " "
comments: true
share: true
tags:
  - jsp
  - Ubuntu
  - mysql
  - connect
---

### 환경 : Ubuntu 16.04 LTS / Tomcat7 / Mysql5.5.60

- java와 mysql 설치는 완료되었다고 가정

JDBC MySQL connector 설치
`apt-get install libmysql-java`

/usr/share/java/에서 mysql-connector-java.jar 파일 확인 가능
![](/assets/posts/ubuntu/jsp_connector.png)

Tomcat7 라이브러리 폴더에 링크 생성
`ln -s /usr/share/java/mysql-connector-java.jar /usr/share/tomcat7/lib/mysql-connector-java.jar` 

`service tomcat7 restart`

### EX
JDBC 사용을 위해 java.sql 패키지 import 
`<%@ page import = "java.sql.*" %>`

mysql 테이블 내용 출력하는 코드
```java
<%@ page import = "java.sql.*" %>
<%
	Statement stm = null;
	ResultSet rs = null;
	Class.forName("com.mysql.jdbc.Driver");
	String myUrl = "jdbc:mysql://localhost/DB명";
	Connection conn = DriverManager.getConnection(myUrl, "mysql 아이디", "mysql 패스워드");
	try {
        	stm = conn.createStatement();
        	if(stm.execute("select * from 테이블명")) {
                	rs = stm.getResultSet();
        }
        while(rs.next()) {
                out.println(rs.getString("컬럼명"));
                out.println(rs.getString("컬럼명"));
                out.println(rs.getString("컬럼명"));
                out.println(rs.getString("컬럼명"));
                out.println(rs.getString("컬럼명"));
                out.write("<br>");
        }
        rs.close();
        stm.close();
}
catch(Exception e) {
        out.println("rs.next() ERROR");
}
conn.close();
%>
```

![](/assets/posts/ubuntu/jsp_print.png)
