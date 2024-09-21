import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, addPost, updatePost, deletePost } from "../../APIs/postsApi";
import "./posts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrashAlt, faBan } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import PostModal from "./PostModal";
import { CircleLoader, GridLoader } from 'react-spinners'
import { Link } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';

function Posts() {
  const posts = useSelector((state) => state.postsData.posts);
  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [currentPost, setCurrentPost] = useState({
    id: null,
    title: "",
    body: "",
  });
  const [loading, setLoading]= useState(true)
  useEffect(() => {
    dispatch(fetchPosts()).then(()=>{setLoading(false)});
  }, []);
  const [titleError, setTitleError]= useState(null);
  const [bodyError, setBodyError]= useState(null);
  const handleAddPost = () => {
    if (newPost.title.length>=10 && newPost.title.length<=150 && newPost.body.length>=50 && newPost.body.length<=300) {
      // calling api
      dispatch(addPost(newPost)).then(() => {
        setNewPost({ title: "", body: "" });
        toast.success("Post added successfully");
      });
    }else{
      if(newPost.title.length<10){
        setTitleError(`Title should be greater than 10 characters (title is ${newPost.title.length} chars)`);
      }else if(newPost.title.length>150){
        setTitleError(`Title should be less than 150 characters (title is ${newPost.title.length} chars)`);
      }
      if(newPost.body.length<50){
        setBodyError(`Body should be greater than 50 characters (body is ${newPost.body.length} chars)`)
      }else{
        setBodyError(`Body should be less than 300 characters (body is ${newPost.body.length} chars)`)
      }
    }
  };
  const handleFocus= ()=>{
    setTitleError(null);
    setBodyError(null);
  }

  const showEditModal = (post) => {
    setCurrentPost(post);
    setShowModal(true);
  };


  const handleUpdatePost = () => {
    const updatedData = { title: currentPost.title, body: currentPost.body };

    dispatch(updatePost({ id: currentPost.id, updatedData })).finally(() => {
      setShowModal(false);
      toast.success("Post Updated successfully");
    });
  };

  const handleDelete= (post)=> {
    dispatch(deletePost(post)).finally(()=>{
      toast.warning("Deleted the post successfully");
    })
  }
  

  

  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {!loading? 
              
              posts.map((post) => (
                <div className="card post-item" key={post.id}>
                  <div className="card-body">
                    <Link to={`post/${post.id}`} style={{textDecoration:"none", color:"black"}} >
                      <h5>
                        {post.id} - {post.title}
                      </h5>
                    </Link>
                    

                    <p className="card-text">{post.body}</p>
                    <div className="postControlButtons">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          showEditModal(post);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Update
                      </button>
                      <button className="btn btn-danger" onClick={()=>handleDelete(post)}>
                        <FontAwesomeIcon icon={faTrashAlt} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
              
              :(<div className="col-lg-8 d-flex justify-content-center align-items-center">
                    <GridLoader color="#000437" size={50} cssOverride={{ margin: '0 auto', marginTop: '40px' }} />
                </div>) 
              }
            
              
            </div>

            <div className="col-lg-4">
              <div className="add-post-form" style={{borderRadius:'4px', width:'100%'}}>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) => {
                    setNewPost({ ...newPost, title: e.target.value });
                  }}
                  onFocus={handleFocus}
                />
                {titleError &&  <Alert  variant='danger'  style={{ fontSize: '12px', padding:'10px' }}>
                 {titleError}
                </Alert>}
               
                <textarea
                  className="form-control mb-2"
                  placeholder="Body"
                  rows="4"
                  value={newPost.body}
                  onChange={(e) => {
                    setNewPost({ ...newPost, body: e.target.value });
                  }}
                  onFocus={handleFocus}
                />
                {bodyError &&  <Alert variant='danger'  style={{ fontSize: '12px', padding:'10px' }}>
                 {bodyError}
                </Alert>}
                <button className="btn btn-success" onClick={handleAddPost}>
                  <FontAwesomeIcon icon={faPlus} /> Add Post
                </button>
              </div>
            </div>
          </div>
        </div>

        <PostModal
          showModal={showModal}
          handleClose={handleClose}
          currentPost={currentPost}
          handleChange={setCurrentPost}
          handleUpdatePost={handleUpdatePost}
        />

        <ToastContainer />
      </div>
    </>
  );
}

export default Posts;
