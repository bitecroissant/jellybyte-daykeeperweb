import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAjax } from '../lib/ajax'
import s from './SignInPage.module.scss'

export const SignInPage: React.FC = () => {
  const nav = useNavigate()
  const { post } = useAjax()

  const [code, setCode] = useState<string>('')

  const _setSucc = () => {
    setTimeout(() => {
      nav('/1')
    }, 800)
  }

  const _setFail = () => {
    setCode('')
  }

  const onSubmit = async () => {
    console.log(code)
    try {
      const response = (await post<UserTokens>('/sessions', { token: code })).data
      const jwt = response.jwt
      localStorage.setItem('jwt', jwt)
      _setSucc()
    } catch (err) {
      _setFail()
    }
  }

  return (
    <div className={s.signInPage}>
      <form className={s.formWrapper}>
        <input value={code} onChange={e => setCode(e.target.value)} placeholder='Input token' />
        <button type='button' onClick={onSubmit}>提交</button>
      </form>
    </div>
  )
}