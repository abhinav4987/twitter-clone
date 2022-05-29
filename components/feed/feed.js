import FeedHeader from './feed-header'
import FeedInput from './feed-input'

function Feed() {
  return (
    <div className=" flex-grow text-[#d9d9d9] border-l border-r border-gray-700 max-w-2xl
    sm:ml-[73px] xl:ml-[370px]">
        <FeedHeader />
        <FeedInput />
    </div>
  )
}

export default Feed