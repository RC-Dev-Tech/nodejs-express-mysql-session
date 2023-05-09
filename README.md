# ![](https://drive.google.com/uc?id=10INx5_pkhMcYRdx_OO4rXNXxcsvPtBYq) NodeJs - Express MySQL Session
> ##### 理論請自行找，網路上有很多相關的文章，這邊只關注於範例實作的部分.

---

<!--ts-->
## 目錄:
* [簡介](#簡介)
* [參考範例](#參考範例)
* [使用套件](#使用套件)
* [操作說明](#操作說明)
* [延伸項目](#延伸項目)
* [參考資料](#參考資料)
* [備註](#備註)
<!--te-->

---

## 簡介:
這個範例將介紹如何使用express-mysql-session套件，將session的資料上傳至ＭySQL資料庫中.
由於這個範例將會使用之前所介紹的幾個範例做一個進階使用，所以如果看不懂的話，可以回頭去參考之前的範例.

當範例程式執行操作後，下圖可以看到，其Session的資料已經被自動的寫入到資料庫中.
<br>

![](https://drive.google.com/uc?id=1iWZFqDgHSZAAl1dszZpyueSoM9M5VP4H)
![](https://drive.google.com/uc?id=1A37iALYuafQnj-c5pleOFlxr0iN7p-bN)

---

## 參考範例:
- [NodeJs - MySQL 數據庫的操作(CURD)](https://github.com/RC-Dev-Tech/nodejs-mysql) <br>
- [NodeJs - Express Cookie-Parser](https://github.com/RC-Dev-Tech/nodejs-express-cookie-parser) <br>
- [NodeJs - Express Session](https://github.com/RC-Dev-Tech/nodejs-express-session) <br>

---

## 使用套件:
- express
- cors
- mysql
- cookie-parser
- express-session
- express-mysql-session

---

## 操作說明:
#### 1. 安裝套件 [^1]
> npm install --save
#### 2. 編譯 & 運行
> npm run start

---

## 延伸項目:
* [NodeJs 系列實作](https://github.com/RC-Dev-Tech/nodejs-index) <br>

---

## 參考資料:
* [Express全系列教程之(九)：將session上傳至mysql資料庫](https://www.zendei.com/article/74354.html) <br>
* [今晚我想來點 Express 佐 MVC 分層架構 DAY 08 - Express CORS](https://ithelp.ithome.com.tw/articles/10242452) <br>
* [如何在 Node.js 設定 CORS](https://note.pcwu.net/2017/03/16/nodejs-cors/) <br>

---

<!--ts-->
#### [目錄 ↩](#目錄)
<!--te-->

---

## 備註:

[^1]: 在這個範例中我們需要安裝部分套件，指令如下：<br>
`npm install express --save` <br>
`npm install cookie-parser --save` <br>
`npm install express-session --save` <br>
`npm install express-mysql-session --save` <br>
`npm install cors --save` <br>
`npm install mysql --save` <br>
因為這些套件已經有被安裝並整合在package.json中，所以這邊直接下**npm install --save**的指令就好
