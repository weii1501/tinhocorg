import React, {useEffect} from 'react'
import {
  Avatar,
  Card,
  Modal,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import Link from 'next/link'
import ThreadForm from '@/components/threads/ThreadForm'
import {getThreads} from '@/apis/apis'
import {useRouter} from 'next/router'
import {numberFormatter} from '@/utils/utils'
import {styled} from "@mui/material/styles";

function ThreadCard ({
  threads: threadsProps,
  openThread,
  setOpenThread
}) {
  const router = useRouter()
  const { topic } = router.query
  const [threads, setThreads] = React.useState(threadsProps.data ?? threadsProps)
  const [changePage, startChangePage] = React.useTransition()
  const [page, setPage] = React.useState(threads?.page?.number)
  useEffect(() => {
    // console.log('call api', page)
    if (threadsProps.page) {
      startChangePage(() => {
        getThreads(topic, page).then(res => {
          // console.log(res.data)
          setThreads(res.data.data)
        })
      })
    }
  }, [page, topic])
  const handleClose = () => setOpenThread(false)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  return (
    <Stack direction='column' spacing={2}>
      <Modal
        open={openThread}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div>
          <ThreadForm
            thread
          />
        </div>
      </Modal>
      <Card>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Topic</TableCell>
                <TableCell style={{ width: 70 }} align='right'>Thích</TableCell>
                <TableCell style={{ width: 70 }} align='right'>Trả lời</TableCell>
                <TableCell style={{ width: 70 }} align='right'>Tham gia</TableCell>
                <TableCell style={{ width: 70 }} align='right'>Đăng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {threads && threads?.map((thread, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant='subtitle2' noWrap>
                      {/* eslint-disable-next-line react/jsx-pascal-case */}
                      <LINK href={`/thread/${thread.slug}.${thread.id}`}>
                        {thread.title}
                      </LINK>
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>{numberFormatter(thread?.totalLikes, 2)}</TableCell>
                  <TableCell align='right'>{numberFormatter(thread?.totalReplies, 2)}</TableCell>
                  <TableCell align='right'>{numberFormatter(thread?.totalParticipants, 2)}</TableCell>
                  <TableCell align='right'>
                    <Avatar
                      alt={thread.user.username}
                      src={thread.user.profileImage}
                      sx={{ width: 34, height: 34 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {threadsProps?.page?.totalPages > 1 &&
          <Pagination
            count={threadsProps.page.totalPages}
            shape='rounded'
            size='small'
            defaultPage={1}
            onChange={handleChangePage}
            sx={{
              p: 1
            }}
          />}
      </Card>
    </Stack>
  )
}

export default ThreadCard

// const StyleStack = styled(Stack)(({ theme }) => ({
//   padding: 12,
//   backgroundColor: theme.palette.grey[200],
//   borderRadius: Number(theme.shape.borderRadius) * 1.5
// }))

const LINK = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary
}))
