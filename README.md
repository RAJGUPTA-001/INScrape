#  INscrape

Can scrape any public profile and generate insights from scraped data, image processing using GOOGLE cloud for detail caption. 



## 📋 Table of Contents

- [Features](#features)

- [Installation](#installation)

- [Details](#details)

- [Credits](#credits)





# ✨ Features

 - scrapes data from public instagram profiles
 - displays post and video/reels on dashboard with original caption likes ,  comments and views count 
 - Load all images and data in real time so no need for storing media 







# 🛠️ Installation

### Prerequisites
(Suggested , to avoid any dependency issue)
- Node.js - v22.17.1
- npm - 11.6.1
- MongoDB - v8.2.0
- Python - 3.9.23

### Steps

#### Creating .env 

> make sure its in backend folder

PORT=3000||or your preferred port


NODE_ENV=production


MONGO_URL=mongodb://127.0.0.1:27017/your_database_name  


ENV_PATH= /path/to/virtual/enviroment/or/your/python/interpreter


GEMINI_API_KEY=[GET YOUR KEY FROM](https://aistudio.google.com/api-keys)















### run from terminal - 


1. **Clone the repository**:
   ```bash
   git clone https://github.com/RAJGUPTA-001/INScrape.git
   cd INScrape
   ```




> Consider making virtual enviroment for python interpreter
> you can use conda for management
> then provide the path for the enviremont at .env file 
> path will be like -  C:*miniconda3\envs\envname\python.exe   (if using conda)

from root run - 


(some unnecesary libraries are also included 😶)
   ```bash
   pip install -r requirements.txt
   ```



### Starting application
from root - 

```bash
npm run build
npm run start
```
> application at localhost:3000 
> or configure the port at .env file




# Details


IT fetches public instagrams profile data and stores it in database (local in this case)
stores the data and links to the media  
> links overtime get expire which will give  "NotSupportedError: Failed to load because no supported source was found."
it can be solved by fetching latest data  , its not necessary that all links will expire of any post .



The average stats of engagement is calculated on the last 12 post of user 

some bugs in here are :
  the slider when slided from left to right  even the center profile is not clicking but from right to left its working ,
  all of the right sides are working properly
  

  the console log for debugging are not replaced or commented out 



for side cars and video   AI analysis is not done  (Its not some bug )
video analysis for longer video can be done using fileapi from google cloud or any other api or local model 
sidecar post are not handeled  and they show only the display image of the post 
(sidecar are post instagram with multiple photos or videos)


the node edge_owner_to_timeline_media from the data has timeline posts and  edge_felix_video_timeline has igtv videos from the posts
the reels and side cars are on the edge_owner_to_timeline_media node.







# Credits 
  

https://github.com/kevmaindev







