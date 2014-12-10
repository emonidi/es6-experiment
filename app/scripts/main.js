import TemplateGetter from '/scripts/out/templategetter';
import FirebaseData from '/scripts/out/firebase';

let templateGetter = new TemplateGetter();
let firebase = new FirebaseData();

var mainView = document.querySelector('[data-main-view]');


console.log(window.location);

if(window.location.pathname === '/'){
	
	import SearchBox from '/scripts/out/searchbox';
	import BookHolder from '/scripts/out/bookholder';
	import Ajax from '/scripts/out/ajax';

	
	templateGetter.get('/templates/main.html',()=>{
		execute();
	});

	let execute = ()=>{
			let ajax= new Ajax();
			let bookholder = new BookHolder();

			let searchbox = new SearchBox();
			searchbox.setCallback((query)=>{
				if(query === ''){
					return;
				}

				
				ajax.get('https://www.googleapis.com/books/v1/volumes?q='+query+"&maxResults=40",
					(d)=>{

						bookholder.appendList(JSON.parse(d));
						searchbox.hideSearchBar();
					}
				);
			});
	}
}






