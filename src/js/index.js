import React from 'react';
import ReactDom from 'react-dom';
import '../less/AppInvite.less';

//最上面输入
var SearchBar = React.createClass({
    onHandleFilter:function() {
      this.props.filterTextFunc(this.refs.inp.value);
    },
    render:function() {
        var data = this.props.data;
        var row = [];
        data.forEach(function(item,index) {
            row.push(<span key={index}>{item.name}</span>)
        })
        return (
            <div className="search">
               <input type="text" onChange={this.onHandleFilter} ref='inp'/>
               <span>您已邀请{row}等{row.length}人</span>
            </div>
        )
    }
})


//中间样式
//展示单个人物信息
var ListItem = React.createClass({
   onHandleToggle:function() {
      this.props.toggleInvite(this.props.id);
   },
   render:function() {
     var canInvite = this.props.canInvite;
     var style = {};
     canInvite ? style.background = "#8ab923" : style.background = "#f1f1f2";
     return (
        <li>
            <img src={"./src/img/" + this.props.avatarUrl}/>
            <div>{this.props.name}</div>
            <div>{this.props.bio}</div>
            <button style={style} onClick={this.onHandleToggle}>{canInvite ? "邀请回答" : "收回邀请"}</button>
        </li>
     )
   }
})

var ListInvite = React.createClass({
    render:function() {
        var data = this.props.data;
        var row = [];
        var self = this;
        var filterText = this.props.filterText;
        data.forEach(function(item,index){
            if(item.name.indexOf(filterText) !== -1){
               row.push(<ListItem canInvite={item.canInvite} toggleInvite={self.props.toggleInvite} key={index+100} id={item.id} name={item.name} bio={item.bio} avatarUrl={item.avatarUrl}></ListItem>)
            }
        })
        return (
            <div className="ListWrapper">
              <ul>
                 {row}
              </ul>
            </div>
        )
    }
})

var AppInivite = React.createClass({
    getInitialState:function() {
        return {
          list:[],
          inviate:[],
          filterText:''
        }
    },
    componentDidMount:function() {
        var list = [];
        var data = this.props.data;
        data.forEach(function(item,index) {
            item.canInvite = true;
            list.push(item);
        })
        this.setState({
            list:list
        })
    },
    toggleInvite:function(id) {
       //找到对应的人
       var togglePerson = null;
       var list = this.state.list.map(function(item,index) {
          if(item.id === id) {
              togglePerson = item;
              item.canInvite = !item.canInvite;
          }
          return item;
       })
       this.setState({
           list:list
       });

       var orderArray = [...this.state.inviate];
       if(!togglePerson.canInvite) {
           orderArray.push(togglePerson);
       }else{
           orderArray = orderArray.filter(function(ele,index) {
               return !(ele.id === togglePerson.id)
           })
       }
       this.setState({
           inviate:orderArray
       })
    },
    filterTextFunc:function(text) {
        this.setState({
            filterText:text
        })
    },
    render:function() {
        return (
            <div className="wrapper">
                <SearchBar data={this.state.inviate} filterTextFunc={this.filterTextFunc}/>
                <ListInvite data={this.state.list} toggleInvite={this.toggleInvite} filterText={this.state.filterText}/>
            </div>
        )
    }
})

var data = [
    {
      "name":"yingying",
      "slug":"yingying",
      "avatarUrl":"./1.jpg",
      "bio":'电影杂志《泰坦尼克号》主演',
      "id":1,
    },
    {
      "name":"张杰",
      "slug":"jason",
      "avatarUrl":"./2.jpg",
      "bio":'我是歌手',
      "id":2
    },
    {
      "name":"薛之谦",
      "slug":"qianqian",
      "avatarUrl":"./1.jpg",
      "bio":'singer',
      "id":3
    },
    {
      "name":"胡歌",
      "slug":"胡歌",
      "avatarUrl":"./3.png",
      "bio":'actor',
      "id":4
    },
    {
      "name":"xiaoyuan",
      "slug":"xiaoyuan",
      "avatarUrl":"./2.jpg",
      "bio":'kid',
      "id":5
    },
    {
      "name":"qianxi",
      "slug":"qianxi",
      "avatarUrl":"./3.png",
      "bio":'dance',
      "id":6
    }
]

ReactDom.render(
    <AppInivite data={data}/>,
    document.getElementById('root')
)