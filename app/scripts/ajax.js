export default class Ajax {
	constructor(responseType){
		this.xhr = new XMLHttpRequest();
		this.xhr.responseType = responseType ? responseType : "text";

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
		var self = this;
		this.xhr.onreadystatechange = function(e){
			if(self.responseType === 'text'){
				this.response = JSON.parse(this.response);
			}
			console.log(self.xhr.responseType);
			if(this.readyState === 4 && this.status === 200){
				success(this.response);
			}else if(this.readyState === 4 && this.status !== 200){
				error && error(this.response);
			}
		}
	}
}