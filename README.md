# Blog Website Project

## Overall Requirements

- There are three user roles. Admin, managers, users. And also there are guests who are not logged in.
- Admin can manage everything – users, articles and categories.
- Managers can only manage articles.
- Admin, managers can do whatever user does.
- Guest can view only few articles.
- All users can view articles
- There should be CRUD APIs for all.
- /articles/home API should return articles for the categories and users they have followed, for guest users, they should return latest 5 articles. If user doesn’t have any follows, it should return latest 5 articles.
- GET /articles API should support sort by latest, number of comments, and number of favorites, search by title.

## User

- User has a username, name, bio, profile photo. Username should be unique. It should only contain English lowercase letters, numbers, underscore.
- Create a separate endpoint for uploading profile photo.
- On register page, user has to provide username, name and password. Profile photo optional.
- On profile page, user can update name, bio, profile photo.
- In change password page, they can change their password.
- Users can post new articles
- Users can follow categories, or they can also follow other users.
- User should be able to see his followers.

## Categories

- Admin can create category. Category doesn’t have a tree structure.
- Category has only a title.

## Article

- Article has title, category, a list of tags, content
- Users can create a new blog and publish immediately, or they can mark them as draft and publish later.

## Comment

- User can comment on an article.

## Favorite

- User can like an article.

## Notification

- When a user favorite an article, the author of the article should get a notification. The notification should look like this. “Smith liked your article – title of article”
- When a user comment on an article, the author of the article should get notification “Smith commented on your article.”
- When someone write comment and mention some user, the user should get notification as well. “Smith mentioned you on his comment”
- When a user log in, he should be able to see the notifications.
- When the user click on specific notification, it should redirect to the article page.

## Delete Article, Category, User all should be done with soft delete

## Contributor

#### [Shine](https://github.com/shinevue)
#### [Truestar](https://github.com/Luis96920)
#### [Yonex](https://github.com/mcyandex)
#### [Luckystar](https://github.com/techietrend)
#### [Achilles](https://github.com/oleh1010)
#### [Chivalrousdev](https://github.com/chivalrousdev)
#### [CreativeMan](https://github.com/creative2113)
#### [Virus](https://github.com/gitMan-stack)
#### [Baymax](https://github.com/techietrend)
#### [Joel](https://github.com/joellake992)
#### [BlackGhost](https://github.com/blackghost2693)

