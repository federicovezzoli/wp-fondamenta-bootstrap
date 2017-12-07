var sv,
ScriptsVari = {
	//settings
	settings: {
		$body: $("body"),
		$html: $("html")
	},

	//init
	init: function() {

		//settings
		sv = this.settings;

		//UI actions
		this.bindUIActions();
		//onLoad actions
		this.onLoadActions();
		//scroll actions
		this.scrollActions();
		//resize actions
		this.resizeActions();

	},

	onLoadActions: function() {
		// Loading screen
		$(window).load(function() {

	    });
	},

	bindUIActions: function() {

	},

	scrollActions: function() {
		//terminare animazione quando raggiunto il bottom della pagina
		$(window).scroll(function() {

		});

	},

	resizeActions: function() {
		//azioni al resize
		$(window).resize(function(){


		}).resize();
	}
}
