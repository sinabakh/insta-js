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

    function make_request( url : string, callback:Function ) : any {
        console.log("Requesting....");
        console.log(url);
        
        let xhttp =  new XMLHttpRequest();
        //xhttp.withCredentials = true;
        //xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhttp.open("GET", url, true);
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 ) {
                if(xhttp.status == 200)
                {
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

    function get_next( pagination:any, callback : Function) {        
        if(pagination.next_url) {
            make_request(pagination.next_url, function(response){
                response = JSON.parse(response);
                if(response.meta.code == 200)
                {
                    let res = {
                        data: response.data,
                        next: response.pagination 
                    };                
                    callback(res);
                } 
                else
                {
                    //FIXME
                    console.log("ERROR:");
                    console.log(response.meta.error_message);
                    
                    //callback(undefined);
                }
            });
        } 
        else {
            callback({});
        }
    }

    export function get_next_till( times : number, pagination:any, callback : Function) {
        times--;
        get_next(pagination, function(res){
            if(times == 1)
                callback(res);
            else
                get_next_till(times, pagination, callback);
        });
    }

    export function request( url : string, params:any , callback : Function ) {
        let final_url = this.base_url + url + '?access_token=' + this.token;
        for(var key in params)
        {   
            final_url += "&" + key + "=" + params[key];
        }
        make_request( final_url , function(response) {
                response = JSON.parse(response);
                if(response.meta.code == 200)
                {
                    let res = {
                        data: response.data,
                        next: response.pagination 
                    };
                    callback(res);
                } 
                else
                {
                    //FIXME
                    console.log("ERROR:");
                    console.log(response.meta.error_message);
                    
                    //callback(undefined);
                }
        });
    }

}