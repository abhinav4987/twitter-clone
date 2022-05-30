import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline';
import { useState, useRef } from 'react'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { db, storage } from '../../firebase';
import { useSession } from 'next-auth/react';

// import EmojiPicker from '../emoji-picker';


function FeedInput() {

  const [input, setInput] = useState("")
  const [selectedFile , setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const {data: session} = useSession();

  const addImageToPost =(e) => {
    const reader = new FileReader();
     if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const sendPost = async () => {
    if(loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if(selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async() => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db,"posts",docRef.id),{
          image: downloadURL
        });
      });
    }

      setLoading(false);
      setInput("");
      setSelectedFile(null);
      setShowEmojis(false)
  };

  return (
    <div className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide ${loading && "opacity-60"}`}>
         {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
            src={session.user.image} 
            alt="" 
            className='h-11 w-11 cursor-pointer rounded-full '
          />
          <div className='divide-y divide-gray-700 w-full'>
              <div className={``}>
                  <textarea 
                    onChange={(e) => setInput(e.target.value)}
                    className='bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]' 
                    value={input} 
                    row={2}
                    placeholder="what's happening"
                  />
                {selectedFile && (
                    <div className='relative'>
                        <div className='absolute w-8 h-8 bg-[#15181c] hover-bg-[#272c26] bg-opacity-75 rounded-full
                            flex items-center justify-center top-1 left-1 cursor-pointer'
                            onClick={() => setSelectedFile(null)}
                        >
                            <XIcon className='h-5 text-white'/>
                        </div>
                        <img src={selectedFile} className="rounded-2xl max-h-80 object-contain mb-2 "/>
                        
            
                    </div>            
                )}
              </div>
              {!loading && (
                <div className="flex items-center justify-between pt-2.5">
                  <div className='flex items-center'>
                    <div className='icon cursor-pointer' onClick={() => filePickerRef.current.click()}>
                      <PhotographIcon className='h-[22px] text-[#1d9bf0]' />
                      <input type="file" hidden onChange ={addImageToPost} ref={filePickerRef}  />
                    </div>
                    <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                      <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                    </div>

                    {showEmojis && (
                      <></>
                    )}
                  </div>

                  <button 
                    onClick={sendPost}
                    className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default'
                    disabled={!input && !selectedFile}
                  >
                      Tweet
                  </button>
                </div>
              )}
              
          </div>
    </div>
  )
}

export default FeedInput