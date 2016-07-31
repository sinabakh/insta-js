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

module Instagram.Users {    

    export function self(callback:Function) {
        let url = 'users/self/';
        Request.request(url, function(res){
            let data = res.data;
            callback(data);
        });
    }

    export function get_user_by_uid(uid:number, callback:Function) {
        let url = 'users/' + uid + '/';
        Request.request(url, function(res){
            let data = res.data;
            callback(data);
        });
    }

}