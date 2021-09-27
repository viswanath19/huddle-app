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
       isPostView: true,
       isDetailedPostView: false,
       isDetailedUserView: false
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
    this.setState({
      isPostView: true,
      isDetailedPostView: false,
      isDetailedUserView: false
    })
  }
  handleClick = (index) => {
    const {posts,users,comments} = this.state;
    const authorName = users.filter((item)=>item.id===posts[index].userId); 
    if(posts[index]) {
      posts[index].username = authorName && authorName[0] && authorName[0].username ? authorName[0].username : "";
      let selectedPostComments = comments.filter(comment => comment.postId===posts[index].id);
      this.setState({
        selectedPost:posts[index],
        isPostView: false,
        isDetailedPostView: true,
        comments:selectedPostComments
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
        isPostView: false,
        isDetailedUserView: true
      })
    }
    else {
      this.setState({
        selectedUser:null
      })
    }
  }
  render(){
    const {posts,users,comments,selectedPost,selectedUser,isPostView,isDetailedPostView,isDetailedUserView} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {isPostView && posts && posts.length > 0 && posts.map((post,index)=>{
            const authorName = users.filter((item)=>item.id===post.userId);
            return (
              <div key={index} className={"posts-div"} onClick={(e)=>{this.handleClick(index)}}>
                <p className={"post-name"}>{post.title}</p>
                <a className={"user-name"} onClick={(e)=>{this.handleUserChange(index);e.stopPropagation()}}>
                  {authorName && authorName[0] && authorName[0].username}
                </a>
              </div>
            )
          })}
          {isDetailedPostView && !isPostView && 
            <div>
              <p><strong><u>Post Details</u></strong></p>
              <p>{`Title: ${selectedPost.title}`}</p>
              <p>{`Author: ${selectedPost.username}`}</p>
              <p><strong><u>Comments</u></strong></p>
              {comments && comments.length > 0 && comments.map((comment,index)=>{
                return (
                  <div key={index} className={"posts-div"}>
                    <p className={"post-name"}>{`Subject: ${comment.name}`}</p>
                    <p className={"post-name"}>{`Body: ${comment.body}`}</p>
                    <p className={"post-name"}>{`Email: ${comment.email}`}</p>
                  </div>
                )
              })}
            </div>
          }
          {isDetailedUserView && !isPostView && 
            <div>
              <p><strong><u>User Details</u></strong></p>
              <p>{selectedUser.username}</p>
              <p>{selectedUser.name}</p>
              <p>{selectedUser.email}</p>
              <p>{selectedUser.website}</p>
              <p>{selectedUser.company.name}</p>
            </div>
          }
        </header>
      </div>
    );
  }
}

export default App;
