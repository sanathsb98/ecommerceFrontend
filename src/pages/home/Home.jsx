import React, { useEffect, useRef,useState } from 'react';
import '../home/Home.jsx';
import '../home/Home.css';
import { useNavigate } from "react-router-dom";
import { checkTokenValidity } from '../../auth/tokenValidity.js';
import homeicon from '/src/images/homeicon.png';
import loveicon from '/src/images/loveicon.png';
import searchicon from '/src/images/searchicon.png';
import companylogo from '/src/images/companylogo.png';
import storyframe from '/src/images/storyframe.png';
import homefeedimg from '/src/images/homefeedimg.png';
import homefeed2 from '/src/images/homefeed2.png';
import moreicon from '/src/images/moreicon.png';
import logouticon from '/src/images/logout.png';
import dummyprofile from '/src/images/dummyprofile.jpg';
import LogoutModale from '../../modals/logout/LogoutModale.jsx';
import { useDispatch, useSelector } from 'react-redux';

import { logoutModaleStatus } from '../../features/modalSlice.js';
import UploadModale from '../../modals/upload/UploadModale.jsx';
import { uploadModaleStatus } from '../../features/modalSlice.js';


const Home = () => {

  let currentPage = 1
  const postsPerPage = 4

  const navigate = useNavigate()
  const[feedData,setFeedData] = useState([])
  const isLogModaleClicked = useSelector((store) => store.modaleStatus.logoutModale)
  const isUploadClicked = useSelector((store) => store.modaleStatus.uploadModale)
  const dispatch = useDispatch()
  const containerRef = useRef(null);
  const username = localStorage.getItem('username')


  const getFeedData = async () => {
    try {
      const response = await fetch(`https://ecommerce-backend-eight-azure.vercel.app/api/allposts?page=${currentPage}&perPage=${postsPerPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const feedInfo = await response.json();
      const posts = feedInfo.posts;
      if (Array.isArray(posts)) { // Check if the fetched data is an array
        setFeedData([...feedData,...posts]);
      } else {
        console.error('Fetched data is not an array:', feedInfo);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  


  
  const handleWheelScroll = (e) => {
    e.preventDefault();
    const delta = e.deltaY;
    const scrollSpeed = 5; // Adjust scroll speed as needed
    if (containerRef.current) {
      containerRef.current.scrollLeft += delta * scrollSpeed;
    }
  };

  const handleFeedScroll = () => {
 
    if (containerRef.current.scrollTop + containerRef.current.clientHeight >= containerRef.current.scrollHeight) {
      currentPage++; // Increment page number
      getFeedData(currentPage); // Fetch more posts
    }
  };

  useEffect(() => {
   
    dispatch(uploadModaleStatus({ status: false }))
    dispatch(logoutModaleStatus({ status: false }))
    checkTokenValidity(navigate)
    getFeedData(currentPage)
  }, [])


  console.log(feedData)

  return (
    <div className='home-page '>
      <div className='home-page-container container'>

        <div className='home-sidebar'>

          <div className='home-sidebar-logo'>
            <img src={companylogo} width='100px' height='100px' />
          </div>

          <div className='home-sidebar-contents'>

            <div className='home-sidebar-tab'>
              <div className='home-logo'><img src={homeicon} width="20px" height="20px" /></div>
              <div className='home-logo font-title-1'>Home</div>
            </div>
            <div onClick={() => dispatch(uploadModaleStatus({ status: true }))} className='home-sidebar-tab'>
              <div className='home-logo'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12V15.45C2 18.299 2.698 19.455 3.606 20.394C4.546 21.303 5.704 22.002 8.552 22.002H15.448C18.296 22.002 19.454 21.302 20.394 20.394C21.302 19.455 22 18.3 22 15.45V8.552C22 5.703 21.302 4.546 20.394 3.607C19.454 2.7 18.296 2 15.448 2H8.552C5.704 2 4.546 2.699 3.606 3.607C2.698 4.547 2 5.703 2 8.552V12Z" stroke="#262626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.54492 12.001H17.4549" stroke="#262626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12.0029 6.54504V17.455" stroke="#262626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              </div>
              <div className='home-logo font-title-1'>Create</div>
            </div>
            <div className='home-sidebar-tab'>
              <div className='home-logo'><img src={searchicon} width="20px" height="20px" /></div>
              <div className='home-logo font-title-1'>Search</div>
            </div>
            <div onClick={() => dispatch(logoutModaleStatus({ status: true }))} className='home-sidebar-tab'>
              <div className='home-logo'><img src={logouticon} width="25px" height="25px" /></div>

              <div className='home-logo font-title-1'>Logout</div>
            </div>


          </div>

        </div>

        <div className='home-feedsection'>

          <div  onWheel={handleWheelScroll} className='home-statusfeed-section'>
            <div className='user-story'>
              <div className='status-circle'>
                <div className='status-image-box'>
                  <img className='story-image' src={storyframe} />
                </div>
              </div>
              <div className='user-story-name'>itsdoggie</div>
            </div>
            <div className='user-story'>
              <div className='status-circle'>
                <div className='status-image-box'>
                  <img className='story-image' src={storyframe} />
                </div>
              </div>
              <div className='user-story-name'>itsdoggie</div>
            </div>
            <div className='user-story'>
              <div className='status-circle'>
                <div className='status-image-box'>
                  <img className='story-image' src={storyframe} />
                </div>
              </div>
              <div className='user-story-name'>itsdoggie</div>
            </div>
            <div className='user-story'>
              <div className='status-circle'>
                <div className='status-image-box'>
                  <img className='story-image' src={storyframe} />
                </div>
              </div>
              <div className='user-story-name'>itsdoggie</div>
            </div>
            <div className='user-story'>
              <div className='status-circle'>
                <div className='status-image-box'>
                  <img className='story-image' src={storyframe} />
                </div>
              </div>
              <div className='user-story-name'>itsdoggie</div>
            </div>
            <div className='user-story'>
              <div className='status-circle'>
                <div className='status-image-box'>
                  <img className='story-image' src={storyframe} />
                </div>
              </div>
              <div className='user-story-name'>itsdoggie</div>
            </div>
            <div className='user-story'>
              <div className='status-circle'>
                <div className='status-image-box'>
                  <img className='story-image' src={storyframe} />
                </div>
              </div>
              <div className='user-story-name'>itsdoggie</div>
            </div>
            <div className='user-story'>
              <div className='status-circle'>
                <div className='status-image-box'>
                  <img className='story-image' src={storyframe} />
                </div>
              </div>
              <div className='user-story-name'>itsdoggie</div>
            </div>




          </div>

          <div onScroll={handleFeedScroll} ref={containerRef} className='home-feedposts-container'>
 
          
            {feedData.map((item)=>{
              return(
                <div className='home-feed-posts'>
              <div className='name-and-profile'>

                <div className='user-profile-icon'>

                  <div className='status-circle'>
                    <div className='status-image-box'>
                      <img className='story-image' src={storyframe} />
                    </div>
                  </div>
                  <div className='feed-user-name'>{item.name}</div>
                </div>

                <div className='moreicon'>
                  <img src={moreicon} />
                </div>


              </div>
              <div className='home-feed-image-section'>
                <img className='homefeedimg' src={item.image} />              </div>

              <div className='home-likes-shares'>
                <div className='likes-section'>
                  <div className='like-btn'>  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1_104)">
                      <path d="M16.7922 3.90397C18.1066 3.97664 19.339 4.56587 20.2209 5.54328C21.1028 6.52068 21.5626 7.80701 21.5002 9.12197C21.5002 12.194 18.8482 14.081 16.3032 16.344C13.7912 18.587 12.4382 19.813 12.0002 20.096C11.5232 19.787 9.85717 18.273 7.69717 16.344C5.14117 14.072 2.50017 12.167 2.50017 9.12197C2.43773 7.80701 2.89755 6.52068 3.77943 5.54328C4.6613 4.56587 5.89373 3.97664 7.20817 3.90397C7.93631 3.8819 8.65772 4.04915 9.30188 4.38937C9.94603 4.72959 10.4909 5.23113 10.8832 5.84497C11.7232 7.01997 11.8632 7.60797 12.0032 7.60797C12.1432 7.60797 12.2812 7.01997 13.1132 5.84197C13.5032 5.22529 14.0483 4.72176 14.6939 4.38169C15.3395 4.04161 16.063 3.87688 16.7922 3.90397ZM16.7922 1.90397C15.8841 1.8749 14.9812 2.05106 14.1506 2.41932C13.3201 2.78759 12.5833 3.33848 11.9952 4.03097C11.4075 3.3405 10.6723 2.79088 9.84371 2.42272C9.01515 2.05457 8.11445 1.87729 7.20817 1.90397C5.36304 1.97612 3.62155 2.77596 2.36451 4.12857C1.10747 5.48118 0.43716 7.27651 0.500165 9.12197C0.500165 12.732 3.05017 14.949 5.51517 17.092C5.79817 17.338 6.08417 17.586 6.36817 17.839L7.39517 18.757C8.51521 19.8227 9.68943 20.8301 10.9132 21.775C11.2369 21.9846 11.6144 22.0962 12.0002 22.0962C12.3859 22.0962 12.7634 21.9846 13.0872 21.775C14.3499 20.8012 15.5602 19.7614 16.7132 18.66L17.6352 17.836C17.9282 17.576 18.2252 17.317 18.5202 17.062C20.8542 15.037 23.5002 12.742 23.5002 9.12197C23.5632 7.27651 22.8929 5.48118 21.6358 4.12857C20.3788 2.77596 18.6373 1.97612 16.7922 1.90397Z" fill="#262626" />
                    </g>
                    <defs>
                    </defs>
                  </svg>
                  </div>
                  {/* <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_1_107)">
                        <path d="M20.6561 17.008C21.8712 14.9061 22.2796 12.4337 21.8049 10.0527C21.3302 7.67171 20.0049 5.54496 18.0766 4.06977C16.1483 2.59458 13.7489 1.87185 11.3266 2.0366C8.90437 2.20135 6.62493 3.2423 4.91414 4.96501C3.20335 6.68771 2.17823 8.97432 2.0303 11.3977C1.88236 13.821 2.62173 16.2153 4.11026 18.1333C5.5988 20.0514 7.7347 21.3618 10.1189 21.82C12.5032 22.2782 14.9727 21.8527 17.0661 20.623L22.0001 22L20.6561 17.008Z" stroke="#262626" stroke-width="2" stroke-linejoin="round" />
                      </g>
                      <defs>
                      </defs>
                    </svg>
                  </div> */}
                </div>
                <div className='saved-section'></div>
              </div>
              <div className='home-like-count'>{item.likes} Likes</div>
              <div>{item.caption}</div>

            </div>
              )
            })}
         

          











          </div>





        </div>

        <div className='home-profilesection'>
          <div className='userprofile'>

            <div className='profile-circle '>
              <div className='status-image-box'>
                <img className='story-image' src={dummyprofile} />
              </div>
            </div>
            <div className='user-edit-section'>
              <div className='user-story-name font-title-1'>{username}</div>
              <div className='edit-btn'>Edit</div>
            </div>

          </div>

        </div>
      </div>
      {isLogModaleClicked ? <LogoutModale /> : ''}
      {isUploadClicked ? <UploadModale /> : ''}

    </div>
  )
}

export default Home