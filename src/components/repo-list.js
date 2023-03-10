import styled from 'styled-components'
import RepoItem from './repo-item'
import NotFound from './not-found'
import { useState } from 'react'
const RepoListStyled = styled.div`
  grid-area: repo-list;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

function RepoList({ repoList, search, selectType, language, sort }) {
  let list = repoList
  let busquedas = list.length
  if (search !== '') {
      const data = list.filter((item) => { return item.name.search(search) >= 0 })
      busquedas = data.length
      list = data
    }
  

  else if(language !== ''){
    if(language !== 'all') list = list.filter(item => item.language === language)
    else if(language === 'all') list = repoList
  }
  else if(selectType){
    if(selectType === 'forks'){
      const copyArray = [...repoList]
      list = copyArray.sort((a,b) => b.forks_count - a.forks_count)
    }
    else if(selectType === 'all') list = repoList
  }
  else if(sort){
    if(sort === 'name'){
      list = repoList
    }
    else if(sort === 'updated'){
      const copyArray = [...repoList]
      list = copyArray.sort((a,b) => new Date(b.updated_at) - new Date (a.updated_at))
    }
  }           
    return (
      <RepoListStyled>
        
        {busquedas === 0 ? <NotFound/> : null}    
      {list.map((item) => {
        return <RepoItem {...item} key={item.id} />
      })}
    </RepoListStyled>
  )
}

export default RepoList
