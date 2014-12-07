export default class SearchBox{
	constructor(){
		this.searchIcon = document.querySelector('.search a');
		this.el = document.querySelector('search-box');
		this.searchBar = document.querySelector('.searchbar');
		this.form = this.el.querySelector('form');
		this.input = this.el.querySelector('input');
		this.form.addEventListener('submit',(e) => {
			e.preventDefault();
			this.callback(this.input.value);
		});

		this.setSearchIcon();
	}
	setCallback(callback){
		this.callback = callback;
	}

	setSearchIcon(){
		console.log(this.searchBar);
		this.searchIcon.addEventListener('touchend',(e)=>{
			e.preventDefault();
			this.toggleSearchBar();
		});

		document.addEventListener('scroll',()=>{
			if(this.searchBarIsCollapsed()){
				this.hideSearchBar();
			}
		})

	}

	toggleSearchBar(hidden){
		let classAttribute = this.searchBar.getAttribute('class');
		if(!this.searchBarIsCollapsed()){
			this.searchBar.setAttribute('class',classAttribute+' collapsed');
		}else{
			this.searchBar.setAttribute('class',classAttribute.replace('collapsed',''));
		}
		
	}

	searchBarIsCollapsed(){
		let searchbar = this.searchBar;
		let classAttribute = searchbar.getAttribute('class');
		return classAttribute.search('collapsed') === -1 ? false : true;
	}

	hideSearchBar(){
		this.searchBar.setAttribute('class',this.searchBar.getAttribute('class').replace('collapsed',''));
	}
}