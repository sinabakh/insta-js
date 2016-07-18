/*
 * This file is created by: Sina Bakhtiari <sinabakh44@live.com>
 *      and is modified by:
*/
//
// ──────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A B S T A C T I O N   L A Y E R   F O R   R E Q U E S T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────── 
//
var Request = (function () {
    function Request(base_url, fail_function) {
        this.base_url = undefined;
        this.token = undefined;
        this.fail_function = undefined;
        this.base_url = base_url;
        this.fail_function = fail_function;
    }
    Request.prototype.make_request = function (url, callback) {
        console.log("Requesting....");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log("Response OK!");
                console.log(xhttp.response);
                callback("ok!");
            }
            else {
                console.log("Response NOT OK!");
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    };
    Request.prototype.request = function (url, callback) {
        this.make_request(this.base_url + url + '?access_token=' + this.token, callback);
    };
    return Request;
})();
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
var Users = (function () {
    function Users(req) {
        console.log("User am dada!");
        console.log(req);
        this.req = req;
    }
    Users.prototype.self = function () {
        console.log("ME :");
        /*this.req.request('users/self/', function(){
            console.log("I've been called!");
            
        });*/
        console.log(this.req.base_url);
    };
    return Users;
})();
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
var Instagram = (function () {
    function Instagram(client_id, redirect_uri) {
        this.client_id = undefined;
        this.redirect_uri = undefined;
        this.token = undefined;
        this.base_url = 'https://api.instagram.com/v1/';
        this.req = undefined;
        // ────────────────────────────────────────────────────────────────────────────────
        //
        // ─── API RELATED METHODS ────────────────────────────────────────────────────────
        //
        this.API_CI = (function () {
            function class_1(req) {
                console.log("API am dada");
                this.req = req;
                this.users = new Users(this.req);
            }
            return class_1;
        })();
        this.client_id = client_id;
        this.redirect_uri = redirect_uri;
        this.req = new Request(this.base_url, function () {
            console.log("That Fail Function");
        });
        this.API = new this.API_CI(this.req);
    }
    //
    // ─── AUTHENTICATION METHODS ─────────────────────────────────────────────────────
    //
    Instagram.prototype.get_auth_url = function () {
        return 'https://api.instagram.com/oauth/authorize/?client_id=' + this.client_id
            + '&redirect_uri=' + this.redirect_uri + '&response_type=token';
    };
    Instagram.prototype.get_redirect_uri_token = function (url) {
        var token_start = url.search('#access_token') + '#access_token'.length + 1;
        var token = url.substr(token_start);
        this.set_token(token);
        return token;
    };
    Instagram.prototype.set_token = function (token) {
        this.token = token;
    };
    return Instagram;
})();
