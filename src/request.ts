/*
 * This file is created by: Sina Bakhtiari <sinabakh44@live.com>
 *      and is modified by: 
*/

//
// ──────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A B S T A C T I O N   L A Y E R   F O R   R E Q U E S T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────── 
//

module Request {

    let base_url:string = undefined;
    let token : string = undefined;
    let fail_function:Function = undefined;

    export function init( base_url : string, token : string , fail_function : Function ) {
        this.base_url = base_url;
        this.token = token;
        this.fail_function = fail_function;
    }

    function make_request( url : string, callback:Function ) : void {
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

    export function request( url : string , callback : Function ) {
        this.make_request( this.base_url + url + '?access_token=' + this.token , callback );
    }

}