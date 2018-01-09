// Type definitions for ./node_modules/koa-mysql-session/index.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 * 
 */
export declare var CREATE_STATEMENT : string;

/**
 * 
 */
export declare var GET_STATEMENT : string;

/**
 * 
 */
export declare var SET_STATEMENT : string;

/**
 * 
 */
export declare var DELETE_STATEMENT : string;

/**
 * 
 */
export declare var CLEANUP_STATEMENT : string;

/**
 * 
 */
export declare var FORTY_FIVE_MINUTES : number;

/**
 * 
 * @param session 
 * @param ttl 
 * @return  
 */
declare function getExpiresOn(session : any, ttl : number): Date;

/**
 * 
 */
declare interface MysqlStore {
		
	/**
	 * 
	 * @param options 
	 */
	new (options : any);
		
	/**
	 * 
	 */
	get : /* fn*(sid:?) */ any;
		
	/**
	 * 
	 */
	set : /* fn*(sid:?,session:?,ttl:?) */ any;
		
	/**
	 * 
	 */
	destroy : /* fn*(sid:?) */ any;
}
