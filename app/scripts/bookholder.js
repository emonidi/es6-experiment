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

		for(var item of items.items){
			let info = item.volumeInfo;
			let htmlString = this.listItemTemplate(info);
			
			this.fragment.appendChild(htmlString);

		}
		
		this.el.appendChild(this.fragment);
		
		

		
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
		if(item.imageLinks && item.imageLinks.thumbnail){
			let str = ';lkasd;lkas;ldkas?zoom=1&a;lskda;lskdals';
			console.log(str.replace('zoom=1','zoom=2'));
			item.imageLinks.thumbnail.replace('zoom=1','zoom=2');
			console.log(item.imageLinks.thumbnail)
			image = '<div class="thumb">'+
						'<img data-src="'+item.imageLinks.thumbnail.replace('zoom=1','zoom=2')+'"  src="../images/book-icon.png"/>'+
						'<div class="caption">'+title+'</div>'+
					'</div>';
		}else{
			image = '<div class="thumb">'+
						'<img src="../images/book-icon.png" class="book-icon"/>'+
						'<div class="caption">'+title+'</div>'+
					 '</div>';

		}
		


		div.innerHTML = image
		this.loader.loadImages(div);
		console.log(div)
		return div;
	}
}