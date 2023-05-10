'use client'

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => (
  <div className='mt-16 prompt_layout'>
    {data.map((post) => (
      <PromptCard
        key={post._id}
        post={post}
        handleTagClick={ handleTagClick }
      />
    ))}
  </div>
)

const Feed = () => {

  const [allpost, setAllpost] = useState([])
  const [SearchText, setSearchText] = useState('')
  const [SearchTimeout, setSearchTimeout] = useState(null)
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    const fetchdata = async () => { 
      const response = await fetch('/api/prompt');
      const data = await response.json()

      setAllpost(data)
    }
    fetchdata();
  }, []);

  const filterPrompt = (value) => { 
    const regex = new RegExp(value, 'i')
    return allpost.filter(
      (item) => regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    )
  }


  const handleSearchChange = (e) => { 
    clearTimeout(SearchTimeout)
    setSearchText(e.target.value)
    //  debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompt(e.target.value)
        setSearchResult(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tagname) => { 
    setSearchText(tagname)
    const searchResult = filterPrompt(tagname)
    setSearchResult(searchResult)
  }


  return (
    <section className='feed'>
      <form className='relative w-fll flex-center'>
        <input
          type="text"
          placeholder='Seach for a tag or username'
          value={SearchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {
        SearchText ? <PromptCardList
          data={searchResult}
          handleTagClick={handleTagClick}
        /> : <PromptCardList
          data={allpost}
          handleTagClick={handleTagClick}
        />
      }
      
      
    </section>
  )
}

export default Feed