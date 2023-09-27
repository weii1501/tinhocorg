// component

// ----------------------------------------------------------------------

import SvgColor from '@/components/svg-color'

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />

const navConfig = [
  {
    title: 'Tất cả chuyên mục',
    path: '/'
  }
]

export default navConfig
