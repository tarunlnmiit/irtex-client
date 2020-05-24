# irtex-client

* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

* The branch **master** is deliverable for **milestone2**.

* The deployed project can be reached through https://irtex-client.herokuapp.com

* All the points mentioned in the file work on the above mentioned deployed project on heroku. In order to run the experimental features as of now, the instructions are available on the [Readme.md](https://github.com/tarunlnmiit/irtex-1.0/blob/milestone2/README.md) of [server repository](https://github.com/tarunlnmiit/irtex-1.0/tree/milestone2)

## setup dependencies

* Install node version 10.19.0 https://nodejs.org/en/blog/release/v10.19.0/

* Ensure the npm version bundled with node is 6.13.4 if it is not change the npm version https://www.npmjs.com/package/npm/v/6.13.4

* After the installation of node and npm is done, clone the repository
  
  `git clone https://github.com/tarunlnmiit/irtex-client.git`

  `cd irtex-client`

* Install angular dependencies

  `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Workings

* The frontend provides option to upload an image from the local system or provide an image URL. If the image is uploaded from the local system, it is directly uploaded without the click of any buttons and similar images are fetched. If the image URL is provided, then the *Search* button needs to be clicked

* The current version of frontend only shows images based on three parameters:
  1. Color Layout Descriptor
  2. Region Based Shape Descriptor (Zernike Moments)
  3. Combined results of the above two where for now we are just taking the average of the above 2 similarities.
  
* The top 200 images are fetched.

* The frontend has the option to filter the results based on the above defined 3 parameters by selecting any option from the Rank dropdown. By default it is combined results of the above two where for now we are just taking the average of the above 2 similarities.

* The frontend also provides option to change the number of results on a page (5, 10, 25, 100) along with pagination based on the number of results selected on a page.
