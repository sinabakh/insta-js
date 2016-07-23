/*
 * This file is created by: Sina Bakhtiari <sinabakh44@live.com>
 *      and is modified by:
*/
//
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: I N S T A G R A M   A C C E S S A B L E   H I G H L E V E L   M E T H O D S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
//
var Instagram;
(function (Instagram) {
    Instagram.client_id = undefined;
    var redirect_uri = undefined;
    var token = undefined;
    var base_url = 'https://api.instagram.com/v1/';
    function init(client_id, redirect_uri) {
        this.client_id = client_id;
        this.redirect_uri = redirect_uri;
        /*this.req = new Request( this.base_url, this.token , function(){
            console.log("That Fail Function");
        });*/
    }
    Instagram.init = init;
    //
    // ─── AUTHENTICATION METHODS ─────────────────────────────────────────────────────
    //
    function get_auth_url() {
        return 'https://api.instagram.com/oauth/authorize/?client_id=' + this.client_id
            + '&redirect_uri=' + this.redirect_uri + '&response_type=token';
    }
    Instagram.get_auth_url = get_auth_url;
    function get_redirect_uri_token(url) {
        var token_start = url.search('#access_token') + '#access_token'.length + 1;
        var token = url.substr(token_start);
        this.set_token(token);
        return token;
    }
    Instagram.get_redirect_uri_token = get_redirect_uri_token;
    function set_token(token) {
        this.token = token;
        /*this.req = new Request( this.base_url, this.token , function(){
            console.log("That Fail Function");
         });
         this.API = new this.API_CI(this.req);*/
    }
    Instagram.set_token = set_token;
})(Instagram || (Instagram = {}));
/*
 * This file is created by: Sina Bakhtiari <sinabakh44@live.com>
 *      and is modified by:
*/
//
// ──────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A B S T A C T I O N   L A Y E R   F O R   R E Q U E S T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────── 
//
/*
class Request {

    base_url:string = undefined;
    token : string = undefined;
    fail_function:Function = undefined;

    constructor( base_url : string, token : string , fail_function : Function ) {
        console.log("HAHAHAHAHAHA: ", token);
        
        this.base_url = base_url;
        this.token = token;
        this.fail_function = fail_function;
    }

    private make_request( url : string, callback:Function ) : void {
        console.log("Requesting....");
        
        let xhttp =  new XMLHttpRequest();
        //xhttp.withCredentials = true;
        //xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhttp.open("GET", url, true);
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 ) {
                if(xhttp.status == 200)
                {
                    console.log("Response OK!");
                    console.log(xhttp.response);
                    callback("ok!");
                }
                else {
                    console.log("Not OK!");
                    
                }
            }
        };
        xhttp.send(null);
    }

    request( url : string , callback : Function ) {
        this.make_request( this.base_url + url + '?access_token=' + this.token , callback );
    }

}*/ 
/*
 * This file is created by: Sina Bakhtiari <sinabakh44@live.com>
 *      and is modified by:
*/
//
// ──────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: U S E R S   A P I   E N D P O I N T S   W R A P P E R S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────── 
//
/// <reference path="./instagram.ts"/>
var Instagram;
(function (Instagram) {
    var Users;
    (function (Users) {
        function self() {
        }
        Users.self = self;
    })(Users = Instagram.Users || (Instagram.Users = {}));
})(Instagram || (Instagram = {}));
