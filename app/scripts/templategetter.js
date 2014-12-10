import AJAX from '/ajax';
export default class TemplateGetter{
	constructor(){
		this.ajax = new AJAX('document');
		this.fragment = document.createDocumentFragment();
		this.mainView = document.querySelector('[data-main-view]');
	}

	get(templateUrl,cb){
		this.ajax.get(templateUrl,(html)=>{
			let nodes  = html.querySelector('body').childNodes;
			for(let i in nodes){
				if(typeof nodes[i] === 'object'){
					this.fragment.appendChild(nodes[i]);
				}
			}

			this.mainView.appendChild(this.fragment);
			cb();
		})
	}

}