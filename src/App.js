import logo from './logo.svg';
import './App.css';
import React from 'react';
import {get} from 'superagent'
class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       users:[],
       posts:[],
       comments:[],
       selectedUser:null,
       selectedPost:null,
       isPostView: true
    }
  }
  componentDidMount(){
    get("https://jsonplaceholder.typicode.com/posts").then((res)=>{
      this.setState({posts:res.body},()=>{console.log("Data",this.state.posts)});
    }).catch((error)=>{
      console.log("error occured>>>posts");
      this.setState({posts:[]})
    })
    get("https://jsonplaceholder.typicode.com/users").then((res)=>{
      this.setState({users:res.body},()=>{console.log("Data",this.state.users)});
    }).catch((e)=>{
      console.log("error occured>>>users");
      this.setState({users:[]})
    })
    get("https://jsonplaceholder.typicode.com/comments").then((res)=>{
      this.setState({comments:res.body},()=>{console.log("Data",this.state.comments)});
    }).catch((e)=>{
      console.log("error occured>>>comments");
      this.setState({comments:[]});
    })
  }
  handleClick = (index) => {
    const {posts} = this.state;
    if(posts[index]) {
      this.setState({
        selectedPost:posts[index],
        isPostView: false
      })
    }
    else {
      this.setState({
        selectedPost:null
      })
    }
    console.log(index);
  }
  handleUserChange = (index) => {
    const {users} = this.state;
    if(users[index]) {
      this.setState({
        selectedUser:users[index],
        isPostView: false
      })
    }
    else {
      this.setState({
        selectedUser:null
      })
    }
  }
  render(){
    const {posts,users,comments,selectedPost,selectedUser,isPostView} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {isPostView && posts && posts.length > 0 && posts.map((post,index)=>{
            return (
              <div key={index} className={"posts-div"} onClick={(e)=>{this.handleClick(index)}}>
                <p className={"post-name"}>{post.title}</p>
                <a href="#" className={"user-name"} onClick={(e)=>{this.handleUserChange(index);e.stopPropagation()}}>
                  {"sampleUser"}
                </a>
              </div>
            )
          })}
          {selectedPost!=null && !isPostView && <div>Post View</div>}
          {selectedUser!=null && !isPostView && <div>User View</div>}
        </header>
      </div>
    );
  }
}

export default App;
