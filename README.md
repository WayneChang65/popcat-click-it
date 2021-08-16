# popcat-click-it
popcat-click-it 是一個自動點擊[POPCAT](https://popcat.click/)的程式。  
popcat-click-it is a program designed to click [POPCAT](https://popcat.click/) automatically.  
![image](https://raw.githubusercontent.com/WayneChang65/popcat-click-it/master/img/001.png)  

## 這個程式能做什麼呢？ (What can it do ?)  
這程式有二種執行模式，一種是**Click Mode**，一種是**High Efficiency Mode**。  
This Program has 2 modes(**Click Mode** and **High Efficiency Mode**).  
### Click Mode, 利用模擬點擊方式進行 (by simulating click motion)  
* 自動點擊  
Click automatically
* 顯示點擊速度，如：ms/click 或 pps  
Display click speed. e.g. ms/click or pps  
* 每10萬次自動截圖一次  
Screenshot every 100,000 clicks  
* 使用puppeteer技術，可以無頭(headless)。內定在linux os無頭，在其他os有頭  
This project uses puppeteer. It can be headless. (in linux os is headless by default)  
![image](https://raw.githubusercontent.com/WayneChang65/popcat-click-it/master/img/002.png)  
![image](https://raw.githubusercontent.com/WayneChang65/popcat-click-it/master/img/003.png)  

### High Efficiency Mode, 利用模擬直接呼叫POPCAT API (by calling POPCAT API directly)
* 每30秒送點擊800次出去。速度大約27 PPS。  
Call API 1 time for sending 800 clicks. The speed about 27 PPS.  
* 使用puppeteer技術，可以無頭(headless)。內定在linux os無頭，在其他os有頭  
This project uses puppeteer. It can be headless. (in linux os is headless by default)  
![image](https://raw.githubusercontent.com/WayneChang65/popcat-click-it/master/img/004.png)  
![image](https://raw.githubusercontent.com/WayneChang65/popcat-click-it/master/img/005.png)  

## 如何使用？ (How to use it?)  

### Node.js
1. 於Github下載專案程式檔  
Download project from Github
```
  git clone https://github.com/WayneChang65/popcat-click-it.git
```
2. 利用 npm 下載相依套件  
Use npm to install dependencies
```
cd popcat-click-it
npm install
```
3. 執行程式  
Run program  
* Click Mode  
```
npm start
```  
* High Efficiency Mode
```
npm run high
```

### Docker Container
1. 從[Dockerhub](https://hub.docker.com/)下載docker image  
Download docker image from [Dockerhub](https://hub.docker.com/)  
* Click Mode  
```
docker pull waynechang65/popcat-click-it:cl-1.0.0
```  
* High Efficiency Mode  
```
docker pull waynechang65/popcat-click-it:hi-1.0.0
```  
2. 由下載的docker image建立docker container  
Run docker container by the downloaded image  
* Click Mode  
```
docker container run waynechang65/popcat-click-it:cl-1.0.0
```  
* High Efficiency Mode  
```
docker container run waynechang65/popcat-click-it:hi-1.0.0
```  

## 兩個模式的差異 (Difference between 2 modes)  
### Click Mode  
* Speed about 10-12 PPS (real time measure by moving average with size 10)  
* CPU, high consuming  
* Feeling, like really click the button and get good messsages display out  

### High Efficiency Mode
* Speed about 27 PPS (estimation by 800 clicks per 30 seconds)  
* CPU, low consuming  
* Feeling, well, like a zombie, not fun ~  

### 參考 (Reference)  
* [https://hackmd.io/HU0nqTPwQAe3USd0705Lsw?view](https://hackmd.io/HU0nqTPwQAe3USd0705Lsw?view)

## 貢獻一己之力 (Contribution)
popcat-click-it 雖然是一個小模組，但本人還是希望這個專案能夠持續進步！若有發現臭蟲(bug)或問題，請幫忙在Issue留言告知詳細情形。  
歡迎共同開發。歡迎Fork / Pull Request，謝謝。:)  

Even though popcat-click-it is a small project, I hope it can be improving. If there is any issue, please comment and welcome to fork or send Pull Request. Thanks. :)
