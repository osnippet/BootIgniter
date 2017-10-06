$(document).ready(function(){
  var num_on_page = 2;  // number of albums on page
  var temp_num = 1;

  var count;
  var pages_count;

    $(".filter").slice(num_on_page * (temp_num-1), num_on_page * temp_num).show();
    $(".filter").not($(".filter").slice(num_on_page * (temp_num-1), num_on_page * temp_num)).hide();
    var filter_used = null;
    count = $(".filter").length;
    pages_count = Math.ceil(count / num_on_page);
    $('.gal_pagination_top,.gal_pagination_bottom').bootpag({
      total: pages_count,
      page: 1,
      maxVisible: pages_count,
      leaps: false,
      firstLastUse: true,
      first: '←',
      last: '→'
    }).on("page", function(event, num){
      if (filter_used == num) {
        return;
      }
      else {
        var show_all_pages = $(".filter").slice(num_on_page * (num-1), num_on_page * num);
        show_all_pages.show();
        $(".filter").not(show_all_pages).hide();
      }
        filter_used = num;
      });


  $(".filter-button").click(function(){
      var value = $(this).attr('data-filter');
      if(value == "all")
      {
          //$('.filter').removeClass('hidden');
        //  $('.filter').show('1000');
        count = $(".filter").length;
        pages_count = Math.ceil(count / num_on_page);

        $(".filter").slice(num_on_page * (temp_num-1), num_on_page * temp_num).show();
        $(".filter").not($(".filter").slice(num_on_page * (temp_num-1), num_on_page * temp_num)).hide();
        var init_all_filter = null;
        $('.gal_pagination_top,.gal_pagination_bottom').bootpag({
          total: pages_count,
          page: 1,
          maxVisible: pages_count
        }).on("page", function(event, num){
          if (init_all_filter == num) {
            return;
          }
          else {
            var show_all_pages = $(".filter").slice(num_on_page * (num-1), num_on_page * num);
            show_all_pages.show();
            $(".filter").not(show_all_pages).hide();
          }
          init_all_filter = num;
        });

          if ($(".filter-button").removeClass("active")) {
              $(this).removeClass("active");
            }

            $(this).addClass("active");
      }
      else
      {
          // $('.filter[filter-item="'+value+'"]').removeClass('hidden');
          // $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');

          // $(".filter").not('.'+value).hide();
          // $('.filter').filter('.'+value).show();
          count = $("." + value).length;
          pages_count = Math.ceil(count / num_on_page);

          $(".filter").filter("." + value).slice(num_on_page * (temp_num-1), num_on_page * temp_num).show();
          $(".filter").not($(".filter").filter("." + value).slice(num_on_page * (temp_num-1), num_on_page * temp_num)).hide();
          var init_value_filter = null;
          $('.gal_pagination_top,.gal_pagination_bottom').bootpag({
            total: pages_count,
            page: 1,
            maxVisible: pages_count
          }).on("page", function(event, num){
            if (init_value_filter == num) {
              return;
            }
            else {
              var show_filter_pages = $(".filter").filter("." + value).slice(num_on_page * (num-1), num_on_page * num);
              show_filter_pages.show();
              $(".filter").not(show_filter_pages).hide();
            }
            init_value_filter = num;
          });


          if ($(".filter-button").removeClass("active")) {
              $(this).removeClass("active");
            }

            $(this).addClass("active");

      }
  });

});
