/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* loops through each feed in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it ('All feeds URLs are defined and are not empty', function(){
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(0);
            });
        });

        /* loops through each feed in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('All feeds have names and names are not empty', function(){
            for(let i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function(){

        /* ensures the menu element is hidden by default. 
         */
        it('is hidden by default', function (){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /*  ensures the menu changes visibility when the menu icon is clicked. This test
          * has two expectations: Show and Hide
          */
        it('shows or hides when clicked', function(){
            let hamBurger = $('.menu-icon-link')
            hamBurger.click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            hamBurger.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        }); 
    });

         

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        /* ensures when the loadFeed function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
       
        beforeEach(function (done){
            loadFeed(0, done);
        });

        it('feed has at least a single entry', function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

    });
        
    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        /* ensures when a new feed is loaded by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var previousFeed;
        beforeEach(function (done){
            loadFeed(0, function(){
                previousFeed = $('.feed').html();
                loadFeed(1, done);
            });
        });

        it('when loaded content changes', function(){
            expect($('.feed').html()).not.toBe(previousFeed);        
        });
    });

        
}());
