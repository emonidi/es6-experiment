export default class LazyImageLoader {
	constructor(){
		
	}

	loadImages(holder){
		let image = holder.querySelectorAll('img')[0];
		
			let dataSource = image.getAttribute('data-src');

			if(!dataSource) {
				return;
			}
			let img = new Image();
			img.src = dataSource; 
			img.onload = (e)=>{
				image.src = img.src;
			}
		
	}
	
}