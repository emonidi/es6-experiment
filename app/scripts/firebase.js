export default class FirebaseData{
	constructor(){
		this.db = new Firebase('https://my-google-book.firebaseio.com/books');
		console.log(this.db);
	}

	save(data,cb){
		this.db.push(data).once('value',(snapshot) => {
			cb(snapshot.val());
		});
	}

	remove(data,cb){
		console.log(data);
		let self = this;
		//let item = this.db.child('isbn/'+data.isbn);
		this.db.once('value',(snapshot) => {
			snapshot.forEach((e)=>{
				if(e.val().isbn === data.isbn){
					self.db.child(e.key()).remove((err)=>{
						if(!err){
							cb();
						}
					});
				}
			});
		});
	}

	getAllBooks(callback){
		this.db.once('value',(snapshot) => {
			callback(snapshot.val());
		})
	}

	getLikedBooks(callback){
		var arr = [];
		this.getAllBooks((data)=>{
			for(let i in data){
				data[i].isbn !== undefined && arr.push(data[i].isbn);
			}
			callback(arr);
		});
	}
} 