import styled from '@emotion/styled/macro'
import {Dialog as ReachDialog} from '@reach/dialog'

const Button = styled.button(({variant}) => ({
  padding: '5px 20px',
  backgroundColor: variant === 'primary' ? '#4051b5' : '#f1f2f7',
  color: variant === 'primary' ? '#f1f2f7' : '#434449',
  border: '0px',
  borderRadius: '3px',
  lineHeight: '1.5',
  fontSize: '16px'
}))

const Input = styled.input({
  border: '0px',
  backgroundColor: '#f1f2f7',
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
  color: '#434449',
  border: `1px solid #f1f1f4`,
  cursor: 'pointer'
})

const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  '@media (max-width: 991px)': {
    width: '100%',
    margin: '10vh auto'
  }
})

export {Input, Button, CircleButton, Dialog, FormGroup}
