/*
 * This file is created by: Sina Bakhtiari <sinabakh44@live.com>
 *      and is modified by:
*/
//
// ──────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A B S T A C T I O N   L A Y E R   F O R   R E Q U E S T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────── 
//
var Request;
(function (Request) {
    var base_url = undefined;
    var token = undefined;
    var fail_function = undefined;
    function init(base_url, token, fail_function) {
        this.base_url = base_url;
        this.token = token;
        this.fail_function = fail_function;
    }
    Request.init = init;
    function make_request(url, callback) {
        console.log("Requesting....");
        console.log(url);
        var xhttp = new XMLHttpRequest();
        //xhttp.withCredentials = true;
        //xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhttp.open("GET", url, true);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    console.log("Response OK!");
                    callback(xhttp.response);
                }
                else {
                    console.log("Response Not OK!");
                    callback(xhttp.response);
                }
            }
        };
        xhttp.send(null);
    }
    function get_next(pagination, callback) {
        if (pagination.next_url) {
            make_request(pagination.next_url, function (response) {
                response = JSON.parse(response);
                if (response.meta.code == 200) {
                    var res = {
                        data: response.data,
                        next: response.pagination
                    };
                    callback(res);
                }
                else {
                    //FIXME
                    console.log("ERROR:");
                    console.log(response.meta.error_message);
                }
            });
        }
        else {
            callback({});
        }
    }
    function get_next_till(times, pagination, callback) {
        times--;
        get_next(pagination, function (res) {
            if (times == 1)
                callback(res);
            else
                get_next_till(times, pagination, callback);
        });
    }
    Request.get_next_till = get_next_till;
    function request(url, params, callback) {
        var final_url = this.base_url + url + '?access_token=' + this.token;
        for (var key in params) {
            final_url += "&" + key + "=" + params[key];
        }
        make_request(final_url, function (response) {
            response = JSON.parse(response);
            if (response.meta.code == 200) {
                var res = {
                    data: response.data,
                    next: response.pagination
                };
                callback(res);
            }
            else {
                //FIXME
                console.log("ERROR:");
                console.log(response.meta.error_message);
            }
        });
    }
    Request.request = request;
})(Request || (Request = {}));
/*
 * This file is created by: Sina Bakhtiari <sinabakh44@live.com>
 *      and is modified by:
*/
//
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: I N S T A G R A M   A C C E S S A B L E   H I G H L E V E L   M E T H O D S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
//
/// <reference path="./request.ts"/>
var Instagram;
(function (Instagram) {
    Instagram.client_id = undefined;
    Instagram.redirect_uri = undefined;
    Instagram.token = undefined;
    Instagram.base_url = 'https://api.instagram.com/v1/';
    function init(client_id, redirect_uri) {
        this.client_id = client_id;
        this.redirect_uri = redirect_uri;
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
        set_token(token);
        return token;
    }
    Instagram.get_redirect_uri_token = get_redirect_uri_token;
    function set_token(token) {
        this.token = token;
        this.request = Request.init(this.base_url, this.token, function () { });
    }
    Instagram.set_token = set_token;
})(Instagram || (Instagram = {}));
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
/// <reference path="./request.ts"/>
var Instagram;
(function (Instagram) {
    var Users;
    (function (Users) {
        function self(callback) {
            var url = 'users/self/';
            Request.request(url, null, function (res) {
                var data = res.data;
                callback(data);
            });
        }
        Users.self = self;
        function get_user_by_uid(uid, callback) {
            var url = 'users/' + uid + '/';
            Request.request(url, null, function (res) {
                var data = res.data;
                callback(data);
            });
        }
        Users.get_user_by_uid = get_user_by_uid;
        function get_self_recent_media(page, callback) {
            var url = 'users/self/media/recent/';
            var params = {
                count: 1
            };
            Request.request(url, params, function (res) {
                var data = res.data;
                if (page == 1)
                    callback(data);
                else {
                    Request.get_next_till(page, res.next, function (res) {
                        var data = res.data;
                        callback(data);
                    });
                }
            });
        }
        Users.get_self_recent_media = get_self_recent_media;
    })(Users = Instagram.Users || (Instagram.Users = {}));
})(Instagram || (Instagram = {}));
