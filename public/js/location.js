/* JS Document */


$(document).ready(function() {
  "use strict";

  /*

  1. Vars and Inits

  */

  var header = $('.header');
  var menuActive = false;
  var menu = $('.menu');
  var burger = $('.hamburger');

  var x = document.getElementById("locationtest");



  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {


    $.post("/test", {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }, function(data) {
      console.log(data);
      data.forEach(function(url) {
        console.log(url['id']);
        $.get("/locationBasesLatest/" + url['id'], function(parents) {
          console.log(parents['title'])
          var txt1 = "<div class='side_post'><a href='/latest'" + url['id'] + "''><div class='d-flex flex-row align-items-xl-center align-items-start justify-content-start'><div class='side_post_image'><div><img src='" + url['ilink'] + "'></div></div><div class='side_post_content'><div class='side_post_title'>" + parents['title'] + "</div><small class='post_meta'> </small></div></div></a></div>"; // Create element with HTML
          $("#locationbase").append(txt1);
          $(".inner").append(txt1);


        })



      })


      // x.innerHTML = "Latitude: " + position.coords.latitude +
      //   "<br>Longitude: " + position.coords.longitude;

    }, "json");
  }
  getLocation()

});