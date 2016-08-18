/**
 * Created by xuzhiwei on 2016/8/17.
 */


import './Hello.css';

//import '../compontent/mian.js';

/*import './Hello.scss';*/

import React, {Component} from 'react';

// 直接在js中定义样式，内嵌样式
let style = {
    backgroundColor: 'blue'
}

export default class Hello extends Component {
render(){
    return (
        <div>
            <h1 style={style}>1111111</h1>
            <br/>
            <img/>
        </div>
    )
}
}
