import { createContext, useState } from 'react'

export const Context = createContext(null)

function UserProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [tableOfContents, setTableOfContents] = useState(null)

  return (
    <Context.Provider value={{ user, setUser, tableOfContents, setTableOfContents }}>
      {children}
    </Context.Provider>
  )
}

export default UserProvider
