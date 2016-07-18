/*
 * This file is created by: Sina Bakhtiari <sinabakh44@live.com>
 *      and is modified by: 
*/

//
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: I N S T A G R A M   A C C E S S A B L E   H I G H L E V E L   M E T H O D S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
//

/// <reference path="./users.ts"/>
/// <reference path="./request.ts"/>

class Instagram{

    client_id : string = undefined;
    redirect_uri : string = undefined;
    token : string = undefined;

    base_url : string = 'https://api.instagram.com/v1/';
    req : Request = undefined;

    API : any;

    constructor( client_id : string , redirect_uri : string ) {
        this.client_id = client_id;
        this.redirect_uri = redirect_uri;
        this.req = new Request( this.base_url , function(){
            console.log("That Fail Function");
        });
        
        this.API = new this.API_CI(this.req);
    }
    

    //
    // ─── AUTHENTICATION METHODS ─────────────────────────────────────────────────────
    //


        get_auth_url() : string {
            return 'https://api.instagram.com/oauth/authorize/?client_id=' + this.client_id
                + '&redirect_uri=' + this.redirect_uri + '&response_type=token';
        }

        get_redirect_uri_token( url : string ) : string {
            let token_start = url.search('#access_token') + '#access_token'.length + 1;
            let token = url.substr(token_start);

            this.set_token(token);
            return token;
        }

        set_token( token : string) : void {
            this.token = token;
        }

    // ────────────────────────────────────────────────────────────────────────────────

    
    //
    // ─── API RELATED METHODS ────────────────────────────────────────────────────────
    //
   

         API_CI = class {

            req : Request;

            users : Users;

            constructor( req : Request ) {
                this.req = req;
                this.users = new Users(this.req);
            }

        }

    // ────────────────────────────────────────────────────────────────────────────────

    
}
