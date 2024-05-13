<p align="center">
  <img width="100%" src="_repo/logo.png">
</p>

# What this is

This is an opensource project, to study and try to organize media in a cool way. I`ve been using this for a while now, and decided to make it opensource so other people could use it to organize your personal stash of home-made movies and/or media. You can find the [backend here](https://github.com/chr0nu5/johnflix-api).

# How to use it

You need an instance of the API running, but this is just a sample frontend, made with (very) simple react to demonstrate how to consume the API and use it`s power. It will have a basic login system, and a check to see if the user os logged in, to show the pages. All the pages works well on desktop and mobile.

# Build

You should set a `env` var named `REACT_APP_API_URL` with the API endpoint base url.

# Deploy

In this repo, there is a sample pipeline file for github actions, to build and release this project using AWS S3 and AWS Cloudfront :)

```
npm install
npm start
```

# Screenshots

Here is a few samples of the routes and screens for this frontend. All the content displayed here are for demonstration porpuses.

## Home

<p align="center">
  <img width="100%" src="_repo/screens/1.png">
</p>

## Genres

<p align="center">
  <img width="100%" src="_repo/screens/2.png">
</p>

## Tags

<p align="center">
  <img width="100%" src="_repo/screens/3.png">
</p>

## Season

<p align="center">
  <img width="100%" src="_repo/screens/4.png">
</p>

## Updates

<p align="center">
  <img width="100%" src="_repo/screens/5.png">
</p>

## Watchlist

<p align="center">
  <img width="100%" src="_repo/screens/6.png">
</p>

## Player

<p align="center">
  <img width="100%" src="_repo/screens/7.png">
</p>

# Licence

```
Good Use Disclaimer License

This open-source project is provided under the Good Use Disclaimer License.
By accessing, cloning, or using any part of this project, you agree to
abide by the terms outlined in this license.

1. Good Use Requirement:
   You are permitted to use this project only for purposes that align with
   the principles of ethical behavior, respect for human rights, and
   promotion of societal well-being. Good use encompasses activities that
   contribute positively to society, foster collaboration, and adhere to
   legal and ethical standards.

2. No Responsibility for Misuse:
   The creator(s) of this project expressly disclaim any responsibility
   for its use in activities that are harmful, unethical, illegal, or 
   otherwise detrimental to individuals, communities, or society at 
   large. The user assumes full responsibility for ensuring that their 
   use of this project complies with applicable laws, regulations, and 
   ethical norms.

3. Limitation of Liability:
   In no event shall the creator(s) of this project be liable for any 
   damages, including without limitation, direct, indirect, incidental, 
   special, consequential, or punitive damages, arising out of the use 
   of or inability to use this project, regardless of the cause of 
   action or the theory of liability, even if advised of the possibility 
   of such damages.

4. No Endorsement:
   The presence of this project does not imply any endorsement or 
   affiliation with individuals, organizations, products, or services. 
   Any references to specific entities are purely for informational 
   purposes and do not constitute endorsements.

5. No Warranty:
   This project is provided on an "as is" basis, without warranties of 
   any kind, express or implied. The creator(s) of this project make no 
   representations or warranties regarding the accuracy, completeness, 
   or reliability of the information contained herein.

6. Acceptance:
   By accessing, cloning, or using any part of this project, you 
   acknowledge that you have read, understood, and agree to be bound 
   by the terms of this license.

7. Modification:
   The creator(s) of this project reserve the right to modify or update 
   this license at any time without prior notice. It is your 
   responsibility to review this license periodically for changes.

If you do not agree with these terms,
you are not permitted to access or use this project.
```
