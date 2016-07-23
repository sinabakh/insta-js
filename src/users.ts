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

    export function self() {
        console.log("ME: ");
        
        let url = 'users/self/';
        Request.request(url, function(res){
            console.log("Ok ME:");
            let data = res.data;
            console.log(data.profile_picture);
        });
    }

}