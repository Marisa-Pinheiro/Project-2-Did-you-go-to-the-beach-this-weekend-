# Project2: Did you go to the beach this weekend?

## Description
The project is a website that features a comprehensive directory and map of the beaches in Portugal, along with a range of activities that visitors can enjoy. Users can create a profile to save their favorite beaches, add photos, and write comments and recommendations. The website also includes a filter feature to search for beaches based on location and activities, and users can rate beaches to create a list of the top-rated beaches in Portugal. Overall, the website serves as a valuable resource for travelers looking to explore the Portuguese coastline and take part in various activities.

## User stories

* *404* - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
* *500* - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
* *homepage* - As a user I want to be able to access the homepage and filter by type of beach, log in and sign up.
* *sign up* - As a user I want to sign up on the web page so that I can add favorite beaches to my list.
* *login* - As a user I want to be able to log in on the web page so that I can get back to my account.
* *logout* - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
* *favorites list* - As a user I want to see the list of my favorite and delete them.
* *edit user* - As a user I want to be able to edit my profile.
* *result* - As a user I want to see the list of beaches and activities filter by my search.
* *beach listing* - As a user I want to see pictures and location, and be able to search for more details of the beach and see if I visited or favourite it, or if it's on my wishlist.
* *beach profile* - As a user I want to be able to see other users comments and pictures, add my own, favourite, add to my wishlist or mark it as visited.

## Server routes
| Method | Route  | Description                             | Request - Body | 
|--------|--------|-----------------------------------------|----------------|
|  GET   | /      | Main page route. Renders home index view|                |
|  GET   | /login | Renders login form view.                |                |
|  POST  | /login | Sends Login form data to the server.    | { username, password }
|  GET   | /signup| Renders signup form view.
|  POST  | /signup| Sends Sign Up info to the server and creates user in the DB. | { username,email, password }
|  GET   | /private/edit-profile | Private route. Renders edit-profile form view.
|  PUT   | /private/edit-profile | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] }
|  GET   | /private/favorites | Private route. Render the favorites view.
|  POST  | /private/favorites/ | Private route. Adds a new favorite for the current user.    { name, cuisine, city, }
| DELETE | /private/favorites/:beachId | Private route. Deletes the existing favorite from the current user.
|  GET   | /beach | Renders beach-list view.
|  GET   | /beach/details/:id | Renders beach-details view for the particular beach. Option to add comments and photos.
|  POST  | /review/create/:id| Create a review of the specific beach and/or add picures.
|  POST  | /review/delete/:id| Delete previous action.

## Models
### User

```
{
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\S+@\S+.\S+$/, 'Please use a valid email address' ],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    }
  },
  favorites: [{
         type: Schema.Types.ObjectId,
         ref: 'Beach'
         }],
  reviews: [{
         type: Schema.Types.ObjectId,
         ref: 'Review'
         }],
  {
    timestamps: true
}
```

### Review

```
{
  placeId: String,
  author: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
  content: String,
  pictures: [String]
}
```

### Beach

```
{
        name: String, 
        description: String, 
        imageUrl: String
        rating: Number,
        directionsUrl: String,
        reviews: [{
        type: Schema.Types.ObjectId, 
        ref: 'Review'
     }]
    },
    {
        timestamps: true
}
```

## API's
#### Google Maps API


## Packages
#### Cloudinary


## Backlog's
#### See our [Trello](https://trello.com/invite/b/FFtZeToK/ATTI667d9197bfcf99fa3c4940268bc288ee48BF1726/did-you-go-to-the-beach-this-weekend) board


## Links
### Git
#### The url to your repository and to your deployed project:
Repository Link
Deploy Link

### Slides
#### The url to your presentation slides
Slides Link

## Contributors
#### Elnaz Farrokhi - [elnazfe](https://github.com/elnazfe)- [LinkdIn](https://www.linkedin.com/in/elnaz-farrokhi/)

#### Marisa Pinheiro - [Marisa-Pinheiro](https://github.com/Marisa-Pinheiro) - [LinkdIn](https://www.linkedin.com/in/marisa-pinheiro/)
