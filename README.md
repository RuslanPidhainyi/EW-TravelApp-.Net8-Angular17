# Travel Application
> - Share photos of the places you've visited.
> - Connect with like-minded people and share experiences.
> - Discover new places.

## Contents

0. [Intro](#intro)
1. [For what purpose was TravelApp created and what problems does it solve?](#problems)
2. [About an App](#aboutaapp)
   - 2.0 [User registration](#register)
   - 2.1 [Login](#login)
   - 2.2 [Post and post details](#post)
   - 2.3 [My Profile](#myprofile)
   - 2.4 [Profile Editing](#myprofile-edit)
   - 2.5 [Adding a Post](#add-post)
   - 2.6 [Edit Post](#edit-post)
   - 2.7 [Delete Post](#delete-post)
   - 2.8 [Check My Profile](#check-my-profile)
   - 2.9 [Check Another Profile](#check-another-profile)
   - 2.10 [Like Posts](#like-posts)
   - 2.11 [Message](#message)
   - 2.12 [Logout](#logout)
   - 2.13 [Admin](#admin)
   - 2.14 [Validation](#valid)
3. [Technologies](#techn)


<a name="intro"></a>
## 0. Intro

TravelApp is a social network for travelers that allows users to share their travel experiences in the form of posts. The main idea of the project is to create a platform where one can find unique locations, obtain useful information about routes, expenses, and services, as well as communicate with other travelers.

Users can:

- Publish posts with photographs of unique places, information about the country, region, and route details.
- Add data about expenses (transportation, accommodation, entrance fees, guide services, etc.).
- Communicate with each other through the messaging system to clarify details or receive personalized advice.
- Plan trips using reliable and structured information from posts.

The platform simplifies the travel planning process and saves time by providing the opportunity to share real experiences and build a community of like-minded individuals.


<a name="problems"></a>
## 1. For what purpose was TravelApp created and what problems does it solve?

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
## 2. About an App

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
- 
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
### 2.6 Edit Post

https://github.com/user-attachments/assets/8a1aad17-7a21-4bee-9257-bc9980efecdd

<a name="delete-post"></a>
### 2.7 Delete Post

https://github.com/user-attachments/assets/53e282df-8fd6-4730-a6d9-c134fbe33005

<a name="check-my-profile"></a>
### 2.8 Check My Profile

https://github.com/user-attachments/assets/1fbcc7bd-8c9c-439a-a4ab-e5f68a899c81

<a name="check-another-profile"></a>
### 2.9 Check Another Profile

https://github.com/user-attachments/assets/a782f74f-d6c0-4e85-b328-4b55b5517e6a

<a name="like-posts"></a>
### 2.10 Like Posts - part 1

https://github.com/user-attachments/assets/f51fb5ba-6e3a-4a98-b82f-1abdf4188fb7

### 2.10.1 Like Posts - p2 (page Lists)

https://github.com/user-attachments/assets/e239afc8-a459-4f29-b344-fc164eebf596

<a name="message"></a>
### 2.11 Message - p1 (Sending a message)

https://github.com/user-attachments/assets/afabf7eb-bf94-4265-b1c4-303e4b44527b

### 2.11.1 Messaage - p2 (Notification & status online)

https://github.com/user-attachments/assets/5d32ac03-859d-45fc-a708-e40aa06883bf

### 2.11.2 Message - p3 (Unread, Inbox, OutBox)

https://github.com/user-attachments/assets/6afbd13b-dff0-407d-9704-db4f238067d8

<a name="logout"></a>
### 2.12 Logout - Daria

https://github.com/user-attachments/assets/70e39af0-84ae-4cf0-a2c1-d2f0316130c3

<a name="admin"></a>
### 2.13 Admin - p1 page admin (Moderator)

https://github.com/user-attachments/assets/333a42bb-4228-4a3c-a847-43e2069c672e

### 2.13.1 Admin - p2 page Erorrs

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

<a name="techn"></a>
## 3 Technologies

### Frontend:
   #### - Framework: 
                  Angular
   #### - Runtime environment: 
                  Node & NPM
   #### - Programming Languages:
                  JavaScript & TypeScript
   #### - Markup Language: 
                  HTML
   #### - Style Sheet Language: 
                  CSS & SCSS

### Backend:
   #### - Framework: 
            ASP .Net Core Web API
   #### - APIs: 
            RESTful API, WebSocket

### Database: 
   ### - SQL: 
            SQLite
   ### - SQL: 
            Microsoft SQL Server (SQL)

### Hosting:
            Cloudinary
