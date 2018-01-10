export = MysqlStore;

declare var CREATE_STATEMENT : string;

/**
 * 
 */
declare var GET_STATEMENT : string;

/**
 * 
 */
declare var SET_STATEMENT : string;

/**
 * 
 */
declare var DELETE_STATEMENT : string;

/**
 * 
 */
declare var CLEANUP_STATEMENT : string;

/**
 * 
 */
declare var FORTY_FIVE_MINUTES : number;

/**
 * 
 * @param session 
 * @param ttl 
 * @return  
 */
declare function getExpiresOn(session : any, ttl : number): Date;

interface MysqlStore {
    (): MysqlStore;
}
declare namespace MysqlStore {
	var pool: any;
	function getConnection() :any;
	function cleanup(): void;
}
declare class MysqlStore{
    constructor(options: any);
    get(sid: string): any;
    set(sid: string, session: any, ttl: number): any;
    destroy(sid: string): void;
}