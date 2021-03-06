import Mod from "./mod";

const PER_SYM = ':';
const PerRegEx = /^(\d+\.?\d*)?\:(\d+\.?\d*)?$/;

/**
 *
 * @param {string} v
 * @returns {boolean}
 */
export const IsPerMod = (v)=>{
	return PerRegEx.test(v);
}

/**
 * Apply modifier per quantity of source object.
 */
export default class PerMod extends Mod {

	toJSON(){ return this.value + PER_SYM + this.per; }

	/**
	 * @property {number} count - apply modulus mod once per modulus factor.
	 */
	get count(){
		return this.source ? Math.floor(this.source.value / this.per ) : 0;
	}

	/**
	 * @property {number} per - value applied only once for every per unit
	 * of count.
	 */
	get per(){return this._per;}
	set per(v){this._per = v;}

	toString(){ return this.value + PER_SYM + this.per }

	constructor(vars, id, source ) {

		super( 0, id, source );

		if ( typeof vars === 'number') {

			this.per = vars;

		} else if ( typeof vars === 'string') {

			let parts = vars.split( PER_SYM );

			if ( parts.length === 2 ) {

				this.value =  parts[0] ? Number(parts[0]) : 1;
				this.per = parts[1] ? Number(parts[1]) : 1;

			} else {
				console.warn('bad PerMod: ' + vars );
			}

		} else {
			console.log('bad PerMod: ' + vars );
			this.value = Number(vars);
		}

		if(this.value == null) this.value = 1;
		if(this.per == null) this.per = 1; 

		//console.log( this.id + ' PERVAL: ' + this.toString() );
	}

	/**
	 *
	 * @param {*} gs
	 * @param {*} targ
	 */
	getApply(gs, targ) {
		return this.source && (( this.source.value % this.per ) === 0) ? this.count*this.value : 0;
	}

	instantiate() {
		//TODO edit count so that, if specified in constructor, uses that instead of source.
		return new PerMod(this.toString(), this.id, this.source);
	}
}