import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../../firebase';
import {Post} from '../post';
import FeedHeader from './feed-header'
import FeedInput from './feed-input'
function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => onSnapshot(
    query(collection(db,"posts"),
    orderBy("timestamp", "desc")),
    (snapshot) =>setPosts(snapshot.docs)
  ),[db]);
  return (
    <div className=" flex-grow text-[#d9d9d9] border-l border-r border-gray-700 max-w-2xl
    sm:ml-[73px] xl:ml-[370px]">
        <FeedHeader />
        <FeedInput />
        <div className='pb-72'>
          {
            posts.map(
              post => <Post key={post.id} id={post.id} post={post.data()}/> 
            )
          }
        </div>
    </div>
  )
}

export default Feed