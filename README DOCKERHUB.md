สามารถ pull image ผ่าน dockerhub ได้ โดย docker pull neng0702/numer:web --image frontend
                                       docker pull neng0702/numer:api --image backend
หลังจาก pull ทั้งสองตัวแล้วใช้คำสั่งต่อไปนี้ docker run -p 80:3000 -d neng0702/numer:web | docker run -p 8080:8080 -d neng0702/numer:api สั่งทั้งสองคำสั่ง
