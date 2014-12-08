
import Ajax from '/scripts/out/ajax';
import SearchBox from '/scripts/out/searchbox';
import BookHolder from '/scripts/out/bookholder';
import FirebaseData from '/scripts/out/firebase';

let bookholder = new BookHolder();
let firebase = new FirebaseData();

let searchbox = new SearchBox();
searchbox.setCallback((query)=>{
	if(query === ''){
		return;
	}

	let ajax = new Ajax();
	ajax.get('https://www.googleapis.com/books/v1/volumes?q='+query+"&maxResults=40",
		(d)=>{
			bookholder.appendList(d);
			searchbox.hideSearchBar();
		}
	);
});








