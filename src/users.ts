/*
 * This file is created by: Sina Bakhtiari <sinabakh44@live.com>
 *      and is modified by: 
*/

//
// ──────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: U S E R S   A P I   E N D P O I N T S   W R A P P E R S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────── 
//

/// <reference path="./request.ts"/>

class Users {
    
    req : Request;

    constructor( req : Request ) {
        this.req = req;
    }

    self() {
        console.log("ME :");
        this.req.request('users/self/', function(){
            console.log("I've been called!");
            
        });
        console.log(this.req.base_url);
        
    }

}