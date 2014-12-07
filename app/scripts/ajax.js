export default class Ajax {
	constructor(){
		this.xhr = new XMLHttpRequest();
	}

	send(){
		this.xhr.send();
	}

	get(url,success,error){
		this.xhr.open('GET',url,true);
		this.send();
		this.processResponse(success,error);
	}

	processResponse(success,error){
		this.xhr.onreadystatechange = function(e){
			if(this.readyState === 4 && this.status === 200){
				success(JSON.parse(this.response));
			}else if(this.readyState === 4 && this.status !== 200){
				error && error(JSON.parse(this.response));
			}
		}
	}
}