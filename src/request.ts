/*
 * This file is created by: Sina Bakhtiari <sinabakh44@live.com>
 *      and is modified by: 
*/

//
// ──────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A B S T A C T I O N   L A Y E R   F O R   R E Q U E S T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────── 
//

class Request {

    base_url:string = undefined;
    token : string = undefined;
    fail_function:Function = undefined;

    constructor( base_url : string , fail_function : Function ) {
        this.base_url = base_url;
        this.fail_function = fail_function;
    }

    private make_request( url : string, callback:Function ) : void {
        console.log("Requesting....");
        
        let xhttp =  new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log("Response OK!");
                console.log(xhttp.response);
                callback("ok!");
            }
            else
            {
                console.log("Response NOT OK!");
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    request( url : string , callback : Function ) {
        this.make_request( this.base_url + url + '?access_token=' + this.token , callback );
    }

}