import styled from 'styled-components'

const LayoutStyled = styled.main`
  min-block-size: 100vh;
  margin: auto;
  padding-inline: 20px;
  max-inline-size: 75rem; // 1200px
  padding-block: 2.5rem;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: "profile profile" "filters filters" "repo-list repo-list" ". search";
  @media screen and (min-width: 768px) {
    display: grid;
    /* border: 10px solid red; */
    grid-template-columns: 278px 1fr auto;
    grid-template-rows: auto 1fr;
    column-gap: 2rem;
    grid-template-areas: "profile filters filters" "profile repo-list repo-list" ". . search";
  }
`

function Layout({ children }) {
  return (
    <LayoutStyled>
      {children}
    </LayoutStyled>
  )
}

export default Layout
