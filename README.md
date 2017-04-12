Image search abstraction layer

A microservice to search images

it uses google custom search api, you need to generate your own api key and 
custom search engine id from google console.

db is stored in mlab.com, register and create your own.

User stories: 
-I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
-I can paginate through the responses by adding a ?offset=2 parameter to the URL.
-I can get a list of the most recently submitted search strings.

Usage:
https://imgsearchal.herokuapp.com/api/imagesearch/cats?offset=5
Output:
A json response with at leats 10 results(if offset is null)

Usage: 
https://imgsearchal.herokuapp.com/api/latest/imagesearch/
Output:
latest ten results
