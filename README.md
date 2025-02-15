# Travel Application 🧗
> - Share photos of the places you've visited.
> - Connect with like-minded people and share experiences.
> - Discover new places.


## Contents 📋

0. [Intro](#intro)
1. [For what purpose was TravelApp created and what problems does it solve?](#problems)
2. [About an App](#aboutaapp)
   - 2.0 [User registration](#register)
   - 2.1 [Login](#login)
   - 2.2 [Post and post details](#post)
   - 2.3 [My Profile](#myprofile)
   - 2.4 [Profile Editing](#myprofile-edit)
   - 2.5 [Adding a Post](#add-post)
   - 2.6 [Editing a Post](#edit-post)
   - 2.7 [Deleting a Post](#delete-post)
   - 2.8 [Viewing Your Own Profile](#check-my-profile)
   - 2.9 [Viewing Someone Else's Profile](#check-another-profile)
   - 2.10 [Liking a Post](#like-posts)
   - 2.11 [Messaging](#message)
   - 2.12 [Logout](#logout)
   - 2.13 [Admin](#admin)
   - 2.14 [Validation](#valid)
3. [Design](#dsgn)
   - 3.0 [Diagrams](#diagrams)
   - 3.1 [Mockups](#mockups)
4. [Application security](#security)
5. [Implementation](#impl)
6. [Technologies](#techn)



<a name="intro"></a>
## 0. Intro 👁️👁️

TravelApp is a social network for travelers that allows users to share their travel experiences in the form of posts. The main idea of the project is to create a platform where one can find unique locations, obtain useful information about routes, expenses, and services, as well as communicate with other travelers.

Users can:

- Publish posts with photographs of unique places, information about the country, region, and route details.
- Add data about expenses (transportation, accommodation, entrance fees, guide services, etc.).
- Communicate with each other through the messaging system to clarify details or receive personalized advice.
- Plan trips using reliable and structured information from posts.

The platform simplifies the travel planning process and saves time by providing the opportunity to share real experiences and build a community of like-minded individuals.


<a name="problems"></a>
## 1. For what purpose was TravelApp created and what problems does it solve? 🔭

- The lack of a specialized platform for sharing unique experiences:

Travelers who visit little-known and rare places had limited opportunities to share their experiences with an interested audience. 
Traditional social networks do not always provide the necessary structure for a detailed description of the specifics of a journey.


- Lack of reliable information on safety and logistics:

The need for travelers to obtain up-to-date data on road conditions, regional safety, accommodation options, transportation,
and other details—especially during times of war or pandemics—remained unmet.

- Difficulty in finding like-minded individuals and organizing joint excursions:

Travelers found it challenging to locate kindred spirits, discuss routes, receive advice, and even organize group trips.
This created barriers for beginners or those traveling to unfamiliar places.

- The absence of a centralized source for travel planning:

Gathering information about places, routes, expenses, and services (such as guides, transport, accommodation) from various sources took a lot of time and resources, and could also contain inaccuracies. Searching for specific information required significant effort and often led to situations where the data was fragmented or incomplete.

TravelApp solves this problem by providing a centralized platform where all the necessary experience and information are collected in one place – in a single user post. Such a post presents a lot of clear and structured information:

Route details – from path descriptions to advice on optimal routes.
Photographs – visual confirmation of the uniqueness of the place.
Expenses and logistics – information about local transport, price ranges, travel time, as well as fees for entry, accommodation, the availability of shops, and guide services.
Moreover, if necessary, the user can directly contact the post's author through the TravelApp messaging system to ask additional questions or clarify travel details. This enables users to receive personalized advice from someone who has already visited the place, significantly saving time and effort when planning their next trip.


<a name="aboutaapp"></a>
## 2. About an App ℹ️

<a name="register"></a>
### 2.0 User registration

https://github.com/user-attachments/assets/8272f388-a7b9-47a9-9ba9-d2df22bd606e

In order to register, you need to go to the Registration page as shown in the video. Then select your gender and fill in fields such as Username, Known As, Date of Birth, City, Country, Password, and Confirm Password. After completing these fields, click on the "Register" button. You will be redirected to the publications page and will immediately receive a notification that the user has been successfully registered.

<a name="login"></a>
### 2.1 Login

https://github.com/user-attachments/assets/c9aaf44f-2b54-402d-ba09-74c1a652a0e9

First Way of Logging In - To log into the system, you must first be registered. If you are registered, you can proceed to the login page. There, enter your username and current password, then click the "Log In" button. You will be redirected to the main page and immediately receive a notification that the user has been successfully logged in.

Additionally, you can use the eye icon in the form to toggle password visibility. This feature has been implemented for the user's convenience.

### 2.1.1 Login - via the Navigation Bar

https://github.com/user-attachments/assets/cfbd3d97-291f-4dc2-95bc-9e0f68c8bb3e

Second Way of Logging In via the Navigation Bar - To log in using the navigation bar, you need to enter the same credentials as in the first method to access the system. There is also an eye icon feature that allows the user to view the password in case any issues arise. This navigation bar is dynamic, allowing you to log in even from the Registration page.

<a name="post"></a>
### 2.2 Post and post details

https://github.com/user-attachments/assets/17daa42d-49d9-46c1-8d7a-b0dff06989de

You have a page with posts where you can scroll through a feed of publications. If you want to view detailed information about a specific post, simply click on it with the left mouse button, and you will be taken to a page with expanded details about that post.

In the detailed view of the post, you will see:

- A photograph from the trip.
- The location of this place: country and region.
- The name of the place.
- The last visited location before the start of the journey: country and city, or the point from which the journey began.
  
Additional details may also be included in the post:

- Use of local transportation – information on how the author reached the starting point of the trip and how many hours the journey took.
- Paid entry – if visiting the place required payment, the cost is specified.
- Accommodation – details about the types of lodging the author used (for example, hostel, camping, hotel) and the expenses involved.
- Grocery store – if the author visited a grocery store during the trip, this information may be reflected in the post.
- Guide services – if guide services were used, relevant information is also provided.

In addition, the post’s author specifies the currency used for payments during the trip. The user also has the option to add their own description of the place, sharing impressions and additional details.

<a name="myprofile"></a>
### 2.3 My Profile

https://github.com/user-attachments/assets/84bf2536-e162-42c6-971b-caaa7c8747a8

To navigate to your own profile, you can do this in two ways:

First Method:

- In the navigation bar, click on the "Welcome" button.
- A dropdown menu will appear, which includes a "Profile" option.
- Click on the "Profile" option, and you will be taken to your profile page.

Second Method:

- In the navigation bar, click on your avatar using the left mouse button.
- The system will immediately redirect you to your profile page.

<a name="myprofile-edit"></a>
### 2.4 Profile Editing – Part One (Adding Photos)

https://github.com/user-attachments/assets/e6c08747-2a19-40d8-8048-882df21c7ac4

To edit your profile, click the "Edit Profile" button located on the lower left above your avatar, as shown in the video. The system will redirect you to the profile editing page, where you can add photos and customize your avatar that will represent your profile to other users.

### 2.4.1 Profile Editing – Part Two

https://github.com/user-attachments/assets/94a50fb2-7eb0-4143-a389-bf36c188ff39

Additionally, while editing your profile, you can describe yourself, list your interests, and specify your location.

To save your changes, click the "Save Changes" button located on the lower left above your avatar, as shown in the video.

<a name="add-post"></a>
### 2.5 Adding a Post - way 1

https://github.com/user-attachments/assets/4a5530e1-4fe9-4e87-9837-1d6171adcc2e

First Method to Create a Post - To create a post, follow these steps:
   1. Navigate to your profile page.
   2. In the center of the page, you will find a button with a plus sign and the text above it: "What to share your journey?"
   3. Click this button.
The system will then direct you to the post creation page.

When creating a post, you can detail your journey by including the following elements:

- Photograph from the trip – the main image that illustrates your impressions.
- Location – specify the country and region of the place you visited, as well as its name.
- The last visited location before starting the journey – mention the country and city, or the exact point from which your journey began.

In addition, you may include extra information in the post:

- Use of local transportation: Describe how you reached the starting point of your journey and how long it took.
- Paid entry: If visiting the place required payment, note the amount or cost.
- Accommodation: Detail the types of lodging you used (e.g., hostel, camping, hotel) and the associated expenses.
- Grocery shopping: If you shopped for groceries during the trip, you can reflect that as well.
- Guide services: If you used guide services, provide the relevant information.

The post’s author also specifies the currency used for payments or purchases during the trip. Equally important is adding your own description of the place, sharing impressions and additional details to help other users better understand your experience.

### 2.5.1 Adding a Post - way 2

Alternatively, you can create a post through the navigation bar on the right side of the page. Click on "Welcome", and you will immediately see a dropdown menu with the "Share Post" option.

https://github.com/user-attachments/assets/e5f9cdc5-0370-4b0b-a9df-55c8b36486c2

https://github.com/user-attachments/assets/1789ce9f-5b43-4dcb-a213-f347e0ad2064

<a name="edit-post"></a>
### 2.6 Editing a Post

https://github.com/user-attachments/assets/8a1aad17-7a21-4bee-9257-bc9980efecdd

To edit a post, follow these steps:

   1. Go to your personal profile and find the post you want to edit.

   2. Click on the edit icon on the selected post.

   3. On the edit page, you can update the following details:

   - Location: Specify the country, region, and the name of the place you visited.
   - Last visited location before starting the journey: Indicate the country, city, or point where your journey began.
   - Use of local transportation: Describe how you reached the starting point of your journey and how long it took.
   - Paid entry: If visiting the location required payment, specify the amount or cost.
   - Accommodation: Describe the types of lodging (e.g., hostel, camping, hotel) you used and the associated expenses.
   - Grocery shopping: If you visited grocery stores during your trip, include that information.
   - Guide services: If you used guide services, provide the relevant details.

   5. You can also edit the currency you used for payments or purchases and update the post description, sharing your impressions and additional details.

   6. To save the changes, click the "Edit Post" button.

<a name="delete-post"></a>
### 2.7 Deleting a Post

https://github.com/user-attachments/assets/53e282df-8fd6-4730-a6d9-c134fbe33005

To delete a post, go to your personal profile and find the desired post. Click on the delete icon within that post.

<a name="check-my-profile"></a>
### 2.8 Viewing Your Own Profile

https://github.com/user-attachments/assets/1fbcc7bd-8c9c-439a-a4ab-e5f68a899c81

You can view detailed information about yourself in the About tab. There, you can see your photos and read the information you provided about yourself, including your description, your interests, and your location.

<a name="check-another-profile"></a>
### 2.9 Viewing Someone Else's Profile

https://github.com/user-attachments/assets/a782f74f-d6c0-4e85-b328-4b55b5517e6a

When viewing another user's profile, you gain access to publicly available information that the user has chosen to share. This may include:

- Personal Data and Description: You will see their description, interests, and possibly their location if provided.
- Photos: Access to photos from their travels or other events that the user has shared.
- Posts: A list of posts made by the user, with the ability to view detailed information about each publication.
- Messenger: The profile may include an option to send a message to this user. This makes it easy to contact them directly to discuss common interests or other topics.

<a name="like-posts"></a>
### 2.10 Liking a Post

https://github.com/user-attachments/assets/f51fb5ba-6e3a-4a98-b82f-1abdf4188fb7

You can like a post in several ways:

- Click the "like" button directly on the chosen post.
- Go to the detailed view of the post and click the "like" button there.

### 2.10.1 Liking a Post - (page Lists)

https://github.com/user-attachments/assets/e239afc8-a459-4f29-b344-fc164eebf596

All liked posts are saved on the Lists page. 

In this video, I demonstrate how to unlike a post. When you remove a like, the post is not immediately removed from the saved list. This means that the post will remain in the list until you refresh the page, even if you no longer like it. Thus, you can continue interacting with the post until the page is updated.

<a name="message"></a>
### 2.11 Messaging

https://github.com/user-attachments/assets/afabf7eb-bf94-4265-b1c4-303e4b44527b

Users can message each other. To start a conversation, go to the profile of the person you want to chat with. Then:

   - Use the "Message" tab located in the center to open the chat.
   - Or click the "Send a message" button, after which you will be taken directly to the chat and can begin communicating.
An example of this process is shown in the video.

### 2.11.1 Message - (Notification & status online)

https://github.com/user-attachments/assets/5d32ac03-859d-45fc-a708-e40aa06883bf

Users who are currently online have green badges indicating their online status. Additionally, when you receive a message, a blue notification will appear in the bottom right corner of the screen. An example is shown in the video.

### 2.11.2 Message - (Unread, Inbox, OutBox)

https://github.com/user-attachments/assets/6afbd13b-dff0-407d-9704-db4f238067d8

<a name="logout"></a>
### 2.12 Logout

https://github.com/user-attachments/assets/70e39af0-84ae-4cf0-a2c1-d2f0316130c3

When you log out of the system, you receive a notification.

<a name="admin"></a>
### 2.13 Admin - page admin (Moderator)

https://github.com/user-attachments/assets/333a42bb-4228-4a3c-a847-43e2069c672e

### 2.13.1 Admin - page Erorrs

https://github.com/user-attachments/assets/f0486e5a-7974-42fa-a459-7854f5c7849c

<a name="valid"></a>
### 2.14 Valid - page Register

https://github.com/user-attachments/assets/a1360757-ef03-408c-aa04-8dccac29a962

### 2.14.1 Valid - page Login

https://github.com/user-attachments/assets/7ab8e6a1-04ab-49ac-b30f-15f8dd2bb6c9

### 2.14.2 Valid - Add post

https://github.com/user-attachments/assets/81ab9426-374e-4542-9336-1d885907e437

### 2.14.3 Valid - Like own post

https://github.com/user-attachments/assets/6c16f5fd-dd35-4915-a3fd-2657f65d58eb

### 2.14.4 Valid - Edit post

https://github.com/user-attachments/assets/c0b7ea9a-84d3-4559-9516-f16a0ae27a06

<a name="dsgn"></a>
## 3 Design 🗃️ 

<a name="diagrams"></a>
### 3.0 Diagrams 📊:

   #### - Use Case Diagram
   ![(Use-Case-Diagram)TravelApp vpd](https://github.com/user-attachments/assets/f0367b8e-144a-49e4-b078-06e4f8d414d3)

   ### - Class Diagram
   ![(Diagram Class)TravelApp](https://github.com/user-attachments/assets/594a7cab-d96d-4557-94dc-411e3db1f6b1)

   ### - Entity–Relationship Diagrams (SQLite & MSSQL)
      SQLite - DBeaver
   ![ERD-travel db](https://github.com/user-attachments/assets/4ed2691f-56b9-4dc7-8dc2-b4807ff3100c)

      MSSQL - Microsoft SQL Server Management Studio
   ![Screenshot 2024-12-30 221430](https://github.com/user-attachments/assets/aeb768ee-8161-4adc-b423-364b51830803)
   
<a name="mockups"></a>
### 3.1 Mockups 🎨:

- Login page
![image](https://github.com/user-attachments/assets/b5d59755-d204-4e83-84a7-bfe74340e5af)

- Register page
![image](https://github.com/user-attachments/assets/a9141341-a450-4c89-9dd0-2052fb2bed1d)

- Offers page (Main page)
![image](https://github.com/user-attachments/assets/46963e9d-79ec-4668-9eb7-6fe592d7a3de)

- Offers/[detail]
![image](https://github.com/user-attachments/assets/5c1161b4-dd5e-4a36-844f-cea10461b715)

<a name="security"></a>
## 4 Application security 🔒
In the project, I decided to use various mechanisms and technologies to enhance the application's security. Below, I list the technologies I have chosen to use.
   - HTTPS
   - Token JWT
   - CORS
   - ASP .Net Core Identity
   - Form validation
   
<a name="impl"></a>
## 5 Instructions for installing the application locally ☕️:
1. To run the application locally, you first need to clone the repository from GitHub using the link below.
   https://github.com/RuslanPidhainyi/EW-TravelApp-.Net8-Angular17
   
2. To start the ASP.NET Core server, you need to install the .NET 8 SDK packages, which can be found at the link below.

   https://dotnet.microsoft.com/en-us/download/dotnet/8.0
   
3. To add the application's HTTPS certificate to the system's trusted certificates list, navigate to the API directory in the terminal and execute the following commands:
   - „ dotnet dev-certs https --clean ”
   - “ dotnet dev-certs https --trust ”
   
4. To run the application correctly, you need to apply migrations. This can be done using the Entity Framework Core Command-line Tools, which can be installed with the following command in the terminal.
   - „ dotnet tool install --global dotnet-ef ”
     
5. Installing Node.js is required to use the npm tool.
   https://nodejs.org/en/download
   
6. Once the npm tool is available, you need to install Angular using the following command:
   - „ npm install -g @angular/cli ”
     
In case of errors, you can try executing the following command to resolve them:
   - „ Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass ”
     
And try again:
   - „ npm install ”

7. The next step will be to add the SSL certificate. In the command prompt (opened as administrator), navigate to the frontend directory of the application and execute the commands listed below:
   - „ choco intsall mkcert ” 
   - „ mkdir ssl ” 
   - „ cd ssl ” 
   - „ mkcert localhost ”
   
   Example of correctly executed SSL certificate addition commands:

   ![image](https://github.com/user-attachments/assets/0d805e96-5820-4ef3-8b8a-970e18ea975f)

8. While in the command prompt, you should also install mkcert with the following command:
   - „ mkcert -install ”

After successfully completing the installation, restart the computer.

9. To configure the MSSQL database, you need to specify the name of the local server in the 'appsettings.Development.json' file. Below is a screenshot showing an example of the modified server name.

![image](https://github.com/user-attachments/assets/d7e9dc47-514b-4afa-a5fc-7ebfc0627f6c)

10. Cloudinary 
   TODO

11. You can create a migration by executing the following command:
    - „ dotnet ef migrations add InitialCreate --output-dir Data/Migrations ”
    
    However, it is only the command " dotnet ef database update " that will create the database. Below is a screenshot showing an example of the newly created database.

    ![image](https://github.com/user-attachments/assets/e2f923dd-5930-43b4-adc2-74649c54aaf4)

12. After completing the previous steps, the application is ready to be launched.
- On the backend: " dotnet run "
- On the frontend: " ng serve "

Below are screenshots showing the launch of the frontend and backend servers.

  ![image](https://github.com/user-attachments/assets/1bce86f1-09b6-4dc7-9112-df65eeff6382)
  
  ![image](https://github.com/user-attachments/assets/4702294a-3631-4528-8c03-c0e0a3d96599)
  
  After starting the servers, you need to go to the URL in the browser window

13. After starting the servers, you need to go to the URL https://localhost:4200/ in the browser window, and the application will be launched

<a name="techn"></a>
## 6 Technologies 📚

### Frontend:
   #### - Framework: 
      Angular
   #### - Runtime Environments: 
      Node.js
   #### - Package Manager
      NPM
   #### - Programming Languages:
      JavaScript
      TypeScript
   #### - Markup Language: 
      HTML
   #### - Stylesheet Language: 
      CSS & SCSS

### Backend:
   #### - Framework: 
      ASP .Net Core Web API
   #### - Runtime Environments: 
      .Net Core
   #### - Package Manager
      NuGet
   #### - Programming Languages:
      C#
   #### - APIs: 
      RESTful - API
      WebSocket - computer communications protocol

### Database: 
   ### - SQL: 
      SQLite
      Microsoft SQL Server

### Protocol:
      HTTPS (SSL/TLS)

### Hosting:
      Cloudinary
      
### Tests:
      K6

### Version Control System & Platform:
      Git & GitHub

### DevOps:
      Jira 

### Others:
      Postman
      Figma
      VisualParadigm

### IDEs:
      Visual Studio
      Visual Studio Code
      Microsoft SQL Server Management Studio
      DBeaver

### Libraries:
      font-awesome
      mkcert
      ngx-bootstrap --component dropdowns
      ngx-toastr
      ng-gallery
      ngx-spinner
      ng2-file-upload
      ngx-timeago
      SignalR
      AutoMapper
      CloudinaryDotNet
      Microsoft.AspNetCore.Authentication.JwtBearer
      Microsoft.AspNetCore.Identity.EntityFrameworkCore
      Microsoft.EntityFrameworkCore.Design
      Microsoft.EntityFrameworkCore.Sqlite
      Microsoft.EntityFrameworkCore.SqlServer
      Swashbuckle.AspNetCore
      System.IdentityModel.Tokens.Jwt   
