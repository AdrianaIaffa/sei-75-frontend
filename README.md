**Timeframe**<br>
7 days solo project

Technical Requirements:<br>
-Have at least 2 data entities (data resources) in addition to the User Model<br>
-One main functional entity and another with a One:Many or Many:Many relationship (embedded or referenced).<br>
-Use OAuth authentication.<br>
-Implement basic authorization<br>
-Restrict access to features requiring a logged-in user (CUD data operations) using the ensureLoggedIn middleware.<br>
-Allow editing and deletion of a data resource only by the user who created it.<br>
-Have full-CRUD data operations somewhere within the app's features.<br>
-Be styled for a polished user interface<br>
-The app should resemble the look and feel of daily-use applications.<br>
-Be deployed online<br>


**Technologies Used**<br>
-Outfit Forecast is built using the MEVN (MongoDB, Express, Vue.js, Node.js) stack, and it utilizes a RESTful API for seamless data retrieval and management.<br>
-MongoDB: Database to store your wardrobe data.<br>
-Express.js: Backend framework for handling API requests.<br>
-Vue.js: Frontend framework for creating a user-friendly interface.<br>
-Node.js: Runtime environment for server-side code.<br>
-Git/Github<br>
-Imgur to store and upload images<br>
-Coolors<br>
-Netlify<br>

**Deployed Version**<br>
https://stupendous-truffle-16e88c.netlify.app/login

**Wireframe**<br>
I plan the website using trello. This was my first time planning a website and I guess I wasn't sure what would be the best way to do so. I tried trello for this project as it seemed like a goo didea at the time. I can move the cards
around and I can add more notes in each if I want to, which is quite handy. I am still figuring out whats the best tool for me.
![Screenshot 2023-12-11 at 14 34 32](https://github.com/AdrianaIaffa/sei-75-frontend/assets/100214999/ecdb2d25-8179-485a-9ed7-f52a6bf586ce)


**Code Installation**<br>
Clone or download repo<br>
Instal npm<br>
Start with npm run serve<br>
Backend node server.js<br>

I wanted to create the website imagined in the clueless film, where you can pick an outfit for the day through a computer. I love fashion but also I want to create an app that has sustainability at its core. By digitising your wardrobe you can always access what you have, keep track of all your items and create new outfit ideas on the go
![Screenshot 2023-12-11 at 14 44 33](https://github.com/AdrianaIaffa/sei-75-frontend/assets/100214999/81ed0d5f-b8d6-465e-b3d7-19ade0b7c0c2)



This is my first full stack project.<br>

Day 1 was spent planning. I made a rough planning of my project on trello and moved to the database
I wanted to have a schema based on uploading the images and categorising them  with a drop down menu. By presetting the categories it was easier to create an outfit later of as it would be divided in 5 tops', 'bottoms', 'outwears', 'accessories', 'shoes' and those then where sub categorised 'long sleeve', 'short sleeve', 'sleeveless', 'skirts', 'shorts', 'trousers', 'coats', 'jackets', 'bags', 'scarfs', 'headwear', 'boots', 'shoes', 'sandals'.

Day 2/4 was spend creating the endpoints of the back end and connecting those to the front end. I found this pretty challenging as the wardrobe items were linked to a user id, so I only wanted to display what the user had uploaded to their account. I did that by linking the user schema and referencing it on my wardrobe schema. The biggest issue I faced was uploading images. I tried to add Cloudinary to upload my images but I could not make it work. After spending most of a day trying to figure it out, I abandoned it and decided to use Imgur instead. So when I upload the images, I am uploading the link to imgur. Once uploaded i created a preview so the user can see the image uploaded.

Days 5/6
Once I had the wardrobe items uploaded and I had my wardrobe done, I added the outfit schema. It needed to retrieve all the items for a specific user and then map through them to create a new array with the items chosen to create an outfit.

    app.post('/outfitPlanner/:userEmail', async (req, response) => {
    const itemData = req.body;
     console.log(itemData)
    const findUserid = await User.findOne({ "userEmail": itemData.useremail })
    console.log("outfitplanner", findUserid)

    const newOutfit = new Outfit({
        outfitName: itemData.outfitName,
        selectedItems: itemData.selectedItems.map(item => item._id),
        userId: findUserid,
    });
    console.log(newOutfit);
    newOutfit.save()
    .then(() => {
        response.sendStatus(200)
    })
})

Days 7 8 
I added a blog schema. I wanted the blog to be accessed only by the page admin but I never got the chance to create a separate login and add admin features. But since I had a blog I ended up using it anyway as I thought it would be a nice touch. There is an addblogpost end point that is not linked but exist.


The rest of the time was  spent on the UI and the styling of the page, which I wanted for it to look as much like an e-commerce website, as I thought it would be nice to feel like you are “shopping” through your wardrobe.

This project was part of a much bigger idea, where you could potentially track the usage of your garments and those that were not used as much could be moved to the marketplace where users could exchange items, rather than discarding them. I also wanted a where to recycle page, showing your closest recycling points for clothing. I envisioned this as a one stop application for fashion conscious people who want to be more sustainable in their approach to fashion.
![Screenshot 2023-11-27 at 09 42 02 (2)](https://github.com/AdrianaIaffa/sei-75-frontend/assets/100214999/5007152f-6016-48c6-a50a-182ce7e55fc3)
![Screenshot 2023-11-27 at 09 42 27 (2)](https://github.com/AdrianaIaffa/sei-75-frontend/assets/100214999/f32f3e27-9bd2-40f1-bf05-6cf5fd05487e)
![Screenshot 2023-11-27 at 09 42 53 (2)](https://github.com/AdrianaIaffa/sei-75-frontend/assets/100214999/cb82e713-e86d-4663-92e1-79830b03eef0)
![outfitfor![Screenshot 2023-11-27 at 09 43 24 (2)](https://github.com/AdrianaIaffa/sei-75-frontend/assets/100214999/e868fe9c-6ce9-40e3-abbe-0fa080b5ced5)
ecast](https://github.com/AdrianaIaffa/sei-75-frontend/assets/100214999/b974b38e-54bb-421f-8fd2-b07a9c6022c6)



Takeaways from this project.<br>
I underestimated the amount of work that was needed for the most basic part of this application. I would have loved to create a much more complex idea, but I found connecting the backend to the front end an absolute nightmare! I kept getting stuck because I didnt know how to send my id from the front end to the backend. I had quite a lof of help from my teacher on that aspect of my project. My backend is full of notes but I needed to add them to explain myself how things work. But this was my frist CRUD app and I am really excited about how it came out. I had a pretty strong idea on how I wanted things to work, which meant that the planning and visualising was easy. I also had a few bugs where I couldnt see the log in nav bar once the user had logged in so I had to create a window redirect which is not ideal but I guess it works.
I also spend an entire day doing the styling, using my photography portfolio as content and it just made me realised how much I love CSS and doing the desing!




# project-frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
