/**
 * URLパラメータを取得する関数
 * @param delim 区切り文字
 * @param exception 除外したい文字列
 */
const getURLParameter = (delim: '/' | '?', exception?: string): string[] | undefined[] => {
    const param = window.location.pathname.split(delim).slice(-1)[0];
    
    switch(delim) {
        case '/':
            if(exception) {
                return param !== exception? [param]: [undefined];
            }

            return [param];
        case '?':
            return param.split('&');
        default:
            return [undefined]
    }
}

export default getURLParameter;