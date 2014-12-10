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

	getAllBooks(cb){
		this.db.once('value',(snapshot) => {
			cb(snapshot.val());
		})
	}

	getLikedBooks(cb){
		var booksarr = [];
		this.getAllBooks((data)=>{
			console.log(data);
			// for(var i = 0; i < data.length; i++){
			// 	data[i].isbn !== undefined && arr.push(data[i].isbn);
			// }
			cb(booksarr);
		});
	}
} 