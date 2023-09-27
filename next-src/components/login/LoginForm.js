import React, { useContext, useEffect, useState } from 'react'

// @mui
import {
  Checkbox,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
// components
import Iconify from '@/components/iconify'
// hooks
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { postUserAPI } from '@/apis/user_apis'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { updateUserData } from '@/actions'
import { Context } from '@/hooks/context'

// ----------------------------------------------------------------------
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Vui lòng nhập đúng định dạng email.')
    .required('Email không được để trống.'),
  password: yup.string().required('Mật khẩu không được để trống.')
})

export default function LoginForm () {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const { setUser } = useContext(Context)
  const {
    control,
    setFocus,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  useEffect(() => {
    if (errors.email) {
      setFocus('email')
      toast.error(errors.email?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
    } else {
      setFocus('password')
      toast.error(errors.password?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
    }
  }, [errors])

  // console.log('onSubmit')

  const onSubmit = (data) => {
    // console.log(data)
    const sendData = {
      email: data.email,
      password: data.password
    }
    postUserAPI('login', sendData).then(res => {
      if (res.data.ok) {
        toast.success('Đăng nhập thành công!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        })
        dispatch(updateUserData(res.data.user))
        setUser(res.data.user)
        // eslint-disable-next-line no-undef
        localStorage.getItem('currentPath')
        router.push('/')
      } else {
        toast.error('Đăng nhập thất bại!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        })
      }
      // console.log(res.data)
      // Cookies.set('jwtToken', res.data.access)
      // Cookies.set('jwtRefresh', res.data.refresh)
      // getMyProfileAPI().then(res => {
      //   console.log(res.data)
      //   setUser(res.data)
      //   dispatch(updateUserData(res.data))
      //   router.replace('/home')
      // })
    }).catch(err => {
      toast.error('Đăng nhập thất bại!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          required
          name='email'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              name='email'
              label='Email'
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          required
          name='password'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              name='password'
              label='Mật khẩu'
              type={showPassword ? 'text' : 'password'}
              value={field.value}
              onChange={field.onChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </Stack>

      <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>
        <Checkbox name='remember' label='Remember me' />
        <Link variant='subtitle2' underline='hover'>
          Quên mật khẩu?
        </Link>
      </Stack>

      <LoadingButton fullWidth size='large' type='submit' variant='contained'>
        Đăng nhập
      </LoadingButton>
    </form>
  )
}
