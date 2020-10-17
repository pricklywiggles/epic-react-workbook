import styled from '@emotion/styled/macro'
import {keyframes} from '@emotion/core'
import {Dialog as ReachDialog} from '@reach/dialog'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import {FaSpinner} from 'react-icons/fa'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const buttonVariants = {
  primary: {
    backgroundColor: colors.indigo,
    color: colors.gray
  },
  secondary: {
    backgroundColor: colors.gray,
    color: colors.text
  }
}

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s ease infinite;`
})

const Button = styled.button(
  {
    padding: '5px 20px',
    border: '0px',
    borderRadius: '3px',
    lineHeight: '1.5',
    fontSize: '16px'
  },
  ({variant}) => buttonVariants[variant]
)

const Input = styled.input({
  border: '0px',
  backgroundColor: colors.gray,
  padding: '8px 12px',
  borderRadius: '3px',
  marginTop: '10px'
})

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column'
})

const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
  color: colors.text,
  border: `1px solid ${colors.gray10}`,
  cursor: 'pointer'
})

const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  [mq.small]: {
    width: '100%',
    margin: '10vh auto'
  }
})

export {Input, Button, CircleButton, Dialog, FormGroup, Spinner}
