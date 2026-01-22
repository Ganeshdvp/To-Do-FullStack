import React from 'react'
import { NavBar } from './NavBar'
import { Form } from './Form'
import { AllTasks } from './AllTasks'
import { Toaster } from 'sonner'

export const Main = () => {
  return (
    <>
    <Toaster position="top-right" richColors duration={2500} expand/>
    <NavBar/>
    <Form/>
    <AllTasks/>
    </>
  )
}
