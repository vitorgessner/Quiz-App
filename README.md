# ❓ Quiz App - project from roadmapsh

The project consists of implementing a quiz app. You can change the categories in which you answer the questions. It also contains statistics of correct and incorrect answers for each category. The idea was inspired by Roadmap.sh.

<img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" />
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />

While coding the app, I realised there was a big flaw I needed to fix: the API only lets you make requests every 5 seconds. So if a user answered a question quickly, they would have to wait between 1 to 5 seconds to get the next question. 

The solution I came up with was to fetch 50 questions at once (the maximum amount the API allows) instead of fetching only one per request. This way, every time the user answers a question, the next one appears instantly (when clicking "Next question", of course). 

Only after answering all 50 questions does the app need to load the next batch, and by then the 5-second limit has already passed, so it loads quickly.

I'm really glad with the solution I came up with and the work i've done, I also wasl able to practice and learn more about state management, which was great.

## 📸 Youtube Video:

[Quiz App on Youtube](https://www.youtube.com/watch?v=yDvyRcaLXaA)
