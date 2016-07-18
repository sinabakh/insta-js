/*
 * This file is created by: Sina Bakhtiari <sinabakh44@live.com>
 *      and is modified by: 
*/

//
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: I N S T A G R A M   A C C E S S A B L E   H I G H L E V E L   M E T H O D S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
//

class Instagram{

    client_id : string = undefined;
    redirect_uri : string = undefined;
    token : string = undefined;
    
    constructor( client_id : string , redirect_uri : string ) {
        this.client_id = client_id;
        this.redirect_uri = redirect_uri;
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

            this.token = token;
            return token;
        }

    //
    // ─── API RELATED METHODS ────────────────────────────────────────────────────────
    //
   
        static API = class {

        }
    // ────────────────────────────────────────────────────────────────────────────────

    
}
