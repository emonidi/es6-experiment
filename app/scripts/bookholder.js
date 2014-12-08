import LazyImageLoader from '/lazyimageloader';
export default class BookHolder{
	constructor(){
		this.el = document.querySelector('#book-holder');
		this.ul =  document.createElement('ul');
		this.ul.setAttribute('class','list-group');
		this.fragment =  document.createDocumentFragment();
		this.parser  = new DOMParser();
		this.loader = new LazyImageLoader();
	}

	appendList(items){
		this.clearBooks();
		firebase.getLikedBooks((likedBooks)=>{
			console.log(likedBooks);
			for(var item of items.items){
			
				let info = item.volumeInfo;
				if(info.industryIdentifiers && info.industryIdentifiers[0]){
					let isbn = info.industryIdentifiers[0].identifier;
					info.liked = likedBooks.indexOf(isbn) > -1 ? isbn : false ;
				}
				let htmlString = this.listItemTemplate(info);
				
				this.fragment.appendChild(htmlString);

			}
		
			this.el.appendChild(this.fragment);
		});
		
	}

	setLikeFunctionality(elem){
		let self = this;
		let href = elem.querySelector('.like a');
		var isbn = href.getAttribute('data-book-isbn');
		href.addEventListener('click',(e) => {
			let href = document.querySelector('[data-book-isbn = "'+isbn+'"]');
			let liked = href.getAttribute('data-book-liked');
			let bookData = {
				isbn: href.getAttribute('data-book-isbn'),
				title: href.getAttribute('data-book-title')
			}
			e.preventDefault();
			if(liked !== 'false'){
				firebase.remove(bookData,(response) => {
					self.setDisliked(elem);
				});
			}else{
				firebase.save(bookData,(response) => {
					if(response.isbn || response.title){
						self.setLiked(elem,response.isbn)
					}
				});
			}
			 
		});
	}

	setLiked(elem,liked){
		console.log(elem);
		var heartIcon = elem.querySelector('.glyphicon');
		var classString  = heartIcon.getAttribute('class');
		heartIcon.setAttribute('class',classString.replace('glyphicon-heart-empty','glyphicon-heart'));

		heartIcon.parentNode.setAttribute('data-book-liked',liked);

	}

	setDisliked(elem){

		var heartIcon = elem.querySelector('.glyphicon');
		var classString  = heartIcon.getAttribute('class');
		heartIcon.setAttribute('class',classString.replace('glyphicon-heart','glyphicon-heart-empty'));
				heartIcon.parentNode.setAttribute('data-book-liked','false');

	}

	clearBooks(){
		this.ul.innerHTML = '';
		this.el.innerHTML = '';
		this.fragment.innerHTML = '';
	}

	listItemTemplate(item){
		let image = '';
		let div = document.createElement('div');
		div.setAttribute('class','col-md-3 col-sm-6 col-xs-12 text-center');
		let title = item.title ? item.title.substr(0,30) : "unknown";
		let bookData = {
				isbn: item.industryIdentifiers ? item.industryIdentifiers[0].identifier : undefined,
				title:item.title,
				liked:item.liked
		}
		let likeIconClass = item.liked ? 'glyphicon-heart' : 'glyphicon-heart-empty'
		if(item.imageLinks && item.imageLinks.thumbnail){
			
			image = '<div class="thumb">'+
						'<img class="book-image" data-src="'+item.imageLinks.thumbnail.replace('zoom=1','zoom=2')+'"  src="../images/book-icon.png"/>'+
						
						'<div class="caption">'+
							'<span>'+title+'</span>'+
							'<span class="text-right like">'+
								'<a href="#" data-book-isbn="'+bookData.isbn+'" data-book-title="'+bookData.title+'" data-book-liked="'+bookData.liked+'">'+
									'<i class="glyphicon '+likeIconClass+'"></i>'+
								'</a>'+
							'</span>'+
						'</div>'+
					'</div>';
		}else{
			image = '<div class="thumb">'+
						'<img class="book-image" src="../images/book-icon.png" class="book-icon"/>'+
						'<div class="caption">'+
							'<span>'+title+'</span>'+
							'<span class="text-right like">'+
								'<a href="#" data-book-isbn="'+bookData.isbn+'" data-book-title="'+bookData.title+'" data-book-liked="'+bookData.liked+'">'+
									'<i class="glyphicon '+likeIconClass+'"></i>'+
								'</a>'+
							'</span>'+
						'</div>'+
					 '</div>';

		}
		


		div.innerHTML = image
		this.loader.loadImages(div);
		this.setLikeFunctionality(div);
		return div;
	}
}