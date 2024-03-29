import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Overlay from './overlay'
import styled from 'styled-components'
import { ButtonContrast } from './button'
import InputText from './input-text'
import ReactDOM from 'react-dom'
import { ButtonRounded } from './button'
import Icon from './icon'


const modalRoot = document.getElementById('portal')
class ModalPortal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)

  }
  componentDidMount() {
    modalRoot.appendChild(this.el)
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

export default function Modal({ isActive, setModal }) {
  if (isActive) {
    return (
      <ModalPortal>
        <ModalContent setModal={setModal} />
      </ModalPortal>
    )
  }
  return null
}

const ModalContentStyled = styled.form`
  background: var(--bg);
  color: var(--white);
  padding: 1.5rem;
  border-radius: .5rem;
  position: fixed;
  inset-block-start: 50%;
  transform: translateY(-50%) translateX(-50%);
  inset-inline-start: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-inline-size: 24rem;
  inline-size: 100%;
  border: 1px solid #fff;
  .title {
    font: var(--headline2-semi-bold);
    margin: 0;
  }
  @media screen and (min-width: 768px) {

    border: 0;
  }

  @media screen and (prefers-color-scheme: light) {
    border: 1px solid var(--grey);
    .title{
      color: var(--black);
    }
  }
  
  .close{
    position: absolute;
    background: transparent;
    border: 0;
    inset-inline-end: 0;
    inset-block-start: -2rem;
    cursor: pointer;
  }
`

function ModalContent({ setModal }) {
  const form = useRef(null)
  const navigator = useNavigate()

 
  function handleSubmit(event) {

    event.preventDefault()

    const formData = new FormData(form.current)
    navigator(`/${formData.get('username')}`)
    setModal(false)

  }
  return (
    <Overlay>
      <ModalContentStyled ref={form} action="" onSubmit={handleSubmit} >
        <button className='close' onClick={()=> setModal(false)}>
         <Icon name="cancel" size={24} color={'var(--whiteIcon)'} />
       </button>

        <h2 className='title'>Busca a tu usuario favorito</h2>
        <InputText type="text" autoComplete='do-not-autofill' name="username" placeholder="Username" />
        <ButtonContrast text="Buscar" />
      </ModalContentStyled>
    </Overlay>
  )
}
