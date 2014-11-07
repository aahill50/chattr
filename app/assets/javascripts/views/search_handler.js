Chattr.Views.SearchHandler = Backbone.View.extend ({
	initialize: function () {
		this.$el = $('#site-header')
	},
	
	events: {
    "keyup #search": "search",
		"blur #search": "closeSearch",
		"click #search .users a": "closeSearch"
	},

  search: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON()
		var $searchResults = $('.search-results .users');
		console.log($searchResults)
		
    if (params['search']['string'].length >= 3) {
			$searchResults.addClass("active")
			
      $.ajax({
        url: 'api/search',
        data: params,
        type: 'POST',
        success: function (data) {
					$searchResults.addClass("active");
					$searchResults.empty();

          data.hashtags.forEach( function (result) {
						var $newLi = $('<li>')
						$newLi.html("<a href='#hashtags/" + result.id + "'>" + _.escape("#" + result.tag) + "</a>")
          	$searchResults.append($newLi)
          })
										
          data.users.forEach( function (result) {
						var $newLi = $('<li>')
						$newLi.html("<a href='#users/" + result.id + "'>" + _.escape(result._username) + "</a>")
          	$searchResults.append($newLi)
          })
        },
        error: function () {
          console.log("error searching... ")
        }
      })
    } else {
			$searchResults.removeClass("active")
    	$searchResults.empty();
    }
  },

	closeSearch: function () {
		setTimeout(function(){
			var $searchResults = $('.search-results .users');
			$searchResults.removeClass("active")
			$searchResults.empty();
			$('#search input').text("")
		}, 200);
	}
})
