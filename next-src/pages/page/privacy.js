import React from 'react'
import { Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'

function PrivacyPage () {
  return (
    <>
      <Container
        component='article'
        maxWidth='md'
      >
        <Styledh1>
          Quy Định Riêng Tư
        </Styledh1>
        <Styledp>
          Tại trang này chúng tôi liệt kê những thông tin mà website này thu thập khi sử dụng <strong>TINHOC.ORG</strong>.
        </Styledp>

        <Box
          component='div'
          sx={{ width: ' 100%' }}
        >
          <Styledh2>
            Thu thập thông tin
          </Styledh2>

          <Styledp>
            Chúng tôi chỉ thu thập thông tin cá nhân từ người dùng khi họ cung cấp thông tin đó tự nguyện và có ý định sử dụng dịch vụ của chúng tôi.
          </Styledp>

          <Styledp>
            Chúng tôi sẽ chỉ thu thập thông tin cần thiết để cung cấp dịch vụ của chúng tôi, và sẽ không thu thập bất kỳ thông tin nào khác mà không được sự đồng ý của người dùng.
          </Styledp>

          <Styledp>
            Chúng tôi có thu thập địa chỉ IP và User Agent khi bạn truy cập vào website nhằm mục đích chống spam, chống tấn công hoặc thống kê để báo cáo cho quản trị viên.
          </Styledp>
        </Box>

        <Box
          component='div'
          sx={{ width: ' 100%' }}
        >
          <Styledh2>
            Bảo mật thông tin
          </Styledh2>

          <Styledp>
            Chúng tôi sử dụng các biện pháp bảo mật phù hợp để bảo vệ thông tin cá nhân của người dùng khỏi mất mát, truy cập trái phép, sử dụng sai mục đích hoặc tiết lộ cho bên thứ ba không được phép.
          </Styledp>

          <Styledp>
            Chúng tôi sẽ giữ thông tin cá nhân của người dùng trong thời gian ngắn nhất cần thiết để cung cấp dịch vụ của chúng tôi hoặc đáp ứng yêu cầu pháp lý.
          </Styledp>
        </Box>

        <Box
          component='div'
          sx={{ width: ' 100%' }}
        >
          <Styledh2>
            Quyền của người dùng
          </Styledh2>

          <Styledp>
            Người dùng có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất cứ lúc nào.
          </Styledp>

          <Styledp>
            Người dùng có quyền yêu cầu chúng tôi ngưng sử dụng hoặc xóa thông tin cá nhân của họ. Bạn phải liên hệ với quản trị website để tiến hành xóa website, quy trình sẽ được hướng dẫn ở trang riêng.
          </Styledp>

          <Styledp>
            Người dùng có quyền phản đối việc sử dụng thông tin cá nhân của họ cho một số mục đích cụ thể.
          </Styledp>
        </Box>
      </Container>
    </>

  )
}

export default PrivacyPage

const Styledh1 = styled('h1')(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 600,
  lineHeight: '40px',
  color: theme.palette.text.primary,
  marginTop: '0px',
  marginBottom: '0px'
}))

const Styledh2 = styled('h2')(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600
}))

export const Styledp = styled('p')(({ theme }) => ({
  fontSize: '18px',
  marginTop: '0px'
}))
