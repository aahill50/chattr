Chattr.Views.SiteHeader = Backbone.View.extend ({
	events: {
		"click .sign-out": "signOut",
    "keyup #search": "search",
		"blur #search": "closeSearch",
		"click #search .users a": "closeSearch"
	},

  template: function(options) {
    if (Chattr.currentUser) {
      return JST["shared/site_header"]
    } else {
      return JST["shared/site_header_unsigned"]
    }

  },

  tagName: 'header',

  className: 'site-header group',

  id: 'site-header',

  render: function () {
    var content = this.template({ currentUser: Chattr.currentUser });
    this.$el.html(content);
    return this;
  },

	signOut: function (event) {
		event.preventDefault();

		$.ajax({
			type: 'DELETE',
			url: 'api/session',
			dataType: "text",
			success: function () {
				Backbone.history.navigate("/session/new", { trigger: true })
			}
		})
	},

  search: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON()
		var $searchResults = $('.search-results .users');
		
    if (params['search']['string'].length >= 3) {
			$searchResults.addClass("active")
      $.ajax({
        url: 'api/users/search',
        data: params,
        type: 'POST',
        success: function (data) {
					$searchResults.addClass("active");
					$searchResults.empty();
					
          data.forEach( function (result) {
						var $newLi = $('<li>')
						$newLi.html("<a href='#users/" + result.id + "'>" + _.escape(result._username) + "</a>")
						// debugger
						console.log($newLi.html())
          	$searchResults.append($newLi)
          })
        },
        error: function () {
          console.log("error searching... ")
        }
      })
    } else {
			$searchResults.removeClass("append`ctive")
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
