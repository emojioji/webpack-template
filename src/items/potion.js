import GData from "./gdata";
import Attack from '../chars/attack';

const defaults = {

	level:1,
	repeat:true,
	stack:true

};

/**
 * This is actually only the prototype for a potion.
 * Individual potions are instanced from this data.
 */
export default class Potion extends GData {
	
	toJSON() {

		let data = super.toJSON();

		data.id = this.id;
		if ( !this.template ) {

			//console.warn('MISSING TEMPLATE: ' + this.id );
			data.type = this.type;

		} else if ( typeof this.template === 'string' ) {

			data.template = this.template;

		} else data.template = this.template.id;
		data.recipe=this.recipe;
		return data ? data : undefined;

	}

	get isRecipe() {return true; }

	constructor(vars=null ) {

		super(vars, defaults );

		if ( this.use.attack != null ) {
			var a;
			if ( !(this.use.attack  instanceof Attack)) a = new Attack(this.use.attack );
			this.use.attack = a;
		}
		this.require = this.require||this.unlockTest;

	}

}
