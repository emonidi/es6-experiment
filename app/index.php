<!doctype html>
<html class="no-js">
  <head>
    <meta charset="utf-8">
    <title>ReCruit</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="shortcut icon" href="/favicon.ico">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <!-- build:css(.) styles/vendor.css -->
    <!-- bower:css -->
    <!-- endbower -->
    <!-- endbuild -->
    <!-- build:css(.tmp) styles/main.css -->
    <link rel="stylesheet" href="styles/main.css">
    <!-- endbuild -->
    <!-- build:js scripts/vendor/modernizr.js -->
    <script src="bower_components/modernizr/modernizr.js"></script>
    <!-- endbuild -->

  </head>
  <body>
    <!--[if lt IE 10]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->


   
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
          <div class="row">
              <div class="col-md-4 col-md-offset-5 logo ">
                  <i class="glyphicon glyphicon-book"></i>
                  <h2>My Google Books App</h2>
              </div>
              <div class="col-md-2 col-md-2 col-md-offset-4 text-right search visible-md visible-sm visible-xs">
                 <a href=''>
                   <i class='glyphicon glyphicon-search'></i>
                 </a>
              </div>
          </div>
      </div>
    </nav>

    <div class="row searchbar">
      
        <div class="col-md-6 col-xs-12 title">
            <h3>Search for books</h3>
        </div>
        <div class="col-md-6 col-xs-12 title">
               <search-box>
                  <form name='form' role='form' target="">
                    <div class="input-group">
                        <input type="text" class="form-control">
                        <span class="input-group-btn">
                          <input type="submit" class="btn btn-default" value="Search">
                        </span>
                      </div>
                    </div>
                  </form>
                </search-box>
        </div>
       <!--  <div class="col-md-8 menu">
        </div> -->
    </div>

  
      
 <div class="container book-holder">
      <div class="row"> 
        <div class="col-lg-12" id='book-holder'>
          
        </div>
      </div>
 </div>


    <!-- build:js(.) scripts/vendor.js -->
    <!-- bower:js -->
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js"></script>
    <script src="bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js"></script>
    <script src="bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js"></script>
    <script src="bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js"></script>
    <script src="bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js"></script>
    <script src="bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js"></script>
    <script src="bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js"></script>
    <script src="bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js"></script>
    <script src="bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js"></script>
    <script src="bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js"></script>
    <script src="bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js"></script>
    <script src="bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js"></script>
    <script src="bower_components/require/build/require.min.js"></script>
    <!-- endbower -->
    <!-- endbuild -->

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <script>
      (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
      function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
      e=o.createElement(i);r=o.getElementsByTagName(i)[0];
      e.src='//www.google-analytics.com/analytics.js';
      r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
      ga('create','UA-XXXXX-X');ga('send','pageview');
    </script> 
        <!-- build:js({app,.tmp}) scripts/main.js -->
        
        <script src="scripts/out/main.js"></script>
        <script src="scripts/out/ajax.js"></script>
        <script src="scripts/out/bookholder.js"></script>
        <script src="scripts/out/lazyimageloader.js"></script>
        
        <script src="scripts/out/searchbox.js"></script>
        
        <!-- endbuild -->

</body>
</html>
