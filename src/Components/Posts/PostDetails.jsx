import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCircleBolt,faHeart, faThumbsUp, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostComments, fetchPostWithId } from '../../APIs/postsApi';
import { CircleLoader, GridLoader } from 'react-spinners'
import { Link, useParams } from 'react-router-dom'
import profile from '../../images/person.png'
import style from '../Posts/PostDetails.css'
import Error from '../Error404/Error';

const PostDetails = () => {
  const { id } = useParams();
  // const head = useRef();
  const post = useSelector((state)=> state.postsData.currentPost.post);
  const comments = useSelector((state)=> state.postsData.currentPost.comments);
  const dispatch = useDispatch();
  const [loading, setLoading]= useState(true)
  useEffect(() => {
    console.log("our id:",id);
    dispatch(fetchPostWithId(id)).then(()=>{dispatch(fetchPostComments(id)).then(()=>{setLoading(false)})})
    
    console.log("Comments::", comments)
  }, []);
  if(loading){
    return (
      <div className="d-flex justify-content-center align-items-center">
                    <GridLoader color="#000437" size={50} cssOverride={{ margin: '0 auto', marginTop: '40px' }} />
      </div>
    )
  }
  if(post.title==="posts/fetchPostWithId/rejected"){
    return <Error notFound={'Post'}/>
  }
  // console.log("COMMENTS=",  comments)
  return (
    <Container fluid style={{marginTop:'20px'}}>
      <Row>
        <Col lg='1' md='1' >
          <Link to='..' style={{textDecoration:"none", color:"black", fontSize:'20px'}}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </Col>
        <Col style={{maxWidth:'550px'}}>
         <p className="h2">{id} - {post.title}:</p>
         <p style={{fontSize:'19px', fontWeight:'400', maxWidth:'400px'}}>{post.body}</p>
        </Col>
        <Col lg='5' md='5' sm='12'>
          <p className="h3">Comments:</p>
          <div id='comments'>
          {comments.map((el)=>(
            <div className="comment" key={el.id} >
              <div className="commentHeader" style={{display:'flex'}}>
                <img src={profile} alt="person" height={'30px'} style={{marginRight:'5px'}}/>
                <p className="h5">{el.name}</p>
              </div>
              <div>{el.body}</div>
              <ul className='react'>
                <li><FontAwesomeIcon icon={faThumbsUp} /></li>
                <li><FontAwesomeIcon icon={faHeart} /></li>
                
              </ul>
              
            </div>
          ))}
          </div>
        </Col>
      </Row>
      {/* <Row>
        <Col xs lg='2' md='2'>{  }</Col>
        <Col >
          
        </Col>
      </Row> */}
    </Container>
  )
}

export default PostDetails
